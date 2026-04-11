import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import crypto from "crypto";
import { existsSync } from "fs";

/**
 * Saves a File object to the public/uploads directory.
 * @param file The File object from FormData
 * @param folder Subfolder inside public/uploads (e.g. 'projects')
 * @returns The public URL path (e.g. '/uploads/projects/filename.jpg') or null if invalid
 */
export async function uploadFile(file: File | null, folder: string = ""): Promise<string | null> {
  if (!file || file.size === 0 || file.name === "undefined") {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uuid = crypto.randomUUID().slice(0, 8);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").split(".")[0];
    const newFilename = `${sanitizedName}_${uuid}.${extension}`;

    // Ensure directory exists
    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file
    const filePath = join(uploadDir, newFilename);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicPath = folder ? `/uploads/${folder}/${newFilename}` : `/uploads/${newFilename}`;
    return publicPath;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}
