import dataCfObj from '../../scripts/dataCfObj.js';
import {
  div,
  input,
  label,
  span,
  p,
  button,
  ul,
  li,
  img,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
import fundcardblock from '../fund-card/fund-card.js';
import listviewblock from '../list-view-card/list-view-card.js';

function searchFunctionality(block) {
  // 1. Cache all necessary DOM element references
  const searchContainer = document.querySelector('.search-input');
  const searchInput = searchContainer.querySelector('.search');
  const listContainer = searchContainer.querySelector('.list-search');
  // const listItems = searchContainer.querySelectorAll('.list-fund-name');
  const cancelButton = searchContainer.querySelector('.cancel-search');
  const FUND_DATA = dataMapMoObj.funddata.map((fund) => fund.schDetail.schemeName);

  const populateList = () => {
    listContainer.innerHTML = ''; // Clear list before populating
    FUND_DATA.forEach((fundName) => {
      const item = document.createElement('li');
      item.className = 'list-fund-name';
      item.textContent = fundName;
      listContainer.appendChild(item);
    });
  };

  // --- SCRIPT INITIALIZATION ---
  populateList(); // Create the list on page load

  // --- IMPORTANT: Select listItems AFTER they have been created ---
  const listItems = searchContainer.querySelectorAll('.list-fund-name');
  listItems.forEach((item) => {
    item.dataset.originalText = item.textContent;
  });
  // --- End of Initialization ---

  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // The filter function remains the same
  const filterListItems = (searchTerm) => {
    const term = searchTerm.trim();
    const existingNoResultsMessage = listContainer.querySelector('.no-results-message');
    if (existingNoResultsMessage) existingNoResultsMessage.remove();
    listContainer.classList.remove('no-search-list');

    if (!term) {
      listItems.forEach((item) => {
        item.innerHTML = item.dataset.originalText;
        item.style.display = 'list-item';
      });
      return;
    }

    const searchRegex = new RegExp(escapeRegExp(term), 'gi');
    let matchesFound = false;

    listItems.forEach((item) => {
      const {
        originalText,
      } = item.dataset;
      const match = originalText.match(searchRegex);
      if (match) {
        matchesFound = true;
        const highlightedText = originalText.replace(searchRegex, (mat) => `<strong>${mat}</strong>`);
        item.innerHTML = highlightedText;
        item.style.display = 'list-item';
      } else {
        item.style.display = 'none';
      }
    });

    if (!matchesFound) {
      listContainer.classList.add('no-search-list');
      const messageItem = document.createElement('li');
      messageItem.className = 'list-fund-name no-results-message';
      messageItem.textContent = 'No results found';
      listContainer.appendChild(messageItem);
    }
  };

  searchInput.addEventListener('focus', searchContainer.classList.add('search-active')); // activateSearch);
  searchContainer.classList.remove('search-active');
  searchInput.addEventListener('input', (event) => {
    filterListItems(event.target.value);
    searchContainer.classList.add('search-active');
    cancelButton.style.display = event.target.value.length > 0 ? 'block' : 'none';
  });

  listContainer.addEventListener('click', (event) => {
    if (event.target.matches('.list-fund-name:not(.no-results-message)')) {
      searchInput.value = event.target.dataset.originalText;
      searchContainer.classList.remove('search-active');
      // CARD HIDE LOGIC ON SEARCH
      const cardsContainer = block.querySelector('.filter-cards .cards-container');
      if (cardsContainer && cardsContainer.checkVisibility()) {
        Array.from(cardsContainer.children).forEach((elment) => {
          const schname = elment.querySelector('.title-subtitle p').textContent + elment.querySelector('.title-subtitle h2').textContent;
          elment.style.display = 'block';
          if (searchInput.value !== schname) {
            elment.style.display = 'none';
          }
        });
      }

      const listHeader = block.querySelector('.filter-cards .list-container');
      if (listHeader && listHeader.checkVisibility()) {
        Array.from(listHeader.children).forEach((elment) => {
          const schname = elment.querySelector('.fund-name-container').textContent;
          elment.style.display = 'block';
          if (searchInput.value !== schname) {
            elment.style.display = 'none';
          }
        });
      }
    }
  });

  cancelButton.addEventListener('click', () => {
    searchInput.value = '';
    filterListItems('');
    cancelButton.style.display = 'none';
    searchContainer.classList.remove('search-active');
  });

  document.addEventListener('click', (event) => {
    if (!searchContainer.contains(event.target)) {
      searchContainer.classList.remove('search-active');
      // searchInput.value = ""
    }
    document.querySelectorAll('.cagr-container').forEach((el) => {
      if (!el.contains(event.target)) {
        el.querySelector('.dropdown-list').classList.remove('dropdown-active');
      }
    });
    document.querySelectorAll('.card-category').forEach((el) => {
      if (!el.contains(event.target)) {
        el.querySelector('.dropdown-list').classList.remove('dropdown-active');
      }
    });
  });

  if (searchInput.value.length === 0) {
    cancelButton.style.display = 'none';
  }
}

function dataFilterfun(param) {
  const dataMapObj = {
    schemeName: [],
    fundCategory: [
      { 'indian-equity': [] },
      { 'international-equity': [] },
      { 'hybrid-&-balanced': [] },
      { 'multi-asset': [] },
      { commodity: [] },
      { 'debt-&-liquid': [] },
      {
        indianEquitySub: [
          { 'Indian Equity - Large and Mid Cap': [] },
          { 'Indian Equity - Large Cap': [] },
          { 'Indian Equity - Mid Cap': [] },
          { 'Indian Equity - Small Cap': [] },
          { 'Indian Equity - Sector': [] },
          { 'Indian Equity - Factor': [] },
          { 'Indian Equity - Tax Saver (ELSS)': [] },
          { 'Indian Equity - Multi Cap': [] },
        ],
      },
    ],
    fundType: [
      { active: [] },
      { 'index-funds': [] },
      { etf: [] },
    ],
    sort: [
      {
        ListDropdown: [
          { text: 'Popular', value: 'inception_Ret' },
          { text: '1 Year Returns', value: 'oneYear_Ret' },
          { text: '3 Year Returns', value: 'threeYear_Ret' },
          { text: '5 Year Returns', value: 'fiveYear_Ret' },
          { text: '7 Year Returns', value: 'sevenYear_Ret' },
          { text: '10 Year Returns', value: 'tenYear_Ret' },
        ],
        inception_Ret: [],
        oneYear_Ret: [],
        threeYear_Ret: [],
        fiveYear_Ret: [],
        sevenYear_Ret: [],
        tenYear_Ret: [],
      },
    ],
  };

  const { fundCategory } = dataMapObj;
  const { fundType } = dataMapObj;
  const fundSort = dataMapObj.sort[0];
  const equitySub = fundCategory[fundCategory.length - 1].indianEquitySub;

  const categoryMapKeys = [
    'motilal-oswal:indian-equity-',
    'motilal-oswal:international-equity',
    'motilal-oswal:hybrid-&-balanced',
    'motilal-oswal:multi-asset',
    'motilal-oswal:commodity',
    'motilal-oswal:debt-&-liquid',
  ];
  const categoryValues = [
    'indian-equity',
    'international-equity',
    'hybrid-&-balanced',
    'multi-asset',
    'commodity',
    'debt-&-liquid',
  ];

  const typeMapKeys = [
    'motilal-oswal:active',
    'motilal-oswal:index-funds',
    'motilal-oswal:etf',
  ];
  const typeValues = ['active', 'index-funds', 'etf'];

  for (let i = 0; i < param.length; i += 1) {
    const name = param[i];
    const tags = name.fundsTaggingSection;
    const { schcode } = name;

    // Category matching
    for (let k = 0; k < categoryMapKeys.length; k += 1) {
      if (tags.indexOf(categoryMapKeys[k]) !== -1) {
        const category = categoryValues[k];
        for (let j = 0; j < fundCategory.length; j += 1) {
          if (fundCategory[j][category]) {
            fundCategory[j][category].push(schcode);
            break;
          }
        }
      }
    }

    // Type matching
    for (let k = 0; k < typeMapKeys.length; k += 1) {
      if (tags.indexOf(typeMapKeys[k]) !== -1) {
        const type = typeValues[k];
        for (let j = 0; j < fundType.length; j += 1) {
          if (fundType[j][type]) {
            fundType[j][type].push(schcode);
            break;
          }
        }
      }
    }

    // Sub-categorization
    const subCat = name.fundSubCategorisation;
    if (subCat) {
      for (let j = 0; j < equitySub.length; j += 1) {
        if (equitySub[j][subCat]) {
          equitySub[j][subCat].push(schcode);
          break;
        }
      }
    }

    // Returns sorting
    const { returns } = name;
    if (returns && returns.length) {
      for (let r = 0; r < returns.length; r += 1) {
        const ret = returns[r];
        if (ret.inception_Ret && fundSort.inception_Ret.indexOf(schcode) === -1) {
          fundSort.inception_Ret.push(schcode);
        }
        if (ret.oneYear_Ret && fundSort.oneYear_Ret.indexOf(schcode) === -1) {
          fundSort.oneYear_Ret.push(schcode);
        }
        if (ret.threeYear_Ret && fundSort.threeYear_Ret.indexOf(schcode) === -1) {
          fundSort.threeYear_Ret.push(schcode);
        }
        if (ret.fiveYear_Ret && fundSort.fiveYear_Ret.indexOf(schcode) === -1) {
          fundSort.fiveYear_Ret.push(schcode);
        }
        if (ret.sevenYear_Ret && fundSort.sevenYear_Ret.indexOf(schcode) === -1) {
          fundSort.sevenYear_Ret.push(schcode);
        }
        if (ret.tenYear_Ret && fundSort.tenYear_Ret.indexOf(schcode) === -1) {
          fundSort.tenYear_Ret.push(schcode);
        }
      }
    }

    const sh = schcode;
    // Scheme Name
    dataMapObj.schemeName.push({
      schemeName: name.schDetail.schemeName,
      schcode: sh,
    });
  }

  return dataMapObj;
}

function capitalizeEachWord(sentence) {
  if (sentence.includes('etf')) {
    return `${sentence.toUpperCase()}'s`;
  }
  return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
}

function viewFunction(param) {
  param.querySelector('.list-container').innerHTML = '';
  param.querySelector('.cards-container').innerHTML = '';
  if (Array.from(param.querySelector('.listby-container').classList).includes('list-view-active')) {
    dataMapMoObj.funddata.forEach((el) => {
      param.querySelector('.list-container').append(listviewblock(el));
    });
  } else {
    dataMapMoObj.funddata.forEach((el) => {
      param.querySelector('.cards-container').append(fundcardblock(el));
    });
  }
  searchFunctionality(param);
}

function checkfilter(block) {
  const filterTag = []; // 5-8-25
  const tempData = [];
  Array.from(block.querySelector('.filter-list-wrapper').children).forEach((el) => {
    if (el.closest('.checkbox-label-container').querySelector('.innerIndianEquity')) {
      el.closest('.checkbox-label-container').querySelectorAll('.innerIndianEquity input').forEach((elemsub) => {
        if (elemsub.checked && !tempData.includes(elemsub.getAttribute('dataattr'))) {
          filterTag.push(elemsub.nextElementSibling.textContent.trim()); // 5-8-25
          elemsub.getAttribute('dataattr').split('-').forEach((eldata) => {
            if (!tempData.includes(eldata)) {
              tempData.push(eldata);
            }
          });
        }
      });
    }
    if (el.querySelector('input').checked && el.querySelector('input').getAttribute('id') !== 'index1') {
      filterTag.push(el.querySelector('input').nextElementSibling.textContent.replace(/\d+/g, '').replaceAll('()', '')); // 5-8-25
      el.querySelector('input').getAttribute('dataattr').split('-').forEach((eldata) => {
        if (!tempData.includes(eldata)) {
          tempData.push(eldata);
        }
      });
    }
  });
  if (window.innerWidth > 786) {
    dataMapMoObj.funddata = dataCfObj.filter((el, index) => {
      if (tempData.length > 0) {
        return tempData.includes(el.schcode);
      }
      return index < 9;
    });
  }

  viewFunction(block);
  function filterGroup(Filterparam) {
    const appliedList = block.querySelector('.applied-filter-list');
    appliedList.innerHTML = '';

    // Render applied filters
    for (let i = 0; i < Filterparam.length; i += 1) {
      appliedList.innerHTML += `<li class="applied-filter-name"><span>${Filterparam[i]}</span><img src="../../icons/cross-icon.svg" alt="cross icon"></li>`;
    }

    // Add remove logic for each tag
    const appliedItems = Array.from(appliedList.children);
    for (let i = 0; i < appliedItems.length; i += 1) {
      const removeIcon = appliedItems[i].querySelector('img');
      removeIcon.addEventListener('click', (event) => {
        const updatedFilterTag = [];
        const clickedText = event.target.closest('.applied-filter-name').querySelector('span').textContent;

        const currentItems = Array.from(appliedList.children);
        for (let j = 0; j < currentItems.length; j += 1) {
          const spanText = currentItems[j].querySelector('span').textContent;
          if (spanText !== clickedText) {
            updatedFilterTag.push(spanText);
          }
        }

        // Re-render after removal
        filterGroup(updatedFilterTag);

        // Uncheck logic
        const filterItems = Array.from(block.querySelector('.filter-list-wrapper').children);
        for (let k = 0; k < filterItems.length; k += 1) {
          const item = filterItems[k];
          const checkboxContainer = item.closest('.checkbox-label-container');
          if (checkboxContainer) {
            const innerEquity = checkboxContainer.querySelector('.innerIndianEquity');
            if (innerEquity) {
              const subInputs = innerEquity.querySelectorAll('input');
              for (let l = 0; l < subInputs.length; l += 1) {
                const innerFundFilter = subInputs[l].nextElementSibling.textContent.trim();
                if (updatedFilterTag.indexOf(innerFundFilter) === -1) {
                  subInputs[l].checked = false;
                }
              }
            }

            const inp = item.querySelector('input');
            if (inp) {
              const idAttr = inp.getAttribute('id');
              const filterFundName = inp.nextElementSibling?.textContent.replace(/\d+/g, '').replaceAll('()', '').trim();
              const outerLabel = checkboxContainer.querySelector('label')?.textContent.replace(/\d+/g, '').replaceAll('()', '').trim();

              if (idAttr.includes('index') && filterFundName && updatedFilterTag.indexOf(filterFundName) === -1) {
                inp.checked = false;
              } else if (idAttr.includes('fundtype') && outerLabel && updatedFilterTag.indexOf(outerLabel) === -1) {
                inp.checked = false;
              }

              checkfilter(block);
            }
          }
        }
      });
    }
  }

  filterGroup(filterTag);
}

function applyFunction(block) {
  let temp = dataMapMoObj.tempMobReturn === undefined ? [] : dataMapMoObj.tempMobReturn;
  temp = dataMapMoObj.tempMobReturn.length !== 0 ? temp : dataCfObj.slice(0, 9);
  dataMapMoObj.tempMobReturn = temp;
  if (Array.from(block.querySelector('.filter-overlay').classList).includes('active')) {
    dataMapMoObj.funddata = dataMapMoObj.tempMobReturn;
    dataMapMoObj.tempMobReturn = [];
    block.querySelector('.filter-overlay').classList.remove('active');
    checkfilter(block);
  } else if (Array.from(block.querySelector('.sort-overlay').classList).includes('active')) {
    dataMapMoObj.funddata = dataMapMoObj.tempMobReturn;
    dataMapMoObj.tempMobReturn = [];
    block.querySelector('.sort-overlay').classList.remove('active');
    dataMapMoObj.selectreturns = dataMapMoObj.selectreturnstemp;
    viewFunction(block);
  }
}
export default function decorate(block) {
  Array.from(block.closest('.section').children).forEach((el, index) => {
    el.classList.add(`item${index + 1}`);
  });
  Array.from(block.children).forEach((el, index) => {
    el.classList.add(`block-item${index + 1}`);
    Array.from(el.children).forEach((elsub, indexsub) => {
      elsub.classList.add(`block-subitem${indexsub + 1}`);
      Array.from(elsub.children).forEach((finelsub, indexin) => {
        finelsub.classList.add(`block-subitem-finelsub${indexin + 1}`);
      });
    });
  });
  Array.from(block.closest('.section').querySelector('.item2').children).forEach((el) => {
    el.classList.add('list-header-text');
  });
  Array.from(block.querySelector('.block-item3 .block-subitem-finelsub3').children).forEach((el) => {
    el.classList.add('viewlist-btn');
  });
  Array.from(
    block.querySelector('.block-item3 .block-subitem-finelsub4').children,
  ).forEach((el) => {
    el.classList.add('viewlist-btn');
  });

  dataMapMoObj.selectreturns = '';
  dataMapMoObj.data = dataFilterfun(dataCfObj);
  dataMapMoObj.funddata = dataCfObj.slice(0, 9);
  const divfund = div(
    {
      class: 'blockwrapper',
    },
    div(
      {
        class: 'upper-container',
      },
      div(
        {
          class: 'fundcontainer',
        },
        block.querySelector('.block-subitem1'),
        div(
          {
            class: 'search-trending-wrapper',
          },
          div(
            {
              class: 'search-input',
            },
            input({
              class: 'search',
              placeholder: block
                .querySelector('.block-subitem2 .block-subitem-finelsub1')
                .textContent.trim(),
            }),
            div(
              {
                class: 'cancel-search',
              },
              img({
                class: 'cancel-btn',
                src: '../../icons/input-cancel.svg',
                alt: 'cancel button',
              }),
            ),
            ul(
              {
                class: 'list-search',
              },
              ...dataMapMoObj.funddata.map((el) => li(
                {
                  class: 'list-fund-name',
                  schcode: el.schcode,
                },
                el.schDetail.schemeName,
              )),
            ),
          ),
          div(
            {
              class: 'watchlist',
            },
            div(
              {
                class: 'staricon',
              },
              block.querySelector(
                '.block-subitem2 .block-subitem-finelsub2 span',
              ),
              block.querySelector(
                '.block-subitem2 .block-subitem-finelsub3 span',
              ),
            ),
            div(
              {
                class: 'watchlisttext',
              },
              span(
                block
                  .querySelector('.block-subitem2 .block-subitem-finelsub3')
                  .textContent.trim(),
              ),
            ),
          ),
          div(
            {
              class: 'trending-container',
            },
            div(
              {
                class: 'trendinglabel',
              },
              p(
                block.querySelector(
                  '.block-subitem2 .block-subitem-finelsub4 span',
                ),
              ),
              span(
                { class: 'trending-text' },
                block
                  .querySelector('.block-subitem2 .block-subitem-finelsub5')
                  .textContent.trim(),
              ),
            ),
            div(
              {
                class: 'trendingmostlist',
              },
              block.querySelector('.block-subitem2 .block-subitem-finelsub6'),
            ),
          ),
        ),
      ),
    ),
    div(
      {
        class: 'filter-cards',
      },
      div(
        {
          class: 'left-container',
        },
        div(
          {
            class: 'fundcategory-container',
          },
          div(
            {
              class: 'filter-sort-container',
            },
            div(
              {
                class: 'filter-wrapper',
                onclick: () => {
                  block
                    .querySelector('.filter-overlay')
                    .classList.add('active');
                  if (
                    Array.from(
                      block.querySelector('.sort-overlay').classList,
                    ).includes('active')
                  ) {
                    block
                      .querySelector('.sort-overlay')
                      .classList.remove('active');
                  }
                },
              },
              div(
                {
                  class: 'filter-text',
                },
                block.querySelector(
                  '.block-item2 .block-subitem-finelsub1 span',
                ),
                p(
                  block
                    .querySelector('.block-item2 .block-subitem-finelsub2')
                    .textContent.trim(),
                ),
              ),
              button({
                class: 'clearall-btn',
                onclick: () => {
                  Array.from(
                    block.querySelector('.filter-list-wrapper').children,
                  ).forEach((el) => {
                    if (
                      el
                        .closest('.checkbox-label-container')
                        .querySelector('.innerindianequity')
                    ) {
                      el.closest('.checkbox-label-container')
                        .querySelectorAll('.innerindianequity input')
                        .forEach((elemsub) => {
                          elemsub.checked = false;
                        });
                    }
                    el.querySelector('input').checked = false;
                  });
                  dataMapMoObj.funddata = dataCfObj.slice(0, 9);
                  viewFunction(block);
                },
              }, 'Clear All'),
            ),
            div(
              {
                class: 'sort-wrapper',
                onclick: () => {
                  block.querySelector('.sort-overlay').classList.add('active');
                  if (
                    Array.from(
                      block.querySelector('.filter-overlay').classList,
                    ).includes('active')
                  ) {
                    block
                      .querySelector('.filter-overlay')
                      .classList.remove('active');
                  }
                },
              },
              block.querySelector('.block-item2 .block-subitem-finelsub3 span'),
              label(
                block
                  .querySelector('.block-item2 .block-subitem-finelsub4')
                  .textContent.trim(),
              ),
            ),
          ),
          div(
            {
              class: 'filter-overlay',
            },
            div(
              {
                class: 'filter-container',
              },
              div(
                {
                  class: 'clearall-wrapper',
                },
                span('Filters'),
                button(
                  {
                    class: 'clearall-btn',
                    onclick: () => {
                      Array.from(
                        block.querySelector('.filter-list-wrapper').children,
                      ).forEach((el) => {
                        if (
                          el
                            .closest('.checkbox-label-container')
                            .querySelector('.innerindianequity')
                        ) {
                          el.closest('.checkbox-label-container')
                            .querySelectorAll('.innerindianequity input')
                            .forEach((elemsub) => {
                              elemsub.checked = false;
                            });
                        }
                        el.querySelector('input').checked = false;
                      });
                      dataMapMoObj.funddata = dataCfObj.slice(0, 9);
                    },
                  },
                  'Clear All',
                ),
              ),
              div(
                {
                  class: 'filter-list-wrapper',
                },
                ...dataMapMoObj.data.fundCategory.map((element, index) => {
                  const indexeq = index === 0 ? 'indaneqsub' : '';
                  if (
                    capitalizeEachWord(
                      Object.keys(element)[0].replaceAll('-', ' '),
                    ) === 'Indian Equity'
                  ) {
                    dataMapMoObj[`${index}ArrayDoc`] = div(
                      {
                        class: 'indian-equity-container',
                      },
                      ...dataMapMoObj.data.fundCategory[
                        dataMapMoObj.data.fundCategory.length - 1
                      ].indianEquitySub.map((elme, ind) => {
                        const sublabel = Object.keys(elme)[0]
                          .split('-')[1]
                          .trim();
                        return div(
                          {
                            class: 'checkbox-label-container',
                          },
                          input({
                            class: 'categorey-direct',
                            type: 'checkbox',
                            id: `ind${ind + 1}`,
                            dataattr: elme[Object.keys(elme)].join('-'),
                            onclick: (event) => {
                              if (window.innerWidth < 786) {
                                const dataattr = event.target
                                  .getAttribute('dataattr')
                                  .split('-');
                                const tempdata = dataCfObj.filter((el) => (dataattr.includes(el.schcode) ? el : ''));
                                dataMapMoObj.tempMobReturn = [];
                                dataMapMoObj.tempMobReturn = tempdata;
                              } else {
                                checkfilter(block);
                              }
                            },
                          }),
                          label(
                            {
                              for: `ind${ind + 1}`,
                            },
                            sublabel,
                          ),
                        );
                      }),
                    );
                  }
                  return Object.keys(element)[0] !== 'indianEquitySub'
                    ? div(
                      {
                        class: `checkbox-label-container ${indexeq}`,
                      },
                      input({
                        class: 'categorey-direct',
                        type: 'checkbox',
                        id: `index${index + 1}`,
                        dataattr: element[Object.keys(element)[0]].join('-'),
                        onclick: (event) => {
                          // const fundScheme = event.target
                          //   .getAttribute('dataattr')
                          //   .split('-');
                          if (event.target.closest('.indaneqsub')) {
                            const el = event.target.closest('.indaneqsub');
                            if (el.querySelector('.innerIndianEquity')) {
                              el.querySelectorAll(
                                '.innerIndianEquity input',
                              ).forEach((elemsub) => {
                                elemsub.checked = el.querySelector('input').checked;
                              });
                            }
                          }
                          if (window.innerWidth < 786) {
                            const dataattr = event.target
                              .getAttribute('dataattr')
                              .split('-');
                            const tempdata = dataCfObj.filter((el) => (dataattr.includes(el.schcode) ? el : ''));
                            dataMapMoObj.tempMobReturn = [];
                            dataMapMoObj.tempMobReturn = tempdata;
                          } else {
                            checkfilter(block);
                          }
                        },
                      }),
                      label(
                        {
                          for: `index${index + 1}`,
                        },
                        capitalizeEachWord(
                          Object.keys(element)[0].replaceAll('-', ' '),
                        ),
                        span(
                          {
                            class: 'fund-length',
                          },
                          `(${element[Object.keys(element)[0]].length})`,
                        ),
                      ),
                      div(
                        {
                          class: 'tooltip-wrap',
                        },
                        img({
                          src: '../../icons/filter-info.svg',
                        }),
                        p(
                          {
                            class: 'tooltip-text',
                          },
                          'Shares of companies listed on Indian stock exchanges, representing ownership in businesses operating in India.',
                        ),
                      ),
                      capitalizeEachWord(
                        Object.keys(element)[0].replaceAll('-', ' '),
                      ) === 'Indian Equity'
                        ? div(
                          {
                            class: 'innerIndianEquity',
                          },
                          dataMapMoObj[`${index}ArrayDoc`],
                        )
                        : '',
                    )
                    : '';
                }),
                ...dataMapMoObj.data.fundType.map((element, index) => div(
                  {
                    class: 'checkbox-label-container',
                  },
                  input({
                    class: 'categorey-direct',
                    type: 'checkbox',
                    id: `fundtype${index + 1}`,
                    dataattr: element[Object.keys(element)[0]].join('-'),
                    onclick: (event) => {
                      // checkfilter(block);
                      if (window.innerWidth < 786) {
                        const dataattr = event.target
                          .getAttribute('dataattr')
                          .split('-');
                        const tempdata = dataCfObj.filter((el) => dataattr.includes(el.schcode));

                        dataMapMoObj.tempMobReturn = [];
                        dataMapMoObj.tempMobReturn = tempdata;
                      } else {
                        checkfilter(block);
                      }
                      // viewFunction(block);
                    },
                  }),
                  div(
                    { class: 'label-tooltip-wrap' },
                    label(
                      {
                        for: `fundtype${index + 1}`,
                      },
                      capitalizeEachWord(
                        Object.keys(element)[0].replaceAll('-', ' '),
                      ),
                      span(
                        `(${element[Object.keys(element)[0]].length})`,
                      ),
                    ),
                    div(
                      { class: 'tooltip-wrap' },
                      img({
                        src: '../../icons/filter-info.svg',
                        alt: 'Filter Info Icon',
                      }),
                      p(
                        { class: 'tooltip-text' },
                        'Shares of companies listed on Indian stock exchanges, representing ownership in businesses operating in India.',
                      ),
                    ),
                  ),
                )),
              ),
              div(
                {
                  class: 'apply-wrapper',
                },
                button(
                  {
                    class: 'close-btn',
                    onclick: () => {
                      block
                        .querySelector('.filter-overlay')
                        .classList.remove('active');
                      block
                        .querySelector('.sort-overlay')
                        .classList.remove('active');
                    },
                  },
                  'Close',
                ),
                button(
                  {
                    class: 'apply-btn',
                    onclick: () => {
                      applyFunction(block);
                    },
                  },
                  'Apply',
                ),
              ),
            ),
          ),
          div(
            {
              class: 'sort-overlay',
            },
            div(
              {
                class: 'sort-container',
              },
              div(
                {
                  class: 'sort-label',
                },
                // span(label(
                //   block.querySelector(".block-item3 .block-subitem-finelsub1").textContent.trim()
                // ))
                span(
                  block
                    .querySelector('.block-item3 .block-subitem-finelsub1')
                    .textContent.trim(),
                ),
              ),
              div(
                {
                  class: 'arrange-returns',
                },
                div(
                  {
                    class: 'arrange-container',
                  },
                  span('Arrange by'),
                  div(
                    {
                      class: 'radio-label-container',
                    },
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'popular',
                        name: 'arrange',
                      }),
                      label(
                        {
                          for: 'popular',
                        },
                        'Popular',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'lastnav',
                        name: 'arrange',
                      }),
                      label(
                        {
                          for: 'lastnav',
                        },
                        'Latest NAV',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'lastnavone',
                        name: 'arrange',
                      }),
                      label(
                        {
                          for: 'lastnavone',
                        },
                        'Latest by 1 day',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'oldnew',
                        name: 'arrange',
                      }),
                      label(
                        {
                          for: 'oldnew',
                        },
                        'Oldest to Newest',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'newold',
                        name: 'arrange',
                      }),
                      label(
                        {
                          for: 'newold',
                        },
                        'Newest to Oldest',
                      ),
                    ),
                  ),
                ),
                div(
                  {
                    class: 'return-container',
                  },
                  span('Returns Period'),
                  div(
                    {
                      class: 'radio-label-container',
                    },
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'sinceinp',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].inception_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'sinceinp',
                        },
                        'Since Inception',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'oneyear',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].oneYear_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'oneyear',
                        },
                        '1 year',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'threeyear',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].threeYear_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'threeyear',
                        },
                        '3 years',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'fiveyear',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].fiveYear_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'fiveyear',
                        },
                        '5 years',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'tenyear',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].sevenYear_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'tenyear',
                        },
                        '7 years',
                      ),
                    ),
                    div(
                      {
                        class: 'radio-label',
                      },
                      input({
                        type: 'radio',
                        id: 'tenyear',
                        name: 'returns',
                        dataattr: dataMapMoObj.data.sort[0].tenYear_Ret.join('-'),
                      }),
                      label(
                        {
                          for: 'tenyear',
                        },
                        '10 years',
                      ),
                    ),
                  ),
                ),
              ),
              div(
                {
                  class: 'close-apply-btn',
                },
                button(
                  {
                    class: 'closebtn',
                    onclick: () => {
                      block
                        .querySelector('.filter-overlay')
                        .classList.remove('active');
                      block
                        .querySelector('.sort-overlay')
                        .classList.remove('active');
                    },
                  },
                  'close',
                ),
                button(
                  {
                    class: 'applybtn',
                    onclick: () => {
                      applyFunction(block);
                    },
                  },
                  'Apply',
                ),
              ),
            ),
          ),
        ),
      ),
      div(
        {
          class: 'right-container',
        },
        div(
          {
            class: 'sort-pop-container',
          },
          div(
            {
              class: 'sort-popular',
            },
            div(
              {
                class: 'sort-container',
              },
              span(
                { class: 'sort-pop-label' },
                block
                  .querySelector('.block-item3 .block-subitem-finelsub1')
                  .textContent.trim(),
              ),
              div(
                {
                  class: 'sort-select-container',
                },
                p(
                  {
                    class: 'selectedtext',
                    onclick: (event) => {
                      event.target.nextElementSibling.classList.add(
                        'dropdown-active',
                      );
                    },
                  },
                  'Popular',
                ),
                ul(
                  {
                    class: 'dropdown-list',
                    onclick: (event) => {
                      event.target
                        .closest('.dropdown-list')
                        .classList.remove('dropdown-active');
                      const name = event.target.textContent.trim();
                      event.target
                        .closest('.sort-select-container')
                        .querySelector('p').innerText = '';
                      event.target
                        .closest('.sort-select-container')
                        .querySelector('p').innerText = name;
                      // planListEvent(event,block)
                    },
                  },
                  li('Popular'),
                  li('Latest NAV'),
                  li('Lastest by 1 day'),
                  li('Oldest to Newest'),
                  li('Newest to Oldest'),
                ),
              ),
            ),
            div(
              {
                class: 'popular-container',
              },
              span(
                { class: 'sort-pop-label' },
                block
                  .querySelector('.block-item3 .block-subitem-finelsub2')
                  .textContent.trim(),
              ),
              div(
                {
                  class: 'return-select-container',
                },
                p(
                  {
                    class: 'selectedtext',
                    onclick: (event) => {
                      event.target.nextElementSibling.classList.add(
                        'dropdown-active',
                      );
                    },
                  },
                  '1 YEAR',
                ),
                ul(
                  {
                    class: 'dropdown-list',
                    onclick: (event) => {
                      event.target
                        .closest('.dropdown-list')
                        .classList.remove('dropdown-active');
                      const name = event.target.textContent.trim();
                      event.target
                        .closest('.return-select-container')
                        .querySelector('p').innerText = '';
                      event.target
                        .closest('.return-select-container')
                        .querySelector('p').innerText = name;
                      const dataattr = event.target
                        .getAttribute('dataattr')
                        .split('-');
                      const tempdata = dataCfObj.filter((el) => (dataattr.includes(el.schcode) ? el : ''));
                      dataMapMoObj.selectreturns = name;
                      dataMapMoObj.funddata = [];
                      dataMapMoObj.funddata = tempdata;
                      viewFunction(block);
                    },
                  },
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].oneYear_Ret.join('-'),
                    },
                    '1 YEAR',
                  ),
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].threeYear_Ret.join('-'),
                    },
                    '3 YEARS',
                  ),
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].fiveYear_Ret.join('-'),
                    },
                    '5 YEARS',
                  ),
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].sevenYear_Ret.join('-'),
                    },
                    '7 YEARS',
                  ),
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].tenYear_Ret.join('-'),
                    },
                    '10 YEARS',
                  ),
                  li(
                    {
                      dataattr: dataMapMoObj.data.sort[0].inception_Ret.join('-'),
                    },
                    'SINCE INCEPTION',
                  ),
                ),
              ),
            ),
          ),
          div(
            {
              class: 'group-view-container',
            },
            div(
              {
                class: 'view-container',
              },
              div(
                {
                  class: 'squareby-container grid-view-active',
                  onclick: (event) => {
                    event.currentTarget.classList.add('grid-view-active');
                    event.currentTarget
                      .closest('.view-container')
                      .querySelector('.listby-container')
                      .classList.remove('list-view-active');
                    event.currentTarget
                      .closest('.right-container')
                      .querySelector('.list-view-header').style.display = 'none';
                    viewFunction(block);
                  },
                },
                block.querySelector('.block-item3 .block-subitem-finelsub3'),
              ),
              div(
                {
                  class: 'listby-container',
                  onclick: (event) => {
                    event.currentTarget.classList.add('list-view-active');
                    event.currentTarget
                      .closest('.view-container')
                      .querySelector('.squareby-container')
                      .classList.remove('grid-view-active');
                    event.currentTarget
                      .closest('.right-container')
                      .querySelector('.list-view-header').style.display = 'block';
                    viewFunction(block);
                  },
                },
                block.querySelector('.block-item3 .block-subitem-finelsub4'),
              ),
            ),
            div(
              {
                class: 'togglebtn',
              },
              p({ class: 'toggle-text' }, 'Direct'),
              div(
                {
                  class: 'fund-toggle-wrap',
                },
                input({
                  type: 'checkbox',
                  id: 'toggle',
                  'aria-label': 'Switch between Direct and Regular mode',
                  onclick: () => {
                    viewFunction(block);
                  },
                }),
                label({
                  class: 'fund-toggle',
                  for: 'toggle',
                }),
              ),
              p({ class: 'toggle-text' }, 'Regular'),
            ),
            div(
              {
                class: 'compare-btn',
              },
              button('Compare'),
            ),
          ),
        ),
        div(
          {
            class: 'applied-filter-wrap',
          },
          ul(
            {
              class: 'applied-filter-list',
            },
            li(
              {
                class: 'applied-filter-name',
              },
              span('Large Cap'),
              img({
                class: 'filter-cross-icon',
                src: '../../icons/cross-icon.svg',
                alt: 'cross icon',
              }),
            ),
            li(
              {
                class: 'applied-filter-name',
              },
              span('Tax saver (ELSS)'),
              img({
                src: '../../icons/cross-icon.svg',
                alt: 'cross icon',
              }),
            ),
            li(
              {
                class: 'applied-filter-name',
              },
              span('Hybrid & Balanced'),
              img({
                src: '../../icons/cross-icon.svg',
                alt: 'cross icon',
              }),
            ),
          ),
        ),
        div(
          {
            class: 'cards-container',
          },
          ...dataMapMoObj.funddata.map((el) => fundcardblock(el)),
        ),
        div(
          {
            class: 'list-view-header',
            style: 'display:none',
          },
          div(
            {
              class: 'list-header',
            },
            block.closest('.section').querySelector('.item2'),
          ),
          div({
            class: 'list-container',
          }),
        ),
      ),
    ),
  );
  block.innerHTML = '';
  block.append(divfund);
  block.querySelector('.applied-filter-list').innerHTML = '';
  // added wrapper
  const divmop = div(
    {
      class: 'indanequity-wrapper',
    },
    block.querySelector('.indaneqsub #index1'),
    div(
      { class: 'label-tooltip-wrap' },
      block.querySelector(".indaneqsub [for='index1']"),
      div(
        { class: 'tooltip-wrap' },
        img({ class: 'filter-info-icon', src: '../../icons/filter-info.svg', alt: 'Filter Info Icon' }),
        p(
          { class: 'tooltip-text' },
          'Shares of companies listed on Indian stock exchanges, representing ownership in businesses operating in India.',
        ),
      ),
    ),
  );
  const divinner = block.querySelector('.indaneqsub .innerindianequity');
  block.querySelector('.indaneqsub').innerHTML = '';
  block.querySelector('.indaneqsub').append(divmop, divinner);

  searchFunctionality(block);
  Array.from(block.querySelector('.return-container .radio-label-container').children).forEach((el) => {
    el.querySelector('input').addEventListener('click', (event) => {
      const dataattr = event.target.getAttribute('dataattr').split('-');
      const tempdata = dataCfObj.filter((elem) => dataattr.includes(elem.schcode));

      dataMapMoObj.tempMobReturn = [];
      dataMapMoObj.tempMobReturn = tempdata;
      dataMapMoObj.selectreturnstemp = event.target.nextSibling.textContent.toUpperCase();
      // viewFunction(block);
    });
  });
}

// function dataFilterfun(param) {
//   let dataMapObj = {};
//   dataMapObj["schemeName"] = [];
//   dataMapObj["fundCategory"] = [{
//       "indian-equity": []
//     },
//     {
//       "international-equity": []
//     },
//     {
//       "hybrid-&-balanced": []
//     },
//     {
//       "multi-asset": []
//     },
//     {
//       commodity: []
//     },
//     {
//       "debt-&-liquid": []
//     },
//     {
//       indianEquitySub: [{
//           "Indian Equity - Large and Mid Cap": []
//         },
//         {
//           "Indian Equity - Large Cap": []
//         },
//         {
//           "Indian Equity - Mid Cap": []
//         },
//         {
//           "Indian Equity - Small Cap": []
//         },
//         {
//           "Indian Equity - Sector": []
//         },
//         {
//           "Indian Equity - Factor": []
//         },
//         {
//           "Indian Equity - Tax Saver (ELSS)": []
//         },
//         {
//           "Indian Equity - Multi Cap": []
//         },
//       ],
//     },
//   ];
//   dataMapObj["fundType"] = [{
//     active: []
//   }, {
//     "index-funds": []
//   }, {
//     etf: []
//   }];
//   dataMapObj["sort"] = [{
//     ListDropdown: [{
//         text: "Popular",
//         value: "inception_Ret"
//       },
//       {
//         text: "1 Year Returns",
//         value: "oneYear_Ret"
//       },
//       {
//         text: "3 Year Returns",
//         value: "threeYear_Ret"
//       },
//       {
//         text: "5 Year Returns",
//         value: "fiveYear_Ret"
//       },
//       {
//         text: "7 Year Returns",
//         value: "sevenYear_Ret"
//       },
//       {
//         text: "10 Year Returns",
//         value: "tenYear_Ret"
//       },
//     ],
//     inception_Ret: [],
//     oneYear_Ret: [],
//     threeYear_Ret: [],
//     fiveYear_Ret: [],
//     sevenYear_Ret: [],
//     tenYear_Ret: [],
//   }, ];

//   for (const name of param) {
//     if (
//       [...name.fundsTaggingSection].includes('motilal-oswal:indian-equity-')
//     ) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element['indian-equity']) {
//           element['indian-equity'].push(name.schcode);
//         }
//       });
//     }
//     if (
//       [...name.fundsTaggingSection].includes('motilal-oswal:hybrid-&-balanced')
//     ) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element['hybrid-&-balanced']) {
//           element['hybrid-&-balanced'].push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:debt-&-liquid')) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element['debt-&-liquid']) {
//           element['debt-&-liquid'].push(name.schcode);
//         }
//       });
//     }
//     if (
//       [...name.fundsTaggingSection].includes(
//         'motilal-oswal:international-equity',
//       )
//     ) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element['international-equity']) {
//           element['international-equity'].push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:multi-asset')) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element['multi-asset']) {
//           element['multi-asset'].push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:commodity')) {
//       dataMapObj.fundCategory.forEach((element) => {
//         if (element.commodity) {
//           element.commodity.push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:index-funds')) {
//       dataMapObj.fundType.forEach((element) => {
//         if (element['index-funds']) {
//           element['index-funds'].push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:active')) {
//       dataMapObj.fundType.forEach((element) => {
//         if (element.active) {
//           element.active.push(name.schcode);
//         }
//       });
//     }
//     if ([...name.fundsTaggingSection].includes('motilal-oswal:etf')) {
//       dataMapObj.fundType.forEach((element) => {
//         if (element.etf) {
//           element.etf.push(name.schcode);
//         }
//       });
//     }
//     if (name.fundSubCategorisation) {
//       dataMapObj.fundCategory[dataMapObj.fundCategory.length - 1]
// .indianEquitySub.forEach((elementsub, index) => {
//         if (elementsub[name.fundSubCategorisation]) {
//           elementsub[name.fundSubCategorisation].push(name.schcode);
//         }
//       });
//     }
//     for (const element of name.returns) {
//       const key = Object.keys(element);
//       if (
//         [...key].includes('inception_Ret')
//         && !dataMapObj.sort[0].inception_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].inception_Ret.push(name.schcode);
//       }
//       if (
//         [...key].includes('oneYear_Ret')
//         && !dataMapObj.sort[0].oneYear_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].oneYear_Ret.push(name.schcode);
//       }
//       if (
//         [...key].includes('threeYear_Ret')
//         && !dataMapObj.sort[0].threeYear_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].threeYear_Ret.push(name.schcode);
//       }
//       if (
//         [...key].includes('fiveYear_Ret')
//         && !dataMapObj.sort[0].fiveYear_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].fiveYear_Ret.push(name.schcode);
//       }
//       if (
//         [...key].includes('sevenYear_Ret')
//         && !dataMapObj.sort[0].sevenYear_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].sevenYear_Ret.push(name.schcode);
//       }
//       if (
//         [...key].includes('tenYear_Ret')
//         && !dataMapObj.sort[0].tenYear_Ret.includes(name.schcode)
//       ) {
//         dataMapObj.sort[0].tenYear_Ret.push(name.schcode);
//       }
//     }
//     dataMapObj.schemeName.push({
//       schemeName: name.schDetail.schemeName,
//       schcode: name.schcode,
//     });
//   }
//   return dataMapObj;
// }

// function capitalizeEachWord(sentence) {
//   if (sentence.includes("etf")) {
//     return sentence.toUpperCase() + "'s";
//   }
//   return sentence.replace(/\b\w/g, function (char) {
//     return char.toUpperCase();
//   });
// }

// function viewFunction(param) {
//   param.querySelector(".list-container").innerHTML = ""
//   param.querySelector(".cards-container").innerHTML = ""
//   if (Array.from(param.querySelector(".listby-container").
// classList).includes("list-view-active")) {
//     dataMapMoObj["funddata"].forEach((el) => {
//       param.querySelector(".list-container").append(listviewblock(el));
//     })
//   } else {
//     dataMapMoObj["funddata"].forEach((el) => {
//       param.querySelector(".cards-container").append(fundcardblock(el));
//     })
//   }
//   searchFunctionality(param);
// }

// function checkfilter(block) {
//   let filterTag = []; //5-8-25
//   let tempData = [];
//   Array.from(block.querySelector(".filter-list-wrapper").children).forEach((el) => {
//     if (el.closest(".checkbox-label-container").querySelector(".innerindianequity")) {
//       el.closest(".checkbox-label-container").querySelectorAll
// (".innerindianequity input").forEach((elemsub) => {
//         if (elemsub.checked && !tempData.includes(elemsub.getAttribute('dataattr'))) {
//           filterTag.push(elemsub.nextElementSibling.textContent.trim()) //5-8-25
//           elemsub.getAttribute('dataattr').split("-").forEach((eldata) => {
//             if (!tempData.includes(eldata)) {
//               tempData.push(eldata)
//             }
//           })
//         }
//       })
//     }
//     if (el.querySelector("input").checked && el.querySelector("input")
// .getAttribute("id") !== "index1") {
//  filterTag.push(el.querySelector("input").nextElementSibling.
// textContent.replace(/\d+/g, '').replaceAll("()", "")) //5-8-25
//       el.querySelector("input").getAttribute('dataattr').split("-").forEach((eldata) => {
//         if (!tempData.includes(eldata)) {
//           tempData.push(eldata)
//         }
//       })
//     }
//   })
//   if (window.innerWidth > 786) {
//     dataMapMoObj["funddata"] = []
//     dataMapMoObj["funddata"] = dataCfObj.filter((el, index) => {
//       if (tempData.length > 0) {
//         if (tempData.includes(el.schcode)) {
//           return el
//         }
//       } else {
//         if (index < 9) {
//           return el
//         }
//       }
//     })
//   }

//   viewFunction(block)

//   filterGroup(filterTag);

//   function filterGroup(filterTag) {
//     block.querySelector(".applied-filter-list").innerHTML = "";
//     filterTag.forEach((elli, index) => {
//       block.querySelector(".applied-filter-list").
// innerHTML += '<li class="applied-filter-name"><span>'
//  + elli + '</span><img src="../../icons/cross-icon.svg" alt="cross icon"></li>';
//     })

//     //Add Filter Tag Logic
//     Array.from(block.querySelector(".applied-filter-list").children).forEach((el) => {
//       el.querySelector("img").addEventListener('click', (event) => {
//         // console.log(event.target.closest('.applied-filter-name').
// querySelector("span").textContent);
//         filterTag = [];
//         Array.from(block.querySelector(".applied-filter-list").children).forEach((el, index) => {
//           if (el.querySelector("span").textContent !== event.target.
// closest('.applied-filter-name').querySelector("span").textContent) {
//             filterTag.push(el.querySelector("span").textContent)
//           }
//         })
//         filterGroup(filterTag)
//         //unchecked logic
//         Array.from(block.querySelector(".filter-list-wrapper").children).forEach((el) => {
//           if (el.closest(".checkbox-label-container").querySelector(".innerindianequity")) {
//             el.closest(".checkbox-label-container")
// .querySelectorAll(".innerindianequity input").forEach((elemsub) => {
//               if (!filterTag.includes(elemsub.nextElementSibling.textContent.trim())) {
//                 elemsub.checked = false
//               }
//             })
//           }
//           if (el.querySelector("input").getAttribute("id").includes("index")
//  && !filterTag.includes(el.querySelector("input").nextElementSibling.textContent.
// replace(/\d+/g, '').replaceAll("()", ""))) {
//             el.querySelector("input").checked = false
//           } else if (el.querySelector("input").getAttribute("id").
// includes("fundtype") && !filterTag.includes(el.closest
// ('.checkbox-label-container').querySelector('label').textContent
// .replace(/\d+/g, '').replaceAll("()", ""))) {
//             el.querySelector("input").checked = false
//           }
//           checkfilter(block)
//         })
//       })
//     })
//   }
// }

// function applyFunction(block) {
//   dataMapMoObj["tempMobReturn"] = dataMapMoObj["tempMobReturn"]
//  === undefined ? [] : dataMapMoObj["tempMobReturn"];
//   dataMapMoObj["tempMobReturn"] = dataMapMoObj["tempMobReturn"].length
//  !== 0 ? dataMapMoObj["tempMobReturn"] : dataCfObj.slice(0, 9);
//   if (Array.from(block.querySelector(".filter-overlay").classList).includes("active")) {
//     dataMapMoObj["funddata"] = dataMapMoObj["tempMobReturn"];
//     dataMapMoObj["tempMobReturn"] = [];
//     block.querySelector(".filter-overlay").classList.remove("active")
//     checkfilter(block)
//   } else if (Array.from(block.querySelector(".sort-overlay").classList).includes("active")) {
//     dataMapMoObj["funddata"] = dataMapMoObj["tempMobReturn"];
//     dataMapMoObj["tempMobReturn"] = [];
//     block.querySelector(".sort-overlay").classList.remove("active")
//     dataMapMoObj["selectreturns"] = dataMapMoObj["selectreturnstemp"]
//     viewFunction(block)
//   }

// }

// function searchFunctionality(block) {

//   // 1. Cache all necessary DOM element references
//     const searchContainer = document.querySelector('.search-input');
//     const searchInput = searchContainer.querySelector('.search');
//     const listContainer = searchContainer.querySelector('.list-search');
//     // const listItems = searchContainer.querySelectorAll('.list-fund-name');
//     const cancelButton = searchContainer.querySelector('.cancel-search');
//     const FUND_DATA = dataMapMoObj["funddata"].map((fund) => fund.schDetail.schemeName);

//     const populateList = () => {
//         listContainer.innerHTML = ''; // Clear list before populating
//         FUND_DATA.forEach(fundName => {
//             const item = document.createElement('li');
//             item.className = 'list-fund-name';
//             item.textContent = fundName;
//             listContainer.appendChild(item);
//         });
//     };

//     // --- SCRIPT INITIALIZATION ---
//     populateList(); // Create the list on page load

//     // --- IMPORTANT: Select listItems AFTER they have been created ---
//     const listItems = searchContainer.querySelectorAll('.list-fund-name');
//     listItems.forEach(item => {
//         item.dataset.originalText = item.textContent;
//     });
//     // --- End of Initialization ---

//     const escapeRegExp = (str) => {
//         return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     };

//     // The filter function remains the same
//     const filterListItems = (searchTerm) => {
//         const term = searchTerm.trim();
//         const existingNoResultsMessage = listContainer.querySelector('.no-results-message');
//         if (existingNoResultsMessage) existingNoResultsMessage.remove();
//         listContainer.classList.remove('no-search-list');

//         if (!term) {
//             listItems.forEach(item => {
//                 item.innerHTML = item.dataset.originalText;
//                 item.style.display = 'list-item';
//             });
//             return;
//         }

//         const searchRegex = new RegExp(escapeRegExp(term), 'gi');
//         let matchesFound = false;

//         listItems.forEach(item => {
//             const originalText = item.dataset.originalText;
//             const match = originalText.match(searchRegex);
//             if (match) {
//                 matchesFound = true;
//                 const highlightedText = originalText.
// replace(searchRegex, (match) => `<strong>${match}</strong>`);
//                 item.innerHTML = highlightedText;
//                 item.style.display = 'list-item';
//             } else {
//                 item.style.display = 'none';
//             }
//         });

//         if (!matchesFound) {
//             listContainer.classList.add('no-search-list');
//             const messageItem = document.createElement('li');
//             messageItem.className = 'list-fund-name no-results-message';
//             messageItem.textContent = 'No results found';
//             listContainer.appendChild(messageItem);
//         }
//     };

//     searchInput.addEventListener('focus',
// searchContainer.classList.add('search-active'));//activateSearch);
//     searchContainer.classList.remove('search-active')
//     searchInput.addEventListener('input', (event) => {
//         filterListItems(event.target.value);
//         searchContainer.classList.add('search-active');
//         cancelButton.style.display = event.target.value.length > 0 ? 'block' : 'none';
//     });

//     listContainer.addEventListener('click', (event) => {
//         if (event.target.matches('.list-fund-name:not(.no-results-message)')) {
//             searchInput.value = event.target.dataset.originalText;
//             searchContainer.classList.remove('search-active')
//              // CARD HIDE LOGIC ON SEARCH
//             const cardsContainer = block.querySelector(".filter-cards .cards-container");
//             if (cardsContainer && cardsContainer.checkVisibility()) {
//               Array.from(cardsContainer.children).forEach((elment) => {
//                 let schname = elment.querySelector(".title-subtitle p")
// .textContent +elment.querySelector(".title-subtitle h2").textContent
//                 elment.style.display = "block";
//                 if (searchInput.value !== schname) {
//                   elment.style.display = "none";
//                 }
//               });
//             }

//             const listHeader = block.querySelector(".filter-cards .list-container");
//             if (listHeader && listHeader.checkVisibility()) {
//               Array.from(listHeader.children).forEach((elment) => {
//                 let schname = elment.querySelector(".fund-name-container").textContent;
//                 elment.style.display = "block";
//                 if (searchInput.value !== schname) {
//                   elment.style.display = "none";
//                 }
//               });
//             }
//         }
//     });

//     cancelButton.addEventListener('click', () => {
//         searchInput.value = '';
//         filterListItems('');
//         cancelButton.style.display = 'none';
//         searchContainer.classList.remove('search-active')
//     });

//     document.addEventListener('click', (event) => {
//         if (!searchContainer.contains(event.target)) {
//             searchContainer.classList.remove('search-active')
//             // searchInput.value = ""
//         }
//         document.querySelectorAll(".cagr-container").forEach((el)=>{
//           if (!el.contains(event.target)) {
//             el.querySelector(".dropdown-list").classList.remove("dropdown-active")
//           }
//         })
//         document.querySelectorAll(".card-category").forEach((el)=>{
//           if (!el.contains(event.target)) {
//             el.querySelector(".dropdown-list").classList.remove("dropdown-active")
//           }
//         })
//     });

//     if (searchInput.value.length === 0) {
//         cancelButton.style.display = 'none';
//     }
// }
