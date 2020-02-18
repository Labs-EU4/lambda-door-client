import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_URL}`

export default function withAuth() {
  const token = localStorage.getItem('token');
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  return instance;
}
