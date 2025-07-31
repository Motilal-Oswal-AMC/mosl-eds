/* eslint-disable */
import dataCfObj from "../../scripts/dataCfObj.js";
import { div, input, label, span, p } from "../../scripts/dom-helpers.js";
import dataMapMoObj from "../../scripts/constant.js";
import fundcardblock from "../fund-card/fund-card.js";
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

  dataMapMoObj["data"] = dataFilterfun(dataCfObj);
  console.log(dataMapMoObj["data"]);

  // block.querySelector(".block-item2 span"); //filter
  // block.querySelector(".block-item3 block-subitem-finelsub1"); //filter

  let divfund = div(
    { class: "blockwrapper" },
    div(
      { class: "upper-container" },
      div(
        { class: "fundcontainer" },
        block.querySelector(".block-subitem1"),
        div(
          { class: "search-trending-wrapper" },
          div(
            { class: "search-input" },
            input({
              class: "search",
              placeholder: block
                .querySelector(".block-subitem2 .block-subitem-finelsub1")
                .textContent.trim(),
            })
          ),
          div(
            { class: "watchlist" },
            div(
              { class: "staricon" },
              block.querySelector(
                ".block-subitem2 .block-subitem-finelsub2 span"
              ),
              block.querySelector(
                ".block-subitem2 .block-subitem-finelsub3 span"
              )
            ),
            div(
              { class: "watchlisttext" },
              span(
                block
                  .querySelector(".block-subitem2 .block-subitem-finelsub3")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "trending-container" },
            div(
              { class: "trendinglabel" },
              p(
                block.querySelector(
                  ".block-subitem2 .block-subitem-finelsub4 span"
                )
              ),
              label(
                block
                  .querySelector(".block-subitem2 .block-subitem-finelsub5")
                  .textContent.trim()
              )
            ),
            div(
              { class: "trendingmostlist" },
              block.querySelector(".block-subitem2 .block-subitem-finelsub6")
            )
          )
        )
      )
    ),
    div(
      { class: "filter-cards" },
      div(
        { class: "left-container" },
        div(
          { class: "FundCategory-container" },
          div(
            { class: "filter-sort-container" },
            div(
              { class: "filter-wrapper" },
              block.querySelector(".block-item2 .block-subitem-finelsub1 span"),
              label(
                block
                  .querySelector(".block-item2 .block-subitem-finelsub2")
                  .textContent.trim()
              )
            ),
            div(
              { class: "sort-wrapper" },
              block.querySelector(".block-item2 .block-subitem-finelsub3 span"),
              label(
                block
                  .querySelector(".block-item2 .block-subitem-finelsub4")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "filter-container" },
            ...dataMapMoObj.data.fundCategory.map((element, index) => {
              if (
                capitalizeEachWord(Object.keys(element)[0].replaceAll("-", " ")) === "Indian Equity") {
                dataMapMoObj[index + "ArrayDoc"] = div(
                  {
                    class: "Indian-Equity-container",
                  },
                  ...dataMapMoObj.data.fundCategory[
                    dataMapMoObj.data.fundCategory.length - 1
                  ]["indianEquitySub"].map((elme, ind) => {
                    let sublabel = Object.keys(elme)[0].split("-")[1].trim();
                    return div(
                      { class: "checkbox-label-container" },
                      input({
                        class: "categorey-direct",
                        type: "checkbox",
                        id: "ind" + (ind + 1),
                      }),
                      label({ for: "ind" + (ind + 1) }, sublabel)
                    );
                  })
                );
              }
              return Object.keys(element)[0] !== "indianEquitySub"
                ? div(
                    { class: "checkbox-label-container" },
                    input({
                      class: "categorey-direct",
                      type: "checkbox",
                      id: "index" + (index + 1),
                    }),
                    label(
                      { for: "index" + (index + 1) },
                      capitalizeEachWord(
                        Object.keys(element)[0].replaceAll("-", " ")
                      ) +
                        "(" +
                        element[Object.keys(element)[0]].length +
                        ")"
                    ),
                    capitalizeEachWord(
                      Object.keys(element)[0].replaceAll("-", " ")
                    ) === "Indian Equity"
                      ? div(
                          {
                            class: "innerIndianEquity",
                          },
                          dataMapMoObj[index + "ArrayDoc"]
                        )
                      : ""
                  )
                : "";
            })
          )
        ),
        div(
          { class: "FundTye-container" },
          div(
            {
              class: "fund-container",
            },
            ...dataMapMoObj.data.fundType.map((element) => {
              return div(
                { class: "checkbox-label-container" },
                input({
                    class: "categorey-direct",
                    type: "checkbox",
                  }),
                label(
                  capitalizeEachWord(
                    Object.keys(element)[0].replaceAll("-", " ")
                  ) +
                    "(" +
                    element[Object.keys(element)[0]].length +
                    ")"
                )
              );
            })
          )
        )
      ),
      div(
        { class: "right-container" },
        div(
          { class: "sort-pop-container" },
          div(
            { class: "sort-popular" },
            div(
              { class: "sort-container" },
              label(
                block
                  .querySelector(".block-item3 .block-subitem-finelsub1")
                  .textContent.trim()
              )
            ),
            div(
              { class: "popular-container" },
              label(
                block
                  .querySelector(".block-item3 .block-subitem-finelsub2")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "group-view-container" },
            div({ class: "togglebtn" }, p("Direct"), p("Regular")),
            div(
              { class: "view-container" },
              div(
                { class: "squareby-container" },
                block.querySelector(".block-item3 .block-subitem-finelsub3")
              ),
              div(
                { class: "listby-container" },
                block.querySelector(".block-item3 .block-subitem-finelsub4")
              )
            )
          )
        ),
        div(
          { class: "cards-container" },
          ...dataCfObj.map((el) => {
            return fundcardblock(el);
          })
        )
      )
    )
  );
  block.innerHTML = "";
  block.append(divfund);
}

function dataFilterfun(param) {
  let dataMapObj = {};
  dataMapObj["schemeName"] = [];
  dataMapObj["fundCategory"] = [
    { "indian-equity": [] },
    { "international-equity": [] },
    { "hybrid-&-balanced": [] },
    { "multi-asset": [] },
    { commodity: [] },
    { "debt-&-liquid": [] },
    {
      indianEquitySub: [
        { "Indian Equity - Large and Mid Cap": [] },
        { "Indian Equity - Large Cap": [] },
        { "Indian Equity - Mid Cap": [] },
        { "Indian Equity - Small Cap": [] },
        { "Indian Equity - Sector": [] },
        { "Indian Equity - Factor": [] },
        { "Indian Equity - Tax Saver (ELSS)": [] },
        { "Indian Equity - Multi Cap": [] },
      ],
    },
  ];
  dataMapObj["fundType"] = [{ active: [] }, { "index-funds": [] }, { etf: [] }];
  dataMapObj["sort"] = [
    {
      ListDropdown: [
        { text: "Popular", value: "inception_Ret" },
        { text: "1 Year Returns", value: "oneYear_Ret" },
        { text: "3 Year Returns", value: "threeYear_Ret" },
        { text: "5 Year Returns", value: "fiveYear_Ret" },
        { text: "7 Year Returns", value: "sevenYear_Ret" },
        { text: "10 Year Returns", value: "tenYear_Ret" },
      ],
      inception_Ret: [],
      oneYear_Ret: [],
      threeYear_Ret: [],
      fiveYear_Ret: [],
      sevenYear_Ret: [],
      tenYear_Ret: [],
    },
  ];

  for (let name of param) {
    if (
      [...name.fundsTaggingSection].includes("motilal-oswal:indian-equity-")
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["indian-equity"]) {
          element["indian-equity"].push(name.schcode);
        }
      });
    }
    if (
      [...name.fundsTaggingSection].includes("motilal-oswal:hybrid-&-balanced")
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["hybrid-&-balanced"]) {
          element["hybrid-&-balanced"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:debt-&-liquid")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["debt-&-liquid"]) {
          element["debt-&-liquid"].push(name.schcode);
        }
      });
    }
    if (
      [...name.fundsTaggingSection].includes(
        "motilal-oswal:international-equity"
      )
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["international-equity"]) {
          element["international-equity"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:multi-asset")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["multi-asset"]) {
          element["multi-asset"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:commodity")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["commodity"]) {
          element["commodity"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:index-funds")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["index-funds"]) {
          element["index-funds"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:active")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["active"]) {
          element["active"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:etf")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["etf"]) {
          element["etf"].push(name.schcode);
        }
      });
    }
    if (name.fundSubCategorisation) {
      dataMapObj["fundCategory"][dataMapObj["fundCategory"].length - 1][
        "indianEquitySub"
      ].forEach((elementsub, index) => {
        if (elementsub[name.fundSubCategorisation]) {
          elementsub[name.fundSubCategorisation].push(name.schcode);
        }
      });
    }
    for (const element of name.returns) {
      let key = Object.keys(element);
      if (
        [...key].includes("inception_Ret") &&
        !dataMapObj["sort"][0]["inception_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["inception_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("oneYear_Ret") &&
        !dataMapObj["sort"][0]["oneYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["oneYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("threeYear_Ret") &&
        !dataMapObj["sort"][0]["threeYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["threeYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("fiveYear_Ret") &&
        !dataMapObj["sort"][0]["fiveYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["fiveYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("sevenYear_Ret") &&
        !dataMapObj["sort"][0]["sevenYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["sevenYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("tenYear_Ret") &&
        !dataMapObj["sort"][0]["tenYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["tenYear_Ret"].push(name.schcode);
      }
    }
    dataMapObj["schemeName"].push({
      schemeName: name.schDetail.schemeName,
      schcode: name.schcode,
    });
  }
  return dataMapObj;
}
function capitalizeEachWord(sentence) {
  if (sentence.includes("etf")) {
    return sentence.toUpperCase() + "'s";
  }
  return sentence.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
