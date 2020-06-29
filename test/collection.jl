using CCDReduction: parse_name

@testset "fitscollection" begin
    # setting initial data
    dir = joinpath(@__DIR__, "data")

    # the two fits file used for testing have identical header keys
    df = fitscollection(dir)
    relevant_keys = filter(i -> i ∉ ("", "HISTORY"), keys(read_header(M6707HH[1])))

    header_M6707HH = read_header(M6707HH[1])
    relevant_values_M6707HH = map(relevant_keys) do key
        header_M6707HH[key]
    end

    header_M35070V = read_header(M35070V[1])
    relevant_values_M35070V = map(relevant_keys) do key
        header_M35070V[key]
    end
    # testing rows columns
    # an additional 3 columns are present because of varibles path, name and hdu
    @test size(df) == (2, length(relevant_keys) + 3)

    # testing each element in rows and columns
    @test copy(df[1, :]) == (path = joinpath(dir, "M35070V.fits"),
                             name = "M35070V.fits", hdu = 1,
                             zip(Symbol.(relevant_keys), relevant_values_M35070V)...)
    @test copy(df[2, :]) == (path = joinpath(dir, "M6707HH.fits"),
                             name = "M6707HH.fits", hdu = 1,
                             zip(Symbol.(relevant_keys), relevant_values_M6707HH)...)

    # testing special cases
    ## drop extension
    df = fitscollection(dir; keepext = false)
    @test df[1, :name] == "M35070V"
    @test df[2, :name] == "M6707HH"

    ## exclude
    df = fitscollection(dir; exclude = "M35070V.fits")
    @test df[1, :name] == "M6707HH.fits"
    @test size(df) == (1, length(relevant_keys) + 3)

    ##exclude_dir
    df = fitscollection(dir; exclude_dir = "data")
    @test size(df) == (0, 0)
end

@testset "array-generators" begin
    # setting initial data
    dir = joinpath(@__DIR__, "data")
    df = fitscollection(dir)
    arr1 = map(x -> x, array(df))
    arr2 = map(eachrow(df)) do row
        getdata(FITS(row.path)[row.hdu])
    end
    @test arr1 == arr2
end

@testset "filename-generators" begin
    # setting initial data
    dir = joinpath(@__DIR__, "data")
    df = fitscollection(dir)
    arr1 = map(x -> x, filename(df))
    arr2 = map(eachrow(df)) do row
        row.path
    end
    @test arr1 == arr2
end

@testset "image-generators" begin
    # setting initial data
    dir = joinpath(@__DIR__, "data")
    df = fitscollection(dir)
    arr1 = map(x->x, images(df))
    arr2 = map(eachrow(df)) do row
        FITS(row.path)[row.hdu]
    end

    for (hdu1, hdu2) in zip(arr1, arr2)
        @test getdata(hdu1) == getdata(hdu2)
        header1 = read_header(hdu1)
        header2 = read_header(hdu2)
        keys1 = keys(header1)
        keys2 = keys(header2)
        @test keys1 == keys2
        for (k1, k2) in zip(keys1, keys2)
            @test header1[k1] == header2[k2]
        end
    end
end

@testset "helper" begin
    @test parse_name("abc.fits", "."*"fits", Val(true)) == "abc.fits"
    @test parse_name("abc.fits.tar.gz", "."*"fits.tar.gz", Val(false)) == "abc"
    @test parse_name("foo.fits.fits", "."*"fits", Val(false)) == "foo.fits"
    @test parse_name("foo.fits.fits", "."*r"fits(\.tar\.gz)?"i, Val(false)) == "foo.fits"
    @test parse_name("foo.fits", "."*r"fits(\.tar\.gz)?"i, Val(false)) == "foo"
end
