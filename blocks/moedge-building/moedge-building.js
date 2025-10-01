import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  const moEdge = block; // since block IS the .moedge-building element
  if (moEdge) {
    dataMapMoObj.CLASS_PREFIXES = [
      'moedge-build-cont',
      'moedge-build-sec',
      'moedge-build-sub',
      'moedge-build-inner-text',
      'moedge-build-list',
      'moedge-build-list-content',
    ];
    dataMapMoObj.addIndexed(moEdge);
  }
  return block;
}
