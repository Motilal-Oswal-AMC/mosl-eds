import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  const riskmet = block.closest('.risk-o-meter-container');
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
  // if (block.closest('.product-label')) {
  //   dataMapMoObj.addIndexed(block.closest('.product-label'));

  //   const risks = block.closest('.product-label');
  //   const divwrapper = document.createElement('div');
  //   divwrapper.classList.add('risk-o-meter-container');
  //   divwrapper.append(risks.querySelector('.risk2'));
  //   divwrapper.append(risks.querySelector('.risk3'));
  //   risks.append(divwrapper);
  // }
  if (block.closest('.risk-o-meter-container')) {
    dataMapMoObj.CLASS_PREFIXES = ['defone', 'deftwo', 'defthree', 'deffour'];
    if (riskmet.querySelector('.risk-wrapper')) {
      dataMapMoObj.addIndexed(
        riskmet.querySelector('.risk-wrapper .default-content-wrapper'),
      );
    } else {
      dataMapMoObj.addIndexed(Array.from(riskmet.children)[1]);
    }

    Array.from(riskmet.querySelector('.defone2').children).forEach((elde) => {
      elde.classList.add('defli');
    });
  }
}
