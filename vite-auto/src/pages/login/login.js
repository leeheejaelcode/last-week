import '@/pages/login/login.css';
import { setDocumentTitle, getNode, getStorage, setStorage } from 'kind-tiger';
import pb from '@/api/pocketbase';

setDocumentTitle('29CM / 로그인');

const loginButton = getNode('.login');

async function handleLogin(e) {
  e.preventDefault();

  const id = 'seonbeom2@gmail.com';
  const pw = 'dkssud123';

  pb.collection('users')
    .authWithPassword(id, pw)
    .then(
      async () => {
        const { model, token } = await getStorage('pocketbase_auth');
        setStorage('auth', {
          isAuth: !!model,
          user: model,
          token,
        });
        alert(`${model.name}님 로그인 완료! 메인페이지로 이동합니다.`);
        location.href = '/index.html';
      },
      () => {
        alert('인증된 사용자가 아닙니다.');
      }
    );
}

loginButton.addEventListener('click', handleLogin);
