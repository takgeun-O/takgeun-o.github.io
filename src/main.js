"use strict";

// Header에 페이지 아래로 스크롤 시 다크 스타일링 적용
const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > headerHeight) {
    header.classList.add("header--dark");
  } else {
    header.classList.remove("header--dark");
  }
});

// 아래로 스크롤할수록 Home 투명화
const home = document.querySelector(".home__container");
const homeHeight = home.offsetHeight;
document.addEventListener("scroll", () => {
  const calculatedOpacity = (homeHeight - window.scrollY) / homeHeight;
  const opacity = Math.max(0, Math.min(1, calculatedOpacity));
  home.style.opacity = opacity;
});

// Home 섹션 절반 정도 이상이 가려지면 Arrow button 노출시키기
const arrow = document.querySelector(".arrow-up");
document.addEventListener(
  "scroll",
  () => {
    if (window.scrollY >= homeHeight / 2) {
      arrow.style.opacity = 1;
    } else {
      arrow.style.opacity = 0;
    }
  },
  { passive: true },
);

// Navbar 토글버튼 클릭 처리
const navbarMenu = document.querySelector(".header__menu");
const navbarToggle = document.querySelector(".header__toggle");

navbarToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Navbar 메뉴 클릭 시 메뉴를 자동으로 닫아줌
navbarMenu.addEventListener("click", () => {
  navbarMenu.classList.remove("open");
});
