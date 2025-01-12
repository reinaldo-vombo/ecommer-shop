import cloudinary from '@/lib/storege/cloudinary';
import { writeFile, mkdir, access, constants } from 'fs/promises';
import { join } from 'path';

export const PATH = '/api/uploads/';

export const getPriceRange = (price: string | null) => {
  switch (price) {
    case 'low':
      return [0, 10000];
    case 'mid':
      return [11000, 19000];
    case 'high':
      return [19000, Infinity];
    default:
      return [0, Infinity]; // Default to all products if no price filter is applied
  }
};
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
};

export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'shoes' }, // Optional: Organize files in a folder
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            console.log('Uploaded file URL:', result?.secure_url);
            resolve(result?.secure_url || '');
          }
        }
      );

      // Write the buffer to the Cloudinary upload stream
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

export async function saveFileLocally(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), 'uploads');
  try {
    await access(uploadDir, constants.F_OK);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  return `${PATH}${file.name}`;
}

// Utility function to save the file
export async function saveFile(file: File): Promise<string> {
  if (process.env.NODE_ENV === 'production') {
    return uploadToCloudinary(file);
  }
  return saveFileLocally(file);
}
