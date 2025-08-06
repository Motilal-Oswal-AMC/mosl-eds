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
    if ([...block.fundsTaggingSection].includes("NFO")) {
        let nfosvg = dataMapMoObj["icons-nfo"][block.risk.riskType.toLowerCase().replaceAll(" ","-")]+ ".svg"
        let listcontainer = div({class:"nfo-list-container list-view-container"},
            div({class:"list-wrapper"},
                div({class:"fund-name-wrapper", schcode :block.schcode},
                    div({class:"fund-inner-wrapper"},
                        div({class:"logo-container"},
                        img({class: "logoScheme",src: "../../icons/Group.svg",alt: "BrandLogo"})
                        ),
                        div({class:"fund-name-container"},
                            p("Motilal Oswal"),
                            label(block.schDetail.schemeName.replaceAll("Motilal Oswal",""))
                        ),
                        img({class: "logoScheme",src: "../../icons/direction-right.svg",alt: "Direction Right"})
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
                div({class: "star"},
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
                    img({class: "logoScheme",src: "../../icons/Group.svg",alt: "BrandLogo"})
                ),
                div({class:"fund-name-container"},
                    p("Motilal Oswal"),
                    label(block.schDetail.schemeName.replaceAll("Motilal Oswal",""))
                ),
                img({class: "logoScheme",src: "../../icons/direction-right.svg",alt: "Direction Right"})
            ),
            div({class:"cagr-return"},
                div({class:"cagr-value"},"24.02",span("%")),
                p(labelcagr)
            ),
            div({class:"risk-star-icon"},
                img({class: "riskfactor-icon",src: "../../icons/risk-icon/"+iconsvg,alt: "risk icon"}),
            ),
            div({class: "star"},
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