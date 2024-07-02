import '/src/styles/global.css';
import { getStorage, insertLast, getNode, deleteStorage } from 'kind-tiger';
import getPbImageURL from '@/api/getPbImageURL.js';
import pb from '@/api/pocketbase';

async function logout() {
  // localStroage에 auth가 있다면
  if (localStorage.getItem('auth')) {
    const { isAuth, user } = await getStorage('auth');

    if (isAuth) {
      const template = `
    <div class="thumbnail">
      <img src="${getPbImageURL(user, 'avatar')}" alt="" />
    </div>
    <div class="username">${user.name}님 반갑습니다!</div>
    <button type="button" class="logout">로그아웃</button>
  `;

      insertLast('.container', template);

      const logout = getNode('.logout');

      function handleLogout() {
        if (confirm('정말 로그아웃 하실겁니까?')) {
          pb.authStore.clear();
          deleteStorage('auth');
          location.reload();
        }
      }
      logout.addEventListener('click', handleLogout);
    }
  }
}

logout();
