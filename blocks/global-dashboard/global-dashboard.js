import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = ['global', 'globalsub', 'globalinner', 'globalsubinner'];
  dataMapMoObj.addIndexed(block);

  const textPart = document.querySelector('.global-dashboard-container .default-content-wrapper');
  dataMapMoObj.CLASS_PREFIXES = ['global-text', 'global-textsub', 'global-textinner', 'global-textsubinner'];
  dataMapMoObj.addIndexed(textPart);
}
