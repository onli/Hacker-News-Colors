var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*.ycombinator.com",
  contentScriptFile: "./hn-colors.js",
  contentScriptWhen: "ready"
});