Object.defineProperty(exports, '__esModule', {
  value: true,
});
function decorate(block) {
  // Add risk-meter container classes
  [...block.children].forEach((row, rowIndex) => {
    row.classList.add('risk-meter-cont', `corner-${rowIndex + 1}`);

    [...row.children].forEach((column, colIndex) => {
      column.classList.add(
        'risk-meter-corner-cont-column',
        `column-${colIndex + 1}`,
      );
    });
  });

  // Add UL-specific classes
  const listBlocks = block.querySelectorAll('.risk-meter-corner-cont-column ul');
  listBlocks.forEach((ul, index) => {
    ul.classList.add(`risk-meter-corner-cont-ul-${index + 1}`);
  });
}

exports.default = decorate;
