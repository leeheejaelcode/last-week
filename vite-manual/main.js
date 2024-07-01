import "@/styles/global.css";
import { btn } from "@/styles/main.module.css";
import { getNode as $ } from "kind-tiger";
import img from "@/assets/8b.jpg";
// 이미지를 동적 자산으로 작동시키기 위해서는 import를 해야하며
// 동적자산은 default로 export됩니다.

// reslove에 alias를 사용해 @를 /src로 설정해주었기 때문에 @로 사용가능
const app = $("#app");

const h1 = document.createElement("h1");
h1.textContent = "빛 보다 빠른 Vite ⚡";
h1.classList.add = "heading";

const figure = document.createElement("figure");
figure.innerHTML = /*html */ `
<img src="${img}" width="50"/>
<button class="${btn}" type="button" >버튼</button>
<figcaption>로고</figcaption>
`;

// 그룹핑을 해주기 위해 fragment 사용
const fragment = document.createDocumentFragment();

fragment.appendChild(h1);
fragment.appendChild(figure);

app.appendChild(fragment);
