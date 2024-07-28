import axios from 'axios';
const URI = process.env.NEXT_PUBLIC_API_URI + '/people';

export async function getAllUsers(page) {
  const response = await axios.get(URI + `?page=${page}`);

  return await response.data;
}