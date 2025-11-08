import dataMapMoObj from '../../scripts/constant.js';

export default async function decorate(block) {
  if (block != null) {
    dataMapMoObj.CLASS_PREFIXES = [
      'glpcoding',
      'glpcoding-inner',
      'glpcoding-sub-inner',
    ];
    dataMapMoObj.addIndexed(block);
  }
}
