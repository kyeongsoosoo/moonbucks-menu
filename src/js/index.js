// 오늘 얻은 인사이트
// 1. 이벤트 위임을 어떻게할 수 있는지 알게 되서 좋았다.
// 2. 요구사항을 전략적으로 접근해야하는지, 단계별로 세세하게 나누는게 중요하다는걸 알게 됐다.
// 3. DOM 요소를 가져올때는 $표시를 써서 변수처럼 사용할 수 있는게 좋았다.
// 4. 새롭게 알게 된 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target

// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
// - [x] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다.
// - [x] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const createMenuTemplate = (menu) =>
 `
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${menu}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`;

function App() {
  const menuForm = $("#espresso-menu-form");
  const menuInput = $(".input-field");
  const menuList = $("#espresso-menu-list");
  const menuCount = $(".menu-count");
  const findClickedButtonContainer = (e) => e.target.closest('li')

  const countMenuItem = () => {
    const items = $$('.menu-list-item')
    return items.length
  }

  const updateMenuCount = () => {
      const itemCount = countMenuItem()
      menuCount.innerText = `총 ${itemCount}개`
  }

  const addMenuItem = () => {
    const inputValue = menuInput.value;
    if (inputValue === "") return;

    const menuTemplate = createMenuTemplate(inputValue);
    menuList.insertAdjacentHTML("beforeend", menuTemplate);

    updateMenuCount()

    menuInput.value = "";
  };

  const updateMenuItem = (e) => {
    const menuItemText = findClickedButtonContainer(e).querySelector('.menu-name')

    const updatingName = prompt('뭘로 바꾸시나용', menuItemText.innerText)
    menuItemText.innerText = updatingName
  }

  const removeMenuItem = (e) => {
    const menuItem = findClickedButtonContainer(e)
    menuItem.remove();
    updateMenuCount();
  }

  menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  menuForm.addEventListener("keypress", (e) => {
    const pressedKey = e.key;

    if (pressedKey !== "Enter") return;

    addMenuItem();
  });

  menuList.addEventListener('click', (e) => {
      const btnClassList = e.target.classList
      if(btnClassList.contains('menu-edit-button')){
          updateMenuItem(e);
      }
      if(btnClassList.contains('menu-remove-button')){
          removeMenuItem(e);
      }
  })
}

App();
