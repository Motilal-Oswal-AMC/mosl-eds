import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  Array.from(block.children).forEach((row, rowIndex) => {
    row.classList.add('risk-meter-cont', `corner-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      column.classList.add('risk-meter-corner-cont-column', `column-${colIndex + 1}`);
    });
  });

  const listBlocks = block.querySelectorAll('.risk-meter-corner-cont-column ul');
  Array.from(listBlocks).forEach((ul, index) => {
    ul.classList.add(`risk-meter-corner-cont-ul-${index + 1}`);
  });

  dataMapMoObj.CLASS_PREFIXES = [];
  dataMapMoObj.CLASS_PREFIXES = ['risk'];
  dataMapMoObj.addIndexed(block.closest('.product-label'));

  const risks = block.closest('.product-label');
  const divwrapper = document.createElement('div');
  divwrapper.classList.add('risk-wrapper');
  divwrapper.append(risks.querySelector('.risk2'));
  divwrapper.append(risks.querySelector('.risk3'));
  risks.append(divwrapper);
}
