/* eslint-disable */
export default function decorate(block) {
    Array.from(block.children).forEach((row, rowIndex) => {
        row.classList.add("risk-meter-cont");
        row.classList.add(`corner-${rowIndex + 1}`);

        Array.from(row.children).forEach((column, colIndex) => {
            column.classList.add("risk-meter-corner-cont-column");
            column.classList.add(`column-${colIndex + 1}`);
        });
    });

    const listBlocks = block.querySelectorAll(".risk-meter-corner-cont-column ul");
    listBlocks.forEach((ul, index) => {
        ul.classList.add(`risk-meter-corner-cont-ul-${index + 1}`);
    });
}