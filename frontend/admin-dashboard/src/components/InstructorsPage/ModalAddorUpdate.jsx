import { useState, useEffect } from "react";
import { X, ImageIcon, Camera, Star, ChevronDown } from "lucide-react";

export default function ModalAddorUpdate({
  isOpen,
  onClose,
  isEdit,
  instructor,
  isView,
  editMutation,
}) {
  if (isView) isEdit = true;
  const [rate, setRate] = useState(isEdit ? instructor.Rate || 0 : 0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    if (isEdit && instructor?.ImageUrl) {
      setPreviewUrl(instructor.ImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [instructor, isEdit]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (isEdit) formData.append("Id", instructor.Id);
    formData.append("Name", e.target.name.value);
    formData.append("Rate", rate);
    formData.append("Title", e.target.Title.value);
    formData.append("Description", e.target.description.value);
    formData.append("ImageUrl", "Nesa Production");
    if (file) formData.append("ImageFile", file);

    editMutation.mutate(formData);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="flex flex-col w-full max-w-2xl rounded-lg  shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] bg-white p-6">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Instructor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6   rounded-lg p-8">
            <div className="flex ">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-50 overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                {!isView && (
                  <>
                    <label
                      htmlFor="imageUpload"
                      className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                      <Camera className="h-5 w-5" />
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col ">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              disabled={isView}
              placeholder="Write here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              defaultValue={isEdit ? instructor.Name : ""}
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div className="flex flex-col justify-center ">
              <h1 className="mb-2 block text-sm font-medium text-gray-700">
                Job Title
              </h1>
              <div className="relative w-full h-full">
                <select
                  name="Title"
                  disabled={isView}
                  id=""
                  defaultValue={isEdit ? instructor?.title : ""}
                  className="px-4 py-3 border border-gray-300 text-gray-500  rounded-lg appearance-none w-full h-full "
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="2">Frontend Developer</option>
                  <option value="3">Backend Developer</option>
                  <option value="0">UI/UX Designer</option>
                  <option value="1">Development</option>
                </select>
                <ChevronDown className="text-gray-300 absolute right-0 top-1/2 -translate-y-1/2 " />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Rate
              </label>
              <div className="flex gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => !isView && setRate(star)}
                    onMouseEnter={() => !isView && setHoveredStar(star)}
                    onMouseLeave={() => !isView && setHoveredStar(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8  ${
                        star <= (hoveredStar || rate)
                          ? "fill-yellow-300 text-gray-300"
                          : "fill-none text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6  ">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              disabled={isView}
              placeholder="Write here"
              defaultValue={isEdit ? instructor.Description : ""}
              className="min-h-[120px] px-3 py-3 border w-full border-gray-300 rounded-lg"
            />
          </div>

          {!isView && (
            <div className="flex gap-4">
              <button
                type="button"
                variant="outline"
                className="flex-1 border-gray-300 bg-[#EDEDED] text-[#8C8C8C] hover:bg-gray-400 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 bg-gray-900 text-white hover:bg-gray-500 rounded-lg px-6 py-3"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
