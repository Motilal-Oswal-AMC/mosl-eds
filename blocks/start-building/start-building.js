import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'start-container',
    'start-section',
  ];
  dataMapMoObj.addIndexed(block);
}
