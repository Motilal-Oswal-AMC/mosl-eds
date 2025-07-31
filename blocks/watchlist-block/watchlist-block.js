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
} from "../../scripts/dom-helpers.js";
import dataMapMoObj from "../../scripts/constant.js";
export default function decorate(block) {
  console.log(block);
  Array.from(block.children).forEach((child, ind) => {
    child.classList.add("watchlist-items" + (ind + 1));
    Array.from(child.children).forEach((subChild, ind) => {
      subChild.classList.add("watchlist-subitems" + (ind + 1));
      Array.from(subChild.children).forEach((innerChild, ind) => {
        innerChild.classList.add("watchlist-inneritems" + (ind + 1));
      });
    });
  });
  const cardContainer =
  div({class: 'card-wrapper'},
    div({class: 'card-left'},
      div({
          class: 'card-left-title'
        },
        img({
            class: "watchlist-logo",
            src: block.querySelector(".watchlist-items1 img").src,
            alt: "BrandLogo"
        }),
        div({class:'titlewrapper'},
            h2({class: 'card-title'}, 
                block.querySelector(".watchlist-items1 .watchlist-inneritems2").innerText),
            h2({class: 'card-title-1'},  
                block.querySelector(".watchlist-items1 .watchlist-inneritems3").innerText),
        )
      ),
      div({class: 'button-wrapper'},
        block.querySelector(".watchlist-items1 .watchlist-inneritems4")
      )
    ),
    div({class: 'card-right'},
        div({class: 'upper-right'},
            div({class:'fund-logo'},
                img({src: "../../icons/Group.svg", alt: "FundLogo"})
            ),
            div({class:'wishlist-icon'},
             block.querySelector(".watchlist-items2 .watchlist-inneritems2")   
            )
        ),
        div({class : 'lower-right'},
            div({class:'fund-name-card'},
            p(block.querySelector(".watchlist-items2 .watchlist-inneritems1").innerText),    
            div({class:'fund-name'},"Asset Allocation Passive Fund Conservative")
            )
        ),
        div({class:'fund-returns'},
            p("Annualised"),
            div({class:'returns'},"24.02",
                span({class:'returns-percentage'}, "%")
                
            )
        )
    )
  );
   block.innerHTML = "";
  block.appendChild(cardContainer);
}
