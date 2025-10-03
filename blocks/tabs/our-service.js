import buildtabblock from './tabs.js';
import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
  buildtabblock(block);

  const tabPanels = block.querySelectorAll('.tabs-panel');
  const tabs = block.querySelectorAll('.tabs-tab');

  if (tabPanels.length > 0) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('tabs-panels-wrapper');

    tabPanels.forEach((panel) => {
      wrapper.appendChild(panel);
    });

    const tabsList = block.querySelector('.tabs-list');
    if (tabsList && tabsList.parentNode) {
      tabsList.parentNode.insertBefore(wrapper, tabsList.nextSibling);
    }
  }

  function updateTabsForMobile() {
    const isMobile = window.innerWidth < 768;
    const roleTabs = block.querySelectorAll('[role="tab"]');

    roleTabs.forEach((tab) => {
      const tabId = tab.getAttribute('aria-controls');
      const panel = block.querySelector(`#${tabId}`);

      if (!panel) return;

      const alreadyWrapped = tab.closest('.tabs-wrapper');

      if (isMobile && !alreadyWrapped) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tabs-wrapper');

        tab.parentNode.insertBefore(wrapper, tab);
        wrapper.appendChild(tab);
        wrapper.appendChild(panel);
      }

      if (!isMobile && alreadyWrapped) {
        const parent = alreadyWrapped.parentNode;
        parent.insertBefore(tab, alreadyWrapped);
        parent.insertBefore(panel, alreadyWrapped);
        alreadyWrapped.remove();
      }
    });
    // const tabsList = block.querySelector('.tabs-list');
    // tabsList.addEventListener("click",function(e){

    //   const isSelected = e.target.getAttribute('aria-selected') === 'true';
    //   const button = e.target.parentElem.

    //     if (isSelected) {
    //       e.target.setAttribute('aria-selected', false);
    //       button.setAttribute('aria-selected', true);
    //     }
    //     else{
    //       e.target.setAttribute('aria-selected', true);
    //     }
    //     console.log(isSelected)

    // })
  }

  updateTabsForMobile();

  window.addEventListener('resize', updateTabsForMobile);

  const swiperEl = block.querySelector('.tabs-panel .swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }
}
