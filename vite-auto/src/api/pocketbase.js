import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL); // SDK

export default pb;
