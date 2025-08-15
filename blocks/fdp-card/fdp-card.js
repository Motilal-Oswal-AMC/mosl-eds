import {
  div,
  option,
  select,
  ul,
  li,
  h2,
  p,
} from '../../scripts/dom-helpers.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  Array.from(block.children).forEach((element, index) => {
    element.classList.add(`compound-item${index + 1}`);
    Array.from(element.children).forEach((subelement, ind) => {
      subelement.classList.add(`compound-sub-item${ind + 1}`);
      Array.from(subelement.children).forEach((innerelement, ind1) => {
        innerelement.classList.add(`compound-inner-item${ind1 + 1}`);
      });
    });
  });

  Array.from(block.closest('.fdp-card-container').children).forEach((el, index) => {
    el.classList.add(`item${index + 1}`);
  });
  const cfObj = dataCfObj.slice(0, 1);
  const fundsTaggingSection = cfObj[0].fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  cfObj[0].returns.forEach((ret, jind) => {
    if (jind === 0) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
    finPlangrp.push(ret.plancode + ret.optioncode);
  });

  const DirectPlanlistArr = cfObj[0].planList.filter(
    (el) => el.planName === 'Regular' && finPlangrp.includes(el.groupedCode),
  );

  const classdropdown = DirectPlanlistArr.length !== 0 ? 'flex' : 'none';

  const cardContainer = div(
    { class: 'card-container' },
    div(
      { class: 'card-wrapper' },
      div(
        { class: 'upperdiv' },
        div(
          { class: 'fundname-dropdown' },
          div({ class: 'fundname' }, h2(cfObj[0].schDetail.schemeName)),
          div(
            { class: 'card-category' },
            div(
              { class: 'fund-tagging' },
              ul(
                { class: 'fundtagging-list' },
                ...fundsTaggingSection.map((eloption) => li(
                  eloption
                    .replaceAll('motilal-oswal:', '')
                    .replaceAll('-', ' ')
                    .toUpperCase(),
                )),
              ),
            ),
            div(
              {
                class: 'planlist-dropdown',
                style: `display:${classdropdown}`,
              },
              select(
                {
                  onchange: () => {
                  },
                  'aria-label': 'Select Investment Plan',
                },
                ...DirectPlanlistArr.map((el) => option(
                  {
                    value: el.groupedCode,
                  },
                  el.optionName,
                )),
              ),
            ),
          ),
        ),
        div(
          { class: 'discription' },
          block.querySelector('.compound-item1 .compound-inner-item1')?.textContent,
        ),
      ),
      div({ class: 'middlediv' }),
      div({ class: 'lowerdiv' }),
    ),
  );

  // document.querySelector('.item2 ul').classList.add('item2-ul');
  const ptag = p({ class: 'selectedtext' }, 'Performance');
  const item2Ul = block.closest('.section').querySelector('.item2 ul');
  const item2 = block.closest('.section').querySelector('.item2');
  item2Ul.classList.add('item2-ul');
  item2.prepend(ptag);
  block.innerHTML = '';
  block.append(cardContainer);

  item2Ul.addEventListener('click', (e) => {
    if (window.innerWidth < 786) {
      console.log(e.target.textContent);
      ptag.textContent = e.target.textContent;
      item2Ul.style.display = 'none';
    }
  });
  ptag.addEventListener('click', () => {
    if (window.innerWidth < 786) {
      item2Ul.style.display = 'block';
    }
  });
  document.querySelectorAll('.table-wrapper').forEach((el) => {
    document.querySelector('.item2').append(el);
  });
  document.querySelectorAll('.section .item2 ul li a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');// scrollMap[];
      const target = document.querySelector(`.section[data-id="${targetId}"]`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.section .navlinks ul li a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');// scrollMap[];
      const target = document.querySelector(`.section[data-id="${targetId}"]`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
