/**
 * Decorates the moedge-article-video block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const mainArticle1 = block.querySelector('.mainarticle1');
  const mainArticle2 = block.querySelector('.mainarticle2');

  if (mainArticle1 && mainArticle2 && mainArticle1.parentNode === mainArticle2.parentNode) {
    const parent = mainArticle1.parentNode;
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('articles-wrapper');
    parent.insertBefore(wrapperDiv, mainArticle1);
    wrapperDiv.appendChild(mainArticle1);
    wrapperDiv.appendChild(mainArticle2);
  }

  // ... any other decoration logic for this block would go here ...
}
