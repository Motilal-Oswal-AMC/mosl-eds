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

    const pmsHighSkin = block.closest('.high-skin');
  if (pmsHighSkin !== null) {
    dataMapMoObj.CLASS_PREFIXES = ['pms-high-skin',"pms-high-skin-card","pms-high-skin-card-cont","pms-high-skin-card-subcont"];
    dataMapMoObj.addIndexed(pmsHighSkin);
  }
}
