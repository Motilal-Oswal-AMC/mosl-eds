/*    */
// import Embed from '../embed/embed.js';
import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  // Embed(block.children[1].querySelector('.button-container'));
  dataMapMoObj.CLASS_PREFIXES = ['fundvedmain', 'fundvedsubmain', 'fundvedinnermain', 'fundsubvedmain'];
  dataMapMoObj.addIndexed(block);

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('fundsubinner');
  const fundv2 = block.querySelector('.fundvedmain2');
  const fundvedone = block.querySelector('.fundvedmain2 .fundvedinnermain1');
  const fundvedtwo = block.querySelector('.fundvedmain2 .fundvedinnermain2');
  imgWrapper.appendChild(fundvedone);
  imgWrapper.appendChild(fundvedtwo);
  fundv2.prepend(imgWrapper);
}
