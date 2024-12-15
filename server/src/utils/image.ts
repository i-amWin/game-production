import fs from 'node:fs';
import path from 'node:path';

export const uploadImage = async (image: string) => {
  const base64Data = image.replace(/^data:image\/\w+;base64,/, ''); // Regex updated to support any image format

  const fileName = `image-${Date.now()}.png`;
  const filePath = path.join(process.cwd(), 'uploads', 'images', fileName);

  // Ensure the directory exists
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

  await fs.promises.writeFile(filePath, base64Data, 'base64');

  return fileName;
};

export const deleteImage = async (fileName: string) => {
  const filePath = path.join(process.cwd(), 'uploads', 'images', fileName);

  // Check if the file exists before attempting to delete
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      console.error('File not found:', filePath);
    } else {
      throw error;
    }
  }
};

export const getImage = async (fileName: string) => {
  const filePath = path.join(process.cwd(), 'uploads', 'images', fileName);

  try {
    // Read the image file and encode it in Base64
    const imageBuffer = await fs.promises.readFile(filePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    return base64Image;
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      throw new Error('File not found');
    } else {
      throw error;
    }
  }
};
