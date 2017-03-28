// Hacker News Color Extension for Chrome by Martin "dalys" Lissmats 
// Adapted to Firefox by onli

var point_spans = document.querySelectorAll(".score");
var points_regex = /(\d+)(?:\spoints)/;

var intensity_steps = 5;
var max_points = 300;

var colors = {
	"0": "255,255,178",
	"1": "254,217,118",
	"2": "254,178,76",
	"3": "253,141,60",
	"4": "240,59,32",
	"5": "189,0,38"
}

for (var i = 0; i < point_spans.length; i++) {
    var span = point_spans[i];
    var points = 0;
    var id = null

    try {
        points = parseInt(points_regex.exec(span.innerHTML)[1],10);
        id = span.id.replace("score_", "");
    
        var tds = document.querySelector('#up_' + id).parentNode.parentNode.parentNode.querySelectorAll("td:nth-child(1),td:nth-child(2):not(.title)");
  
        var intensity = 0;

        if (points >= 1 && points < max_points) intensity = Math.floor(points/(max_points / (intensity_steps))) % intensity_steps;
        else if (points >= max_points) intensity = intensity_steps;
        for (var j = 0; j < tds.length; j++) {
            tds.item(j).style.background = "linear-gradient(to bottom, rgba(255,255,255,0) 82%,  rgba(" + colors[intensity] + ",1) 90%, rgba(" + colors[intensity] + ",1) 100%)";
        }
    } catch (e) {
        continue;
    }
}

self.port.on("get-prefs", function(prefs) {
	if (prefs[0]) {
		colorizeCommentsCounter();
	}
	self.port.on("prefchange", function(data) {
		if (data[0] == 'colorComments' && data[1]) {
			colorizeCommentsCounter();
		} else if (data[0] == 'colorComments' && data[1] == false) {
			var point_spans = document.querySelectorAll(".subtext > a:last-child");
			for (var i = 0; i < point_spans.length; i++) {
				point_spans[i].style.background = 'transparent';
			}
		}
	});
});

function colorizeCommentsCounter() {
	var point_spans = document.querySelectorAll(".subtext > a[href*='item?id=']");
	// [\s\u00A0] would be better than .*, but firefox does not match the regex then.
	var points_regex = /(\d+).*comments/;
	for (var i = 0; i < point_spans.length; i++) {
		var span = point_spans[i];
		var points = 0;
		var id = null

		try {
			points = parseInt(points_regex.exec(span.innerHTML)[1],10);
	  
			var intensity = 0;
			if (points >= 1 && points < max_points) {
				intensity = Math.floor(points/(max_points / (intensity_steps))) % intensity_steps;
			} else if (points >= max_points) {
				intensity = intensity_steps;
			}

			span.style.background = "linear-gradient(to bottom, rgba(255,255,255,0) 82%,  rgba(" + colors[intensity] + ",1) 90%, rgba(" + colors[intensity] + ",1) 100%)";
		} catch (e) {
			continue;
		}
	}
}