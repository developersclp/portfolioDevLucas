import { prisma } from "@/lib/prisma";

/**
 * Saves a File's binary data to the Image table in PostgreSQL.
 * Returns a URL path that serves the image via an API route.
 *
 * @param file The File object from FormData
 * @param folder Kept for backwards compatibility (unused)
 * @returns The URL path (e.g. '/api/images/cuid123') or null if invalid
 */
export async function uploadFile(file: File | null, folder: string = ""): Promise<string | null> {
  if (!file || file.size === 0 || file.name === "undefined") {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";

    // Save binary data to the database
    const image = await prisma.image.create({
      data: {
        data: buffer,
        mimeType,
      },
    });

    // Return a URL that the API route will serve
    return `/api/images/${image.id}`;
  } catch (error) {
    console.error("Error uploading file to database:", error);
    return null;
  }
}
