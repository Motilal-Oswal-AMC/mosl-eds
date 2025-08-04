/* eslint-disable */
import {
  button,
  div,
  label,
  option,
  select,
  span,
  ul,
  li,
  h2,
  p,
  img,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
export default function decorate(block) {
  let planFlow = 'Direct';
  if (document.querySelector(".fund-toggle-wrap [type='checkbox']")) {
    planFlow =  document.querySelector(".fund-toggle-wrap [type='checkbox']").checked  ? 'Regular' : "Direct";    
  }
  console.log(planFlow);
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  let finPlangrp = [];
  const tempReturns = [];
  block.returns.forEach((ret, jind) => {
    if (jind === 0) {
      [...Object.keys(ret)].forEach((key)=>{
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      })
    }
    finPlangrp.push((ret.plancode + ret.optioncode));
  });

  const DirectPlanlistArr = block.planList.filter((el) => {
    if (el.planName === planFlow && finPlangrp.includes(el.groupedCode)) {
      return el
    }
  });
  let classplan = (DirectPlanlistArr.length !== 0 && tempReturns.length !== 0) ? "" : " not-provided"
  let classdropdown = DirectPlanlistArr.length !== 0 ? "flex" : "none";
  if ([...block.fundsTaggingSection].includes("NFO")) {
    const NfocardContainer = div(
      { class: "nfo-card-container" },
      div(
        { class: "card-wrapper" },
        div(
          { class: "card-upper-title" },
          div(
            { class: "title-headLogo" },
            div(
              { class: "title title-logo" },
              img({
                class: "logoScheme",
                src: "../../icons/Group.svg",
                alt: "BrandLogo",
              })
            ),
            div(
              {
                class: "star",
                onclick: (event) => {
                  if (
                    !Array.from(event.target.parentElement.classList).includes(
                      "star-filled"
                    )
                  ) {
                    event.target.parentElement.classList.add("star-filled");
                  } else {
                    event.target.parentElement.classList.remove("star-filled");
                  }
                },
                schcode: block.schcode,
              },
              img({
                class: "star-icon",
                src: "../../icons/star.svg",
                alt: "star-icon",
              }),
              img({
                class: "fillstar-icon",
                src: "../../icons/star-filled.svg",
                alt: "fillstar-icon",
              })
            )
          ),
          div(
            { class: "title-subtitle" },
            p("Motilal Oswal"),
            div(
              { class: "title title-logo" },
              h2(block.schDetail.schemeName.replaceAll("Motilal Oswal", ""))
            )
          )
        ),
        div(
          { class: "card-category" },
          div(
            { class: "fund-tagging" },
            ul(
              { class: "fundtagging-list" },
              ...fundsTaggingSection.map((eloption) =>
                li(
                  eloption
                    .replaceAll("motilal-oswal:", "")
                    .replaceAll("-", " ")
                    .toUpperCase()
                )
              )
            )
          ),
          div(
            { class: "planlist-dropdown", style: "display:" + classdropdown },
            select(
              {
                onchange: (event) => {
                  planListEvent(event, block);
                },
                "aria-label": "Select Investment Plan",
              },
              ...DirectPlanlistArr.map((el) =>
                option(
                  {
                    value: el.groupedCode,
                  },
                  el.optionName
                )
              )
            )
          ),
          div(
            { class: "dis-investor" },
            img({
              class: "riskfactor-icon",
              src: "../../icons/Risk-o-meter.svg",
              alt: "risk icon",
            })
          )
        ),
        div(
          { class: "banner-timing-container " },
          div(
            { class: "banner-container" },
            img({ src: "", alt: "banner Image" })
          ),
          div(
            { class: "timing-nfo-value" },
            div(
              { class: "nfo-container" },
              div({ class: "dot-container" }),
              div({ class: "label-nfo" }, "NFO")
            ),
            div(
              { class: "timing-container" },
              span("02 days 20 hrs 20 mins left")
            )
          )
        ),
        div(
          { class: "discription" },
          div(
            { class: "button-container" },
            button({ class: "know-more" }, "Know More"),
            button({ class: "invest-now" }, "Invest")
          )
        )
      )
    );
    return NfocardContainer;
  }
  const cardContainer = div({
      class: 'card-container'
    },
    div({
        class: 'card-wrapper'
      },
      div({
          class: 'card-upper-title'
        },
        div({
            class: "title-headLogo"
          },
          div({
              class: 'title title-logo'
            },
            img({
              class: "logoScheme",
              src: "../../icons/Group.svg",
              alt: "BrandLogo"
            })
          ),
          div({
              class: 'star',
              onclick: (event) => {
                if (!Array.from(event.target.parentElement.classList).includes('star-filled')) {
                  event.target.parentElement.classList.add('star-filled');
                } else {
                  event.target.parentElement.classList.remove('star-filled');
                }
                wishlist(block)
              },
              schcode: block.schcode
            },
            img({
              class: 'star-icon',
              src: '../../icons/star.svg',
              alt: "star-icon"
            }),
            img({
              class: 'fillstar-icon',
              src: '../../icons/star-filled.svg',
              alt: "fillstar-icon"
            }),
          ),
        ),
        div({
            class: "title-subtitle"
          },
          p("Motilal Oswal"),
          div({
              class: 'title title-logo'
            },
            h2(block.schDetail.schemeName.replaceAll("Motilal Oswal","")),
          ),
        )
      ),
      div({
          class: 'card-category'
        },
        div({
            class: 'fund-tagging'
          },
          ul({
              class: 'fundtagging-list'
            },
            ...fundsTaggingSection.map((eloption) => li(toTitleCase(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ')))),
          ),
        ),
        div({
            class: 'planlist-dropdown',
            style: "display:" + classdropdown
          },
          select({
              onchange: (event) => {
                // console.log(event.target.value);
                // console.log(event.target.closest('.card-wrapper').querySelector('.cagr-container .cagr-dropdown'));
                // console.log(block.returns, block.planList, block.schDetail.schemeName);
                planListEvent(event, block);
              },
              "aria-label": "Select Investment Plan"
            },
            ...DirectPlanlistArr.map((el) => option({
              value: el.groupedCode,
            }, el.optionName)),
          ),
        ),
      ),
      div({
          class: 'cagr-container ' + classplan
        },
        div({
            class: 'cagr-dropdown'
          },
          label('Annualised'),
          div({
              class: 'cagr-select-wrapper'
            },
            select({
                schemeCode: block.schcode,
                value: tempReturns[0],
                onchange: (event) => {
                  const cgarValue = block.returns[0][event.target.value];
                  event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
                  event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}`;
                  event.target.closest('.cagr-container').querySelector('.cagr-value h2').append(span("%"))
                },
              },
              ...tempReturns.map((eloption) => option({
                value: dataMapMoObj.ObjTemp[eloption],
              }, eloption)),
            ),
          ),
        ),
        div({
            class: 'cagr-value'
          },
          h2(`${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}`,
            span("%")
          ),
          p({
            class: 'scheme-yet',
            style: 'display:none'
          }, 'Scheme is yet to complete 10 Years'),
          p({
            class: 'cagr-date'
          }, '15th Mar 2020'),
        ),
        div({
            class: 'cagr-desc'
          },
          span('Return is not provided because thescheme has not completed 6 months'),
        ),
      ),
      div({
          class: 'risk-container',
          style:"display:none"
        },
        label('Risk Factor'),
        span(block.risk.riskType),
      ),
      div({
          class: 'discription'
        },
        p({
            class: 'dis-choosen'
          },
          // 'Chosen by ',
          div({
            class: 'dis-investor'
          }, 
          img({
            class:"icon person",
            src:"../../icons/Icon.svg"
          }),
          span('2.7 lakh investors')
          ),
          img({
            class:"riskfactor-icon",
            src:"../../icons/Risk-o-meter.svg",
            alt:"risk icon"
          })
        ),
      ),
      div({
          class: 'button-container'
        },
        button({
          class: 'know-more'
        }, 'Know More'),
        button({
          class: 'invest-now'
        }, 'Invest'),
      ),
    ),
  );
  return cardContainer;
}

function planListEvent(param, block) {
  const tempReturns = [];
  const codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push((el.plancode + el.optioncode));
    if (param.target.value === (el.plancode + el.optioncode)) {
      for (const key in el) {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      }
    }
  });
  param.target.closest('.card-wrapper').querySelector('.cagr-container').innerHTML = '';
  if (codeTempArr.includes(param.target.value) && tempReturns.length !== 0) {
    param.target.closest('.card-wrapper').querySelector('.cagr-container').classList.remove("not-provided");
    let dropdown = div({
        class: 'cagr-dropdown',
      },
      label('Annualised'),
      div({
          class: "cagr-select-wrapper"
        },
        select({
            schemeCode: block.schcode,
            value: tempReturns[0],
            onchange: (event) => {
              const cgarValue = block.returns[0][event.target.value];
              event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
              event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}`;
              event.target.closest('.cagr-container').querySelector('.cagr-value h2').append(span("%"))
            },
          },
          ...tempReturns.map((eloption) => option({
            value: dataMapMoObj.ObjTemp[eloption],
          }, eloption)),
        ),
      )
    )
    let dropvalue = div({
        class: 'cagr-value',
      },
      h2(`${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}`,
        span("%")
      ),
      p({
        class: 'scheme-yet',
        style: 'display:none',
      }, 'Scheme is yet to complete 10 Years'),
      p({
        class: 'cagr-date',
      }, '15th Mar 2020'),
    )
    let droplessthan = div({
        class: 'cagr-desc'
      },
      span('Return is not provided because thescheme has not completed 6 months'),
    )
    param.target.closest('.card-wrapper').querySelector('.cagr-container').append(dropdown, dropvalue, droplessthan);
  } else {
    param.target.closest('.card-wrapper').querySelector('.cagr-container').classList.remove("not-provided");
    let dropdown = div({
        class: 'cagr-dropdown',
      },
      label('Return (Absolute)'),
    )
    let dropvalue = div({
        class: 'cagr-value',
      },
      h2(`NA`)
    )
    let droplessthan = div({
        class: 'cagr-desc'
      },
      span('Return is not provided because thescheme has not completed 6 months'),
    )
    param.target.closest('.card-wrapper').querySelector('.cagr-container').append(dropdown, dropvalue, droplessthan);
  }
}

function wishlist(){
  let paramCount = document.querySelectorAll(".star-filled");
   document.querySelector(".watchlisttext span").textContent ="";
  if (paramCount.length < 10) {
    document.querySelector(".watchlisttext span").textContent ="My Watchlist " +"(0"+paramCount.length+")";
  }else{
    document.querySelector(".watchlisttext span").textContent ="My Watchlist " +"("+paramCount.length+")";
  }  
}
function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}