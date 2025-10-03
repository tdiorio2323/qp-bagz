import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// These are exposed by Vite from your .env file
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export function BulkImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus("Please select files to upload.");
      return;
    }

    setUploading(true);
    setUploadStatus(`Uploading ${files.length} file(s)...`);

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.error) {
          console.error(`Error uploading ${file.name}:`, data.error.message);
          return { success: false, name: file.name };
        }
        return { success: true, name: file.name };
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        return { success: false, name: file.name };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((r) => r.success).length;

    setUploading(false);
    setUploadStatus(
      `Finished. ${successfulUploads}/${files.length} files uploaded successfully.`
    );
    setFiles([]); // Clear selection after upload
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bulk Image Uploader</h2>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Select Images</Label>
        <Input id="picture" type="file" multiple onChange={handleFileChange} />
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <p>{files.length} file(s) selected:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={handleUpload} disabled={uploading || files.length === 0} className="mt-4">
        {uploading ? "Uploading..." : "Upload to Cloudinary"}
      </Button>
      {uploadStatus && <p className="mt-4 text-sm text-muted-foreground">{uploadStatus}</p>}
    </div>
  );
}
