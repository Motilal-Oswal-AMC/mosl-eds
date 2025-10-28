import dataMapMoObj from '../../scripts/constant.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import fundcardblock from '../fund-card/fund-card.js';
import swiperblock from '../swiper/swiper.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [];
  dataMapMoObj.CLASS_PREFIXES = ['itemcards', 'subitemcards'];
  dataMapMoObj.addIndexed(block);

  const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  const planslabel = planCode.split(':')[1];
  const planObj = dataCfObj.cfDataObjs.filter((el) => planslabel === el.schcode);
  const plantag = planObj[0].fundsTaggingSection[1];
  const cardtemp = dataCfObj.cfDataObjs.filter(
    (el) => (el.fundsTaggingSection.includes(plantag) && el.schcode !== planslabel),
  );
  let data;
  if (cardtemp.length < 5) {
    data = cardtemp;
  } else {
    data = cardtemp.slice(0, 5);
  }
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-slider-main');
  data.forEach((el) => cardWrapper.append(fundcardblock(el)));
  Array.from(block.classList).forEach((el) => cardWrapper.classList.add(el));
  block.append(cardWrapper);
  swiperblock(block.querySelector('.card-slider-main'));
  if (data.length === 0) {
    const fundslid = block.closest('.fund-card-slider-container');
    fundslid.style.display = 'none';
    block.style.display = 'none';
    if (window.innerWidth < 768) {
      const item = block.closest('.fdp-card-container').querySelector('.item2-ul');
      const idval = block.closest('.section').getAttribute('data-id');
      item.querySelector(`#${idval}`).style.display = 'none';
    }
  } else if (window.innerWidth > 1024
    && block.querySelectorAll('.swiper-slide').length < 3) {
    block.querySelector('.btn-wrapper').style.display = 'none';
  }
}
