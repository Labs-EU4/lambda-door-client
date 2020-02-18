import axios from 'axios';

const imageUpload = async image => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('tags', ['image']);
  formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  formData.append('api_key', process.env.REACT_APP_API_KEY);
  formData.append('timestamp', Date.now() / 1000);

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/lambdadoor/image/upload',
      formData,
      {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }
    );

    return response.data.url;
  } catch (err) {
    return console.error(err);
  }
};

export default imageUpload;
