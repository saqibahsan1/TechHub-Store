const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'techhub_store');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
};

export const getImageUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};