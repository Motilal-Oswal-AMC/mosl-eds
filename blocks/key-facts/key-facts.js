/* eslint-disable */
import dataCfObj from '../../scripts/dataCfObj.js';
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

export default function decorate(block) {

  Array.from(block.children).forEach((el, index) => {
    el.classList.add("block-item" + (index + 1));
    Array.from(el.children).forEach((elsub, index) => {
      elsub.classList.add("block-subitem" + (index + 1));
      Array.from(elsub.children).forEach((finelsub, index) => {
        finelsub.classList.add("block-subitem-finelsub" + (index + 1));
      });
    });
  });

   let data =  dataCfObj.filter((element)=>{
        if(element.schcode === "US"){
            return element;
        }
    })
    console.log(data);

    // const date = data[0].aum[0].latestAumAsOnDt;


function dateFormat(date) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return formattedDate;
}







  const keyFactsSection = div(
    { class: "key-facts-section" },

    div({ class: "Investment-Objective" },
      p(block.querySelector(".block-subitem-finelsub1")),
      p({class : "investment-discripstion"},
        "The fund aims for medium to long-term capital appreciation by primarily investing in Large and Midcap stocks, though this objective... "
      )
    
    ),
    div(
      { class: "key-facts-amounts" },
      div(
        { class: "minimum-amount" },
        div(
          { class: "Application-Amount" },
          p(block.querySelector(".block-subitem-finelsub2")),
          p("₹500/- and in multiples of ₹1/- thereafter")
        ),
        div(
          { class: "Redemption-Amount" },
          p(block.querySelector(".block-subitem-finelsub3")),
          p("₹500/- then ₹1/- increments, up to account balance")
        )
      ),
      div(
        { class: "key-plans" },
        div(
          { class: "aum-benchmark" },
          div(
            { class: "aum-groups" },
            div(
              { class: "aum" },
              p(block.querySelector(".block-subitem-finelsub4")),
              p(`₹${data[0].aum[0].latestAum}`, span(`(as on ${dateFormat(data[0].aum[0].latestAumAsOnDt)})`))
            ),
            div(
              { class: "portfolio" },
              p(block.querySelector(".block-subitem-finelsub1")),
              p(data[0].portfolioTurnoverRatio)
            ),
            div({ class: "Plans" }, p(block.querySelector(".block-subitem2 .block-subitem-finelsub2")), p(data[0].planList[0].planName)),
            div(
              { class: "options" },
              p(block.querySelector(".block-subitem2 .block-subitem-finelsub3")),
              p(data[0].planList[0].optionName)
            )
          ),
          div(
            { class: "benchmark-groups" },
            div(
              { class: "Benchmark" },
              p(block.querySelector(".block-subitem2 .block-subitem-finelsub4")),
              p(data[0].benchmark)
            ),
            div(
              { class: "expense-ratio" },
              p(block.querySelector(".block-subitem3 .block-subitem-finelsub1")),
              p("Nil")// not found
            ),
            div({ class: "Inception-date" }, p(block.querySelector(".block-subitem3 .block-subitem-finelsub2")), p(data[0].benchmarkreturns[0].latNavDate)),
            div({ class: "entry-load" }, p(block.querySelector(".block-subitem3 .block-subitem-finelsub3")), p({class :"entry-load-detail"},"Nil"))
          )
        ),
        div(
          { class: "load-policy" },  // not found
          p(block.querySelector(".block-subitem3 .block-subitem-finelsub4")),
          div({class : "load-policy-list"},
          li("1% exit load applies if redeemed within 365 days of allotment."),
          li("No exit load applies if redeemed after 365 days."),
          li(
            "Exit load is applicable when switching between different MOMF Schemes."
          ),
          li(
            "No exit load for switching between options or plans within the same Scheme."
          )
        )
        )
      )
    )
  );
  // block.innerHTML = "";
  block.appendChild(keyFactsSection);

  block.querySelector(".investment-discripstion").innerHTML = "";
  block.querySelector(".investment-discripstion").innerHTML = data[0].investmentObjective;


  block.querySelector(".entry-load-detail").innerHTML = "";
  block.querySelector(".entry-load-detail").innerHTML = data[0].entryLoad;

}
