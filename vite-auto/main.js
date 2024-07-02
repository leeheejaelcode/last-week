import defaultAuthData from '@/api/defaultAuthData';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import gsap from 'gsap';
import { getNode, getStorage, insertLast, setStorage } from 'kind-tiger';
import '/src/styles/global.css';

// timeline을 활용하여 비동기적 애니메이션 가능
const tl = gsap.timeline({
  defaults: {
    opacity: 0,
  },
});
tl.from('.visual', {
  delay: 0.3,
  y: 30,
});
tl.from(
  'h2>span',
  {
    x: -30,
  },
  '-=0.2' // 앞 애니메이션이 끝나기 0.2초 전에
  // '+=0.2' // 앞 애니메이션이 끝나고 0.2초 후에
);

async function logout() {
  // localStroage에 auth가 있다면
  // 없으면 에러가 발생되기 때문에
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
          setStorage('auth', defaultAuthData);
          location.reload();
        }
      }
      logout.addEventListener('click', handleLogout);
    }
  }
}

logout();
