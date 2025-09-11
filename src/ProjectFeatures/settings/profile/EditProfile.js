import { useForm ,Controller} from "react-hook-form";
import { useUpdateProfileMutation } from "../../../features/profile/profileApi";
import {  CheckCircle, Loader2 } from "lucide-react";
import { toast } from 'react-toastify';
import { useState } from "react";
export default function EditProfile({ setIsOpen, isOpen }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
      const [preview, setPreview] = useState(null);
     const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [updateProfile, { isLoading }] = useUpdateProfileMutation(auth?.role);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();



  const handleImageUpload = async (file) => {
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append('uploadimg', file);
      formData.append('moduletitle', 'obeseduimg'); // Add module name

      // Call your uploadImage API
      const response = await uploadImage(formData);

      if (response?.data?.data?.filename) {
        const imageUrl = response?.data?.data?.filename;
        setUploadedImageUrl(imageUrl);
        toast.success('Image uploaded successfully!');
        return imageUrl;
      } else {
        // throw new Error('No image URL returned from server');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error?.response?.data?.message || 'Image upload failed');
      return null;
    } finally {
      setImageUploading(false);
    }
  };






  
  const onSubmit = async (data) => {
    console.log("data", data);
        const formData = new FormData();
        formData.append("profilepicup", data.profilepicup);
        formData.append("user_id", data.user_id);

    try {
      await updateProfile({ role: auth?.role, formData });
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        {/* Open Modal Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Open Modal
        </button>

        {/* Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="number"
                    {...register("user_id", { required: "Name is required" })}
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

           <div className="space-y-2 mt-3">
                  <p variant="small" color="blue-gray" className="font-medium pb-3">
                    Upload Image*
                  </p>

                  <Controller
                    name=""
                    control={control}
                    rules={{
                      required: "Image is required",
                      validate: {
                        isImage: (file) => {
                          if (!file) return true;
                          const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                          return validTypes.includes(file.type) || "File must be an image (JPEG, PNG, JPG, GIF, SVG)";
                        }
                      }
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                            disabled={imageUploading}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                onChange(file);
                                setPreview(URL.createObjectURL(file));

                                // Auto-upload the image
                                await handleImageUpload(file);
                              } else {
                                onChange(null);
                                setPreview(null);
                                setUploadedImageUrl('');
                              }
                            }}
                            label="Choose File"
                          />

                          {/* Upload Status Indicator */}
                          {imageUploading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                            </div>
                          )}
                        </div>

                        {/* Upload Status Messages */}
                        {imageUploading && (
                          <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading image...
                          </p>
                        )}

                        {uploadedImageUrl && !imageUploading && (
                          <p className="text-green-500 text-sm mt-1 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Image uploaded successfully
                          </p>
                        )}

                        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                      </>
                    )}
                  />


                </div>
                <div className='hidden'>
                  {
                    uploadedImageUrl && (
                      <div>
                        <input
                          {...register("profilepicup", { required: true })}
                          type="text"
                          value={uploadedImageUrl}
                          rows={4}
                        />
                      </div>
                    )
                  }
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
