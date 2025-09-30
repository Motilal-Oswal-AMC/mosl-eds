import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = ['compaign', 'compaignsub', 'compaigninner'];
  dataMapMoObj.addIndexed(block);
}
