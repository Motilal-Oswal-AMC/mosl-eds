/* eslint-disable */ 
import {button, div, span, p, img, label} from "../../scripts/dom-helpers.js"
import dataMapMoObj from '../../scripts/constant.js';
import {getTimeLeft,evaluateByDays} from "../../scripts/scripts.js"
export default function decorate(block){
    let planFlow = 'Direct';
    if (document.querySelector(".fund-toggle-wrap [type='checkbox']")) {
        planFlow =  document.querySelector(".fund-toggle-wrap [type='checkbox']").checked  ? 'Regular' : "Direct";    
    }
    let iconsvg = dataMapMoObj["icons-nfo"][block.risk.riskType.toLowerCase().replaceAll(" ","-")]+ ".svg"
    let labelcagr = evaluateByDays(block.dateOfAllotment)
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
    let returnYear = dataMapMoObj["selectreturns"] === "" ? tempReturns[0] : dataMapMoObj["selectreturns"];
    if ([...block.fundsTaggingSection].includes("NFO")) {
        let nfosvg = dataMapMoObj["icons-nfo"][block.risk.riskType.toLowerCase().replaceAll(" ","-")]+ ".svg"
        let listcontainer = div({class:"nfo-list-container list-view-container"},
            div({class:"list-wrapper"},
                div({class:"fund-name-wrapper", schcode :block.schcode},
                    div({class:"fund-inner-wrapper"},
                        div({class:"logo-container"},
                        img({class: "logoScheme",src: block.fundIcon,alt: "BrandLogo"})
                        ),
                        div({class:"fund-name-container"},
                            p("Motilal Oswal"),
                            label(block.schDetail.schemeName.replaceAll("Motilal Oswal",""))
                        ),
                        img({class: "logoScheme",src: "../../icons/nfo-righticon.svg",alt: "Direction Right"})
                    ),
                    div({ class: "timing-nfo-value" },
                        div(
                        { class: "nfo-container" },
                        span({ class: "label-nfo" }, "NFO")
                        ),
                        div({ class: "timing-container" }, p(getTimeLeft(block.dateOfAllotment)))
                    )
                ),
                div({class:"cagr-return"},
                    div({class:"cagr-value"},"N/A"),
                    p("CAGR")
                ),
                div({class:"risk-star-icon"},
                    img({class: "riskfactor-icon",src: "../../icons/nfo-risk-icon/"+nfosvg,alt: "risk icon"}),
                ),
                div({class: "star",
                    onclick: (event) => {
                        if (!Array.from(event.target.parentElement.classList).includes("star-filled")) {
                        event.target.parentElement.classList.add("star-filled");
                        } else {
                        event.target.parentElement.classList.remove("star-filled");
                        }
                    wishlist();
                    }
                },
                        img({class: "star-icon",src: "../../icons/not-filled-star.svg",alt: "star-icon"}),
                        img({class: "fillstar-icon",src: "../../icons/filled-star.svg",alt: "fillstar-icon"})
                ),
                div({class:"btn-invest"},
                    button("Invest")
                )
            )
        )
        return listcontainer 
    }
    let listcontainer = div({class:"list-view-container"},
        div({class:"list-wrapper"},
            div({class:"fund-name-wrapper", schcode :block.schcode},
                div({class:"logo-container"},
                    img({class: "logoScheme",src: block.fundIcon,alt: "BrandLogo"})
                ),
                div({class:"fund-name-container"},
                    p("Motilal Oswal"),
                    label(block.schDetail.schemeName.replaceAll("Motilal Oswal",""))
                ),
                img({class: "logoScheme",src: "../../icons/direction-right.svg",alt: "Direction Right"})
            ),
            div({class:"cagr-return"},
                div({class:"cagr-value"},`${block.returns[0][dataMapMoObj.ObjTemp[returnYear]]}`,span("%")),
                p(labelcagr)
            ),
            div({class:"risk-star-icon"},
                img({class: "riskfactor-icon",src: "../../icons/risk-icon/"+iconsvg,alt: "risk icon"}),
            ),
            div({class: "star",
                onclick: (event) => {
                        if (!Array.from(event.target.parentElement.classList).includes("star-filled")) {
                        event.target.parentElement.classList.add("star-filled");
                        } else {
                        event.target.parentElement.classList.remove("star-filled");
                        }
                    wishlist();
                    }
            },
                img({class: "star-icon",src: "../../icons/not-filled-star.svg",alt: "star-icon"}),
                img({class: "fillstar-icon",src: "../../icons/filled-star.svg",alt: "fillstar-icon"})
            ),
            div({class:"btn-invest"},
                button("Invest")
            )
        )
    )
    return listcontainer
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