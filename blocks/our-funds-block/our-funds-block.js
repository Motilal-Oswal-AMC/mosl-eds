import dataCfObj from "../../scripts/dataCfObj.js"
import {div, input, label,span, ul} from "../../scripts/dom-helpers.js"
export default function decorate(block){
    console.log(block);
    console.log(dataCfObj);
    Array.from(block.children).forEach((el)=>{
        el.classList.add("block-item");
        Array.from(el.children).forEach((elsub,index)=>{
            elsub.classList.add("block-subitem"+(index+1));
            Array.from(elsub.children).forEach((finelsub,index)=>{
                finelsub.classList.add("block-subitem-finelsub"+(index+1));
            })
        })    
    })

    let divfund = div({class:"blockwrapper"},
        div({class:"fundcontainer"},
            block.querySelector(".block-subitem1"),
            div({class:"search-watch"},
                div({class:"search-input"},
                    input({
                        class:"search",
                        placeholder:block.querySelector(".block-subitem2 .block-subitem-finelsub1").textContent.trim(), 
                    })
                ),
                div({class:"watchlist"},
                    div({class:"staricon"},
                        block.querySelector(".block-subitem2 .block-subitem-finelsub2 span"),
                        block.querySelector(".block-subitem2 .block-subitem-finelsub3 span")
                    ),
                    div({class:"watchlisttext"},
                        span(block.querySelector(".block-subitem2 .block-subitem-finelsub3").textContent.trim())
                    )
                )
            )
        ),
        div({class:"trendingContainer"},
            // label(block.querySelector(".block-subitem2 .block-subitem-finelsub4").textContent.trim()),
            // ul()
        )
    )
    // block.innerHTML ="";
    // block.append(divfund)
}