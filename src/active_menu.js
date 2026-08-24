// 구현 방법
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가져오기
// 2. IntersectionObserver 사용해서 모든 섹션을 관찰하기
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시키기
// 보여지는 섹션 기준 : 다수의 섹션이 동시에 보여진다면,
// 가장 첫 번째 섹션을 기준으로 정하기
// 마지막 Contact 섹션에서는 가장 마지막 섹션을 선택

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonial",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`),
);
// 어떤 섹션들이 보여지고 있는지 안 보여지고 있는지 체크용
const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: "-20% 0px 0px 0px",
  threshold: [0, 1],
};

const observer = new IntersectionObserver(observerCallback, options);

sections.forEach((section) => observer.observe(section));

function observerCallback(entries) {
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
  });

  updateNavigation();
}

function updateNavigation() {
  const isBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1;

  //   console.log({
  //     scrollY: window.scrollY,
  //     innerHeight: window.innerHeight,
  //     scrollHeight: document.documentElement.scrollHeight,
  //     isBottom,
  //   });

  const navIndex = isBottom
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);

  //   console.log(sectionIds[navIndex]);

  const navItem = navItems[navIndex]; // 새로 선택해야 할 아이템
  activeNavItem.classList.remove("active");
  activeNavItem = navItem;
  activeNavItem.classList.add("active");
}

window.addEventListener("scroll", updateNavigation);

function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true); // indexOf는 찾고자 하는 놈이 없으면 -1 반환함
  return index >= 0 ? index : 0;
}
