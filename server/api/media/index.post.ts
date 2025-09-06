// server/api/upload-image.post.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Ambil FormData dari request
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No file uploaded',
    });
  }

  // Cari file gambar (biasanya dengan field name "image")
  const imageField = formData.find(field => field.name === 'image');

  if (!imageField) {
    throw createError({
      statusCode: 400,
      message: 'Image field "image" is required',
    });
  }

  // Siapkan FormData untuk dikirim ke ImgBB
  const imgbbFormData = new FormData();
  console.log("config.imgbbApiKey : ", config.public.imgbbApiKey);
  
  imgbbFormData.append('key', config.public.imgbbApiKey);
  imgbbFormData.append(
    'image',
    new Blob([new Uint8Array(imageField.data)], { type: imageField.type }),
    imageField.filename || 'image.jpg'
  );

  try {
    // Kirim ke ImgBB
    const response = await fetch(config.public.imgbbBaseUrl, {
      method: 'POST',
      body: imgbbFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: result.error?.message || 'Upload failed',
      });
    }

    // Berhasil — kembalikan data dari ImgBB
    return {
      success: true,
      data: `https://i.ibb.co.com/${result.data.id}/${result.data.image.filename}`,
    };

  } catch (error) {
    console.error('ImgBB Upload Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
});
