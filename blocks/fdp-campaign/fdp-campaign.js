import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = ['compaign', 'compaignsub', 'compaigninner'];
  dataMapMoObj.addIndexed(block);


  const heroBlock = document.querySelector('.pws-hero-section .default-content-wrapper');

  if (heroBlock) {
    // const paragraphs = heroBlock.querySelectorAll('p');
    dataMapMoObj.CLASS_PREFIXES = ['para', 'p2', 'p3'];
    dataMapMoObj.addIndexed(heroBlock);
  }
  
  // });
}




