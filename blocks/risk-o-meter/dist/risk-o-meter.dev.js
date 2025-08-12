"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decorate;

function decorate(block) {
  // Add risk-meter container classes
  Array.from(block.children).forEach(function (row, rowIndex) {
    row.classList.add('risk-meter-cont', "corner-".concat(rowIndex + 1));
    Array.from(row.children).forEach(function (column, colIndex) {
      column.classList.add('risk-meter-corner-cont-column', "column-".concat(colIndex + 1));
    });
  }); // Add UL-specific classes

  var listBlocks = block.querySelectorAll('.risk-meter-corner-cont-column ul');
  listBlocks.forEach(function (ul, index) {
    ul.classList.add("risk-meter-corner-cont-ul-".concat(index + 1));
  });
}