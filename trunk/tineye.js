function searchTineye(info, tab) {
	var tabVisibility=localStorage["tabVisibility"],
		sortOrder=localStorage["sortOrder"],
		url="http://www.tineye.com/search/?pluginver=chrome-1.0";

	switch (sortOrder) {
	case "bestMatch": url+="&sort=score&order=desc"; break;
	case "mostChanged": url+="&sort=score&order=asc"; break;
	case "biggest": url+="&sort=size&order=desc"; break;
	}

	url+="&url="+encodeURIComponent(info.srcUrl);

	if ("background"===tabVisibility || "foreground"===tabVisibility) {
		chrome.tabs.create({
			"selected": "foreground"===tabVisibility,
			"url": url
		});
	} else {
		chrome.tabs.update(tab.id, {
			"url": url
		});
	}

	_gaq.push(['_trackEvent', 'Search', sortOrder, info.srcUrl]);
}

var contextMenuId=chrome.contextMenus.create({
	"title": chrome.i18n.getMessage("contextMenuLabel"),
	"onclick": searchTineye,
	"contexts": ["image"]
});
