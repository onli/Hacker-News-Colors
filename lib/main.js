var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var prefSet = require("sdk/simple-prefs");

pageMod.PageMod({
  include: "*.ycombinator.com",
  contentScriptFile: "./hn-colors.js",
  contentScriptWhen: "ready",
  onAttach: function(worker) {
        // Persistent values
        var colorComments = prefSet.prefs.colorComments;

        worker.port.emit('get-prefs', [ colorComments ]); // sender1

        // Listen for changes
        function onPrefChange(prefName) {
            let payload = [prefName, prefSet.prefs[prefName]];
            worker.port.emit('prefchange', payload); // sender2
        }

        prefSet.on("colorComments", onPrefChange);
  }
});