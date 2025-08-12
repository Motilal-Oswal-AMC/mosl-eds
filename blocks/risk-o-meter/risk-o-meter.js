export default function decorate(block) {
  // Use modern for...of loops for cleaner iteration.
  // .entries() provides the index directly, avoiding a separate counter.
  Array.from(block.children).forEach((row, rowIndex) => {
    // Add multiple classes in a single, more efficient call.
    row.classList.add('risk-meter-cont', `corner-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      column.classList.add('risk-meter-corner-cont-column', `column-${colIndex + 1}`);
    });
  });

  // 1. Corrected the syntax error in the selector.
  // 2. The class selector '.' must be inside the string.
  const listBlocks = block.querySelectorAll('.risk-meter-corner-cont-column ul');

  // Loop over the found <ul> elements to add their specific classes.
  Array.from(listBlocks).forEach((ul, index) => {
    ul.classList.add(`risk-meter-corner-cont-ul-${index + 1}`);
  });
}
