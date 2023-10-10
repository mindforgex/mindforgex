const en=require("./en/common.json"),generateKey=(e,o="")=>{Object.keys(e).forEach((n=>{if("string"==typeof e[n]){const e=o?`${o}.${n}`:n;return void console.log(e)}const l=o?`${o}.${n}`:n;generateKey(e[n],l)}))},generateValue=(e,o="")=>{Object.keys(e).forEach((n=>{if("string"==typeof e[n]){let l="";return(o?`${o}.${n}`:n).split(".").forEach((o=>{l?"string"!=typeof l&&(l=l[o]):l=e[o]})),void console.log(l)}const l=o?`${o}.${n}`:n;generateValue(e[n],l)}))};console.log("=====================START KEY==============================="),generateKey(en),console.log("=====================END KEY==============================="),console.log("============================================================"),console.log("=====================START VALUE==============================="),generateValue(en),console.log("=====================END VALUE===============================");
// me=require("./en/messages.json")
// console.log("=====================START KEY MESSAGE==============================="),
// generateKey(me),console.log("=====================END KEY MESSAGE==============================="),
// console.log("============================================================"),
// console.log("=====================START VALUE MESSAGE==============================="),
// generateValue(me),
// console.log("=====================END VALUE MESSAGE===============================");
