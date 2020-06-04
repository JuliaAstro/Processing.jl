var documenterSearchIndex = {"docs":
[{"location":"api/#API/Reference-1","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"For now, here is a list of all documented functions.","category":"page"},{"location":"api/#Index-1","page":"API/Reference","title":"Index","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/#API/Reference-2","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"Modules = [CCDReduction]","category":"page"},{"location":"api/#CCDReduction.combine-Tuple{Vararg{AbstractArray,N} where N}","page":"API/Reference","title":"CCDReduction.combine","text":"combine(frames::Vararg{<:AbstractArray}; method = median)\ncombine(frames::AbstractVector{<:AbstractArray}; method = median)\n\nCombine multiple frames using method.\n\nTo pass a custom method, it must have a signature like method(::AbstractArray; dims).\n\nExamples\n\njulia> frame = [reshape(1.0:4.0, (2, 2)) for i = 1:4];\n\njulia> combine(frame)\n2×2 Array{Float64,2}:\n 1.0  3.0\n 2.0  4.0\n\njulia> combine(frame, method = sum)\n2×2 Array{Float64,2}:\n 4.0  12.0\n 8.0  16.0\n\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.crop-Tuple{AbstractArray,Any}","page":"API/Reference","title":"CCDReduction.crop","text":"crop(frame::AbstractArray, shape; force_equal = true)\n\nCrops frame to the size specified by shape anchored by the frame center.\n\nThis will remove rows/cols of the frame equally on each side. When there is an uneven difference in sizes (e.g. size 9 -> 6 can't be removed equally) the default is to increase the output size (e.g. 6 -> 7) so there is equal removal on each side. To disable this, set force_equal=false, which will remove the extra slice from the end of the axis.\n\nExamples\n\njulia> frame = reshape(1:25, (5, 5));\n\njulia> crop(frame, (3, 3))\n3×3 Array{Int64,2}:\n 7  12  17\n 8  13  18\n 9  14  19\n\njulia> crop(frame, (4, 3), force_equal = false)\n4×3 Array{Int64,2}:\n 6  11  16\n 7  12  17\n 8  13  18\n 9  14  19\n\n\nSee Also\n\ncropview\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.cropview-Tuple{AbstractArray,Any}","page":"API/Reference","title":"CCDReduction.cropview","text":"cropview(frame::AbstractArray, shape; force_equal = true)\n\nCrops frame to the size specified by shape anchored by the frame center.\n\nThis function is same as the crop function but returns a view of the frame.\n\nnote: Note\nThis function returns a view of the frame, so any modification to output array will result in modification of frame.\n\nSee Also\n\ncrop\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.flat_correct!-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.flat_correct!","text":"flat_correct!(frame::AbstractArray, flat_frame::AbstractArray; norm_value = mean(flat_frame))\n\nIn-place version of flat_correct\n\nSee Also\n\nflat_correct\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.flat_correct-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.flat_correct","text":"flat_correct(frame::AbstractArray, flat_frame::AbstractArray; norm_value = mean(flat_frame))\n\nCorrect frame for non-uniformity using the calibrated flat_frame.\n\nBy default, the flat_frame is normalized by its mean, but this can be changed by providing a custom norm_value.\n\nnote: Note\nThis function may introduce non-finite values if flat_frame contains values very close to 0 due to dividing by zero. The default behavior will return Inf if the frame value is non-zero, and Nan if the frame value is 0.\n\nExamples\n\njulia> frame = ones(3, 3);\n\njulia> flat = fill(2.0, (3, 3));\n\njulia> flat_correct(frame, flat, norm_value = 1.0)\n3×3 Array{Float64,2}:\n 0.5  0.5  0.5\n 0.5  0.5  0.5\n 0.5  0.5  0.5\n\njulia> flat_correct(frame, flat)\n3×3 Array{Float64,2}:\n 1.0  1.0  1.0\n 1.0  1.0  1.0\n 1.0  1.0  1.0\n\n\nSee Also\n\nflat_correct!\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_bias!-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.subtract_bias!","text":"subtract_bias!(frame::AbstractArray, bias_frame::AbstractArray)\n\nIn-place version of subtract_bias\n\nSee Also\n\nsubtract_bias\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_bias-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.subtract_bias","text":"subtract_bias(frame::AbstractArray, bias_frame::AbstractArray)\n\nSubtract the bias_frame from frame.\n\nExamples\n\njulia> frame = [1.0 2.2 3.3 4.5];\n\njulia> bias = [0.0 0.2 0.3 0.5];\n\njulia> subtract_bias(frame, bias)\n1×4 Array{Float64,2}:\n 1.0  2.0  3.0  4.0\n\n\nSee Also\n\nsubtract_bias!\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_dark!-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.subtract_dark!","text":"subtract_dark!(frame::AbstractArray, dark_frame::AbstractArray; data_exposure = 1, dark_exposure = 1)\n\nIn-place version of subtract_dark\n\nSee Also\n\nsubtract_dark\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_dark-Tuple{AbstractArray,AbstractArray}","page":"API/Reference","title":"CCDReduction.subtract_dark","text":"subtract_dark(frame::AbstractArray, dark_frame::AbstractArray; data_exposure = 1, dark_exposure = 1)\n\nSubtract the dark_frame from frame.\n\nExamples\n\njulia> frame = ones(3, 3);\n\njulia> dark_frame = ones(3, 3);\n\njulia> subtract_dark(frame, dark_frame)\n3×3 Array{Float64,2}:\n 0.0  0.0  0.0\n 0.0  0.0  0.0\n 0.0  0.0  0.0\n\njulia> subtract_dark(frame, dark_frame, data_exposure = 1, dark_exposure = 4)\n3×3 Array{Float64,2}:\n 0.75  0.75  0.75\n 0.75  0.75  0.75\n 0.75  0.75  0.75\n\n\nSee Also\n\nsubtract_dark!\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_overscan!-Union{Tuple{T}, Tuple{AbstractArray{T,N} where N,Any}} where T","page":"API/Reference","title":"CCDReduction.subtract_overscan!","text":"subtract_overscan!(frame::AbstractArray, idxs; dims = axes_min_length(idxs))\n\nIn-place version of subtract_overscan\n\nSee Also\n\nsubtract_overscan\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_overscan-Tuple{Any,Any}","page":"API/Reference","title":"CCDReduction.subtract_overscan","text":"subtract_overscan(frame::AbstractArray, idxs; dims = axes_min_length(idxs))\n\nSubtract the overscan frame from image.\n\ndims is the dimension along which overscan_frame is combined. The default value of dims is the axis with smaller length in overscan region. If idxs is a string it will be parsed as FITS-style indices.\n\nExamples\n\njulia> frame = [4.0 2.0 3.0 1.0 1.0];\n\njulia> subtract_overscan(frame, (:, 4:5), dims = 2)\n1×5 Array{Float64,2}:\n 3.0  1.0  2.0  0.0  0.0\n\njulia> subtract_overscan(frame, \"[4:5, 1:1]\", dims = 2)\n1×5 Array{Float64,2}:\n 3.0  1.0  2.0  0.0  0.0\n\n\nSee Also\n\nsubtract_overscan!\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.subtract_overscan-Tuple{FITSIO.ImageHDU,Any}","page":"API/Reference","title":"CCDReduction.subtract_overscan","text":"subtract_overscan(::FITSIO.ImageHDU, idxs; [dims])\nsubtract_overscan(filename, idxs; hdu=1, [dims])\n\nLoad a FITS file or HDU before subtracting the overscan region. If idxs is a symbol it will be read from the FITS header with that key (case sensitive).\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.trim-Tuple{AbstractArray,Any}","page":"API/Reference","title":"CCDReduction.trim","text":"trim(frame::AbstractArray, idxs)\n\nTrims the frame to remove the region specified by idxs.\n\nThis function trims the array in a manner such that final array should be rectangular. The indices follow standard Julia convention, so (:, 45:60) trims all columns from 45 to 60 and (1:20, :) trims all the rows from 1 to 20. The function also supports FITS-style indices.\n\nExamples\n\njulia> frame = ones(5, 5);\n\njulia> trim(frame, (:, 2:5))\n5×1 Array{Float64,2}:\n 1.0\n 1.0\n 1.0\n 1.0\n 1.0\n\njulia> trim(frame, \"[2:5, 1:5]\")\n5×1 Array{Float64,2}:\n 1.0\n 1.0\n 1.0\n 1.0\n 1.0\n\n\nSee Also\n\ntrimview\n\n\n\n\n\n","category":"method"},{"location":"api/#CCDReduction.trimview-Tuple{AbstractArray,Any}","page":"API/Reference","title":"CCDReduction.trimview","text":"trimview(frame::AbstractArray, idxs)\n\nTrims the frame to remove the region specified by idxs.\n\nThis function is same as the trim function but returns a view of the frame.\n\nnote: Note\nThis function returns a view of the frame, so any modification to output array will result in modification of frame.\n\nSee Also\n\ntrim\n\n\n\n\n\n","category":"method"},{"location":"#","page":"Home","title":"Home","text":"CurrentModule = CCDReduction","category":"page"},{"location":"#CCDReduction.jl-1","page":"Home","title":"CCDReduction.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package provides tools for basic reduction methods of CCD images.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: Codecov) (Image: License)","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"From Julia enter Pkg mode","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia>]\n\n(1.3) pkg> add CCDReduction","category":"page"},{"location":"#License-1","page":"Home","title":"License","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This work is distributed under the MIT \"expat\" license. See LICENSE for more information.","category":"page"}]
}
