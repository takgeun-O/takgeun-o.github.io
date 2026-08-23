// Header에 페이지 아래로 스크롤 시 다크 스타일링 적용
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    
    if(window.scrollY > headerHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }
});

// 아래로 스크롤할수록 Home 투명화
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', () => {
    const calculatedOpacity = (homeHeight - window.scrollY) / homeHeight;
    const opacity = Math.max(0, Math.min(1, calculatedOpacity));
    home.style.opacity = opacity;
})