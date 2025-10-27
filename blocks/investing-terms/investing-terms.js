import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = ['inversting', 'inverstingsub', 'inverstinginner', 'inverstingsubinner'];
  dataMapMoObj.addIndexed(block);
}
