/* eslint-disable */ 
import {button, div, span, p, img, label} from "../../scripts/dom-helpers.js"
import dataMapMoObj from '../../scripts/constant.js';
import {getTimeLeft,evaluateByDays,wishlist} from "../../scripts/scripts.js"
export default function decorate(block){
    let planFlow = 'Direct';
    if (document.querySelector(".fund-toggle-wrap [type='checkbox']")) {
        planFlow =  document.querySelector(".fund-toggle-wrap [type='checkbox']").checked  ? 'Regular' : "Direct";    
    }
    let iconsvg = dataMapMoObj["icons-nfo"][block.risk.riskType.toLowerCase().replaceAll(" ","-")]+ ".svg"
    let labelcagr = evaluateByDays(block.dateOfAllotment)
    let finPlangrp = [];
    const tempReturns = [];
    //initallize 
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
        return el;
        }
    });

    const cagrValve = block.returns.filter((el) => {
        if (DirectPlanlistArr.length !== 0 && DirectPlanlistArr[0].groupedCode === (el.plancode + el.optioncode)) {
            return el
        }
    })
    console.log(cagrValve);
    let cagrval = cagrValve.length !== 0 ? cagrValve[0].inception_Ret :'N/A'
    let stylecagrval = cagrval === 'N/A' ? 'none' :'flex'

    let starClass = dataMapMoObj.schstar.includes(block.schcode) ? "star-filled" : "";
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
                    p({class:'cagr-text'},"CAGR")
                ),
                div({class:"risk-star-icon"},
                    img({class: "riskfactor-icon",src: "../../icons/nfo-risk-icon/"+nfosvg,alt: "risk icon"}),
                ),
                div({class: "star "+starClass,
                    schcode:block.schcode,
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
                div({class:"cagr-value"},`${cagrval}`,span({style:"display:"+stylecagrval},"%")),
                
                p({class:'cagr-text'},labelcagr)
            ),
            div({class:"risk-star-icon"},
                img({class: "riskfactor-icon",src: "../../icons/risk-icon/"+iconsvg,alt: "risk icon"}),
            ),
            div({class: "star "+starClass,
                schcode:block.schcode,
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