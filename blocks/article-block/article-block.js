import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  if (block.classList.contains('article-left')) {
    dataMapMoObj.CLASS_PREFIXES = ['article-left-main', 'article-left-sub', 'article-left-inner', 'sub-article-left', 'article-sub-inner', 'left-sub-item'];
    dataMapMoObj.addIndexed(block);
  } else if (block.classList.contains('article-right')) {
    dataMapMoObj.CLASS_PREFIXES = ['article-right-main', 'article-right-sub', 'article-right-inner', 'sub-article-right', 'article-sub-inner', 'right-sub-item'];
    dataMapMoObj.addIndexed(block);
  }

  const acticle = block.querySelector('.article-right-main2 .article-right-inner3');
  const acticletext = acticle.textContent.trim();
  const divinput = document.createElement('input');
  divinput.placeholder = acticletext;
  divinput.classList.add('input-email');
  acticle.append(divinput);

  const divspan = document.createElement('span');
  divspan.classList.add('email-error');
  divspan.textContent = 'Enter Valid Email';

  acticle.append(divspan);
}
