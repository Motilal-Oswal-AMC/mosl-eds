import { createOptimizedPicture } from '../../scripts/aem.js';
import dataMapMoObj from '../../scripts/constant.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  const blkmain = block.closest('.contact-card');
  if (blkmain !== null) {
    dataMapMoObj.CLASS_PREFIXES = ['contact-main', 'contact-sub', 'contact-inner', 'sub-contact'];
    dataMapMoObj.addIndexed(block);

    const listli = block.querySelectorAll('.contact-inner2 ul > li > ul');
    const listul = block.querySelectorAll('.contact-inner2 ul > li');
    dataMapMoObj.CLASS_PREFIXES = ['contact-li'];
    Array.from(listli).forEach((inner) => {
      dataMapMoObj.addIndexed(inner);
    });

    Array.from(listul).forEach((Element, index) => Element.classList.add(`list-elem-${index + 1}`));
    Array.from(listul).forEach((Element) => Element.classList.add('common-list'));
  }

  const pmsRooted = block.closest('.pms-rooted');
  if (pmsRooted !== null) {
    dataMapMoObj.CLASS_PREFIXES = ['pms-rooted-ex', 'pms-rooted-card', 'pms-rooted-card-cont', 'pms-rooted-card-subcont'];
    dataMapMoObj.addIndexed(pmsRooted);
  }

  const rootedIcon = document.querySelectorAll('.pms-rooted-card-cont1 .comlist .icon img');
  if (rootedIcon) {
    rootedIcon.forEach((img) => {
      img.setAttribute('alt', 'icon');
    });
  }
  const rootedImg = document.querySelectorAll('.pms-rooted-card1 .icon img');
  if (rootedImg) {
    rootedImg.forEach((img) => {
      img.setAttribute('alt', 'background-image');
    });
  }

  const pmsHighSkin = block.closest('.high-skin');
  if (pmsHighSkin !== null) {
    dataMapMoObj.CLASS_PREFIXES = ['pms-high-skin', 'pms-high-skin-card', 'pms-high-skin-card-cont', 'pms-high-skin-card-subcont'];
    dataMapMoObj.addIndexed(pmsHighSkin);
  }
  // high skin component
  const pmsHighSkinBtn = document.querySelectorAll('.pms-high-skin-card-subcont1 .cards-card-body p a');
  if (pmsHighSkinBtn) {
    pmsHighSkinBtn.forEach((btn) => {
      btn.setAttribute('alt-label', 'hidden');
    });
  }
  const pmsHighSkinImg = document.querySelectorAll('.pms-high-skin-card-subcont1 .cards-card-image img');
  if (pmsHighSkinImg) {
    pmsHighSkinImg.forEach((img) => {
      img.setAttribute('alt', 'coin-img');
    });
  }
  const pmsChoose = block.closest('.pms-choose');
  if (pmsChoose !== null) {
    dataMapMoObj.CLASS_PREFIXES = ['pms-choose', 'pms-choose-detail', 'pms-choose-detail-cont', 'pms-choose-detail-subcont', 'pms-choose-detail-list', 'pms-choose-detail-sublist', 'pms-choose-detail-cls'];
    dataMapMoObj.addIndexed(pmsChoose);
  }

  const pmsChooseLink = document.querySelectorAll('.pms-choose2 h3');
  if (pmsChooseLink) {
    pmsChooseLink.forEach((img) => {
      img.setAttribute('alt-label', 'hidden');
    });
  }
  const pmsChooseImg = document.querySelectorAll('.pms-choose2 pms-choose-detail12 img');
  if (pmsChooseImg) {
    pmsChooseImg.forEach((img) => {
      img.setAttribute('alt', 'tree-img');
    });
  }
  const pmsChooseBtn = document.querySelectorAll('.pms-choose2 .pms-choose-detail11 .button');
  if (pmsChooseBtn) {
    pmsChooseBtn.forEach((btn) => {
      btn.setAttribute('alt-label', 'hidden');
    });
  }


  if (window.location.href.includes('/investor-education/all-articles/')) {
    const maincloser = block.closest('main');
    const rightSub = maincloser.querySelectorAll('.article-sub-right');
    const rightarticle = maincloser.querySelector('.article-right-wrapper');
    Array.from(rightSub).forEach((rightel) => {
      rightarticle.append(rightel);
    });
    const leftSub = maincloser.querySelectorAll('.article-sub-left');
    const leftarticle = maincloser.querySelector('.article-left-wrapper');
    Array.from(leftSub).forEach((leftel) => {
      leftarticle.append(leftel);
    });
  }
}
