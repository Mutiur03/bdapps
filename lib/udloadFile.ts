import cloudinary from "./cloudinary";
import sharp from "sharp";
interface UploadResult {
  url: string;
}
export async function uploadFileToCloudinary(
  file: File,
  folderLocation: string
): Promise<UploadResult> {
  try {
    const isImage = file.type.startsWith("image/");
    let buffer: Buffer;

    if (isImage) {
      buffer = await compressImage(file);
    } else {
      buffer = await handleNonImageFile(file);
    }

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: folderLocation,
      resource_type: "auto",
    });
    console.log(result);
    
    return {
      url: isImage ? result.secure_url : result.url,
    };
  } catch (error) {
    throw new Error(`Failed to upload file to Cloudinary: ${error}`);
  }
}

async function compressImage(file: File): Promise<Buffer> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  const isPng = file.type === "image/png";
  if (buffer.length > 5 * 1024 * 1024) {
    throw new Error("File too large. Max 5MB allowed.");
  }
  let compressed = sharp(buffer);
  if (isJpeg) {
    compressed = compressed.jpeg({ quality: 70 });
  } else if (isPng) {
    compressed = compressed.png({ quality: 70 });
  } else {
    compressed = compressed.jpeg({ quality: 70 });
  }
  return await compressed.toBuffer();
}

async function handleNonImageFile(file: File): Promise<Buffer> {
  const maxSize = 10 * 1024 * 1024; // 10MB for non-image files

  if (file.size > maxSize) {
    throw new Error("File too large. Max 10MB allowed for non-image files.");
  }

  // Define allowed file types
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `File type ${file.type} is not supported. Allowed types: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV`
    );
  }

  return Buffer.from(await file.arrayBuffer());
}
