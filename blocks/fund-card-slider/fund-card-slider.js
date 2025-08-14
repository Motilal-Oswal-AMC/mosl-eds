import dataMapMoObj from '../../scripts/constant.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import fundcardblock from '../fund-card/fund-card.js';
import swiperblock from '../swiper/swiper.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [];
  dataMapMoObj.CLASS_PREFIXES = ['itemcards', 'subitemcards'];
  dataMapMoObj.addIndexed(block);

  const data = dataCfObj.slice(0, 5);
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-slider-main');
  data.forEach((el) => cardWrapper.append(fundcardblock(el)));
  Array.from(block.classList).forEach((el) => cardWrapper.classList.add(el));
  block.append(cardWrapper);
  swiperblock(block.querySelector('.card-slider-main'));

  //   const btnAction = block.querySelector('.card-slider-main');
  //   const cardWrapperbtn = document.createElement('div');
  //   cardWrapperbtn.classList.add('card-action-btn');
  //   const next = btnAction.querySelector('.swiper-button-next');
  //   const prev = btnAction.querySelector('.swiper-button-prev');
  //   cardWrapperbtn.appendChild(prev);
  //   cardWrapperbtn.appendChild(next);
  //   btnAction.appendChild(cardWrapperbtn);
}
