/* eslint-disable */
import Embed from "../embed/embed.js";
export default function decorate(block) {
  console.log(block);
  Embed(block.children[1].querySelector(".button-container"));
}
