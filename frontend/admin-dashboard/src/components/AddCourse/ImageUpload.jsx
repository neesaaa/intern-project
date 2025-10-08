import { Upload } from "lucide-react";
import { useState, useEffect } from "react";

export function ImageUpload({ existingImage, onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
      setFileName("Existing course image");
    }
  }, [existingImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (.jpg, .jpeg, .png, or .gif)");
        return;
      }

      setSelectedFile(file);
      onFileSelect?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex gap-6">
        <div
          onClick={handleUploadClick}
          className="w-[240px] h-[145px] bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <Upload className="w-5 h-5 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Image</span>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="space-y-2">
            <p className="font-medium text-[18px] leading-[100%] text-gray-700">
              <span className="font-medium">Size:</span> 700x430 pixels
            </p>
            <p className="font-medium text-[18px] leading-[100%] text-gray-700">
              <span className="font-medium">File Support:</span> .jpg, .jpeg,
              .png, or .gif
            </p>
          </div>

          <button
            type="button"
            onClick={handleUploadClick}
            className="w-fit flex items-center text-blue-500 gap-2 text-sm px-4 py-3 bg-transparent border border-blue-500 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-blue-500" />
            {preview ? "Change Image" : "Upload Image"}
          </button>

          {fileName && (
            <p className="text-xs text-gray-500">Selected: {fileName}</p>
          )}
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
