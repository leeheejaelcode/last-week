import PocketBase from 'pocketbase';

// local 호스트를 외부에서 사용할수 없기때문에
// url을 받아와서 사용
const pb = new PocketBase(import.meta.env.VITE_PB_URL); // SDK

export default pb;
