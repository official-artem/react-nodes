import axios from 'axios';
const URI = process.env.NEXT_PUBLIC_API_URI + '/people';

export function getPerson(personId) {
	const person = axios.get(`${URI}/${personId}`)
}