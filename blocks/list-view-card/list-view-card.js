import {button, div, span, p, img, label} from "../../scripts/dom-helpers.js"
export default function decorate(block){
    // if (block.querySelector(".fund-toggle-wrap [type='checkbox']")) {
    //     let planFlow =  block.querySelector(".fund-toggle-wrap [type='checkbox']").checked  ? 'Regular' : "Direct"
    //     console.log(planFlow);   
    // }
    // console.log(block);
    let listcontainer = div({class:"list-view-container"},
        div({class:"list-wrapper"},
            div({class:"fund-name-wrapper"},
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
                p("CAGR")
            ),
            div({class:"risk-star-icon"},
                img({class: "riskfactor-icon",src: "../../icons/Risk-o-meter.svg",alt: "risk icon"}),
                div({class: "star"},
                    img({class: "star-icon",src: "../../icons/star.svg",alt: "star-icon"}),
                    img({class: "fillstar-icon",src: "../../icons/star-filled.svg",alt: "fillstar-icon"})
                )
            ),
            div({class:"btn-invest"},
                button("Invest")
            )
        )
    )
    return listcontainer
}