import defaultAuthData from '@/api/defaultAuthData';
import getPbImageURL from '@/api/getPbImageURL.js';
import pb from '@/api/pocketbase';
import '@/pages/product/product.css';
import gsap from 'gsap';
import {
  comma,
  getStorage,
  insertLast,
  setDocumentTitle,
  setStorage,
} from 'kind-tiger';

setDocumentTitle('29CM / 상품목록');

async function renderProductItem() {
  if (!localStorage.getItem('auth')) {
    setStorage('auth', defaultAuthData);
  }
  // 밑에 주소로 get 통신
  // http://127.0.0.1:8090은 로컬 주소
  // 환경 변수는 변수에 받아쓰는걸 권장하지 않음

  // const response = await tiger.get(
  //   `${import.meta.env.VITE_PB_API}/collections/products/records`
  // ); // Fetch API
  // const productsData = response.data.items; // Fetch API

  const productData = await pb //
    .collection('products')
    .getFullList({
      // sort를 사용해서
      // price 가격순으로 정렬하기
      // create 생성된 순으로 정렬하기
      sort: '-created',
    }); // SDK

  // 로그인을 했는지 안했는지 파악.
  const { isAuth } = await getStorage('auth');

  console.log(isAuth);

  productData.forEach((item) => {
    const discount = item.price * (item.ratio * 0.01);

    // 포켓베이스에서 img 넣는 방법

    // product에 id값을 item.id값으로 보내주는것
    const template = `
    <li class="product-item">
          <div>
            <figure>
            <a href="${isAuth ? `/src/pages/detail/index.html?product=${item.id}` : '/src/pages/login/'}"></a>
              <img src="${getPbImageURL(item)}" alt="대체텍스트" />
            </figure>
            <span class="brand">${item.brand}</span>
            <span class="desc">${item.description}</span>
            <span class="price">${item.price}원</span>
            <div>
              <span class="discount">${item.ratio}%</span>
              <span class="real-price">${comma(item.price - discount)}원</span>
            </div>
          </div>
        </li>`;
    insertLast('.container > ul', template);
  });
  gsap.from('.product-item', {
    y: 30,
    opacity: 0,
    stagger: 0.1,
  });
}

renderProductItem();

// 사용자가 누른 상품의 정보를 같이 내보내주기

/*  
<a href="${isAuth ? `/src/pages/detail/index.html?product=${item.id}` : '/src/pages/login/'}"></a>
 */

// product는 key item.id는 value
