var $=(function() {
	var idToElMap={};

	return function(id) {
		if ("string"!==typeof id) return null;

		if ("undefined"!==typeof idToElMap[id]) return idToElMap[id];

		idToElMap[id]=document.getElementById(id);
		return idToElMap[id];
	};
})();

var options={
	init: function() {
		this.setDefaults();
		this.internationalize();
		this.attachEvents();
		this.populateForm();
	},

	attachEvents: function() {
		var formEl=$('options');
		if (!formEl) return;

		formEl.onsubmit=this.handleSubmit;
	},

	handleSubmit: function() {
		var elementIds=[],
			el=null,
			i=null;

		elementIds=[
			'sortOrderLastUsedRadio',
			'sortOrderBestMatchRadio',
			'sortOrderMostChangedRadio',
			'sortOrderBiggestImageRadio'
		];

		for (i=3; i>=0; --i) {
			el=$(elementIds[i]);
			if (!el) continue;

			if (el.checked) {
				localStorage["sortOrder"]=el.value;
				break;
			}
		}

		elementIds=[
			'openSearchesBackgroundRadio',
			'openSearchesForegroundRadio',
			'openSearchesCurrentRadio'
		];

		for (i=2; i>=0; --i) {
			el=$(elementIds[i]);
			if (!el) continue;

			if (el.checked) {
				localStorage["tabVisibility"]=el.value;
				break;
			}
		}

		_gaq.push(['_trackEvent', 'Updated_Preferences', sortOrder, tabVisibility]);
	},

	internationalize: function() {
		var elementIds=[
			'optionsTitle',
			'optionsHeader',
			'sortOrderLabel',
			'sortOrderLastUsedLabel',
			'sortOrderBestMatchLabel',
			'sortOrderMostChangedLabel',
			'sortOrderBiggestImageLabel',
			'openSearchesLabel',
			'openSearchesBackgroundLabel',
			'openSearchesForegroundLabel',
			'openSearchesCurrentLabel'
		],
		numElementIds=elementIds.length,
		i=null,
		el=null,
		textDirection=chrome.i18n.getMessage("@@bidi_dir");

		for (i=numElementIds; i>=0; --i) {
			el=$(elementIds[i]);
			if (!el) continue;

			el.innerText=chrome.i18n.getMessage(elementIds[i]);
			el.dir=textDirection;
		}

		el=$("submitButton");
		if (el) {
			el.value=chrome.i18n.getMessage("submitButtonValue");
			el.dir=textDirection;
		}
	},

	populateForm: function() {
		var sortOrder=localStorage["sortOrder"],
			tabVisibility=localStorage["tabVisibility"],
			elementIds=[],
			el=null,
			i=null;

		elementIds=[
			'sortOrderLastUsedRadio',
			'sortOrderBestMatchRadio',
			'sortOrderMostChangedRadio',
			'sortOrderBiggestImageRadio'
		];

		for (i=3; i>=0; --i) {
			el=$(elementIds[i]);
			if (!el) continue;

			el.checked=el.value===sortOrder;
		}

		elementIds=[
			'openSearchesBackgroundRadio',
			'openSearchesForegroundRadio',
			'openSearchesCurrentRadio'
		];

		for (i=2; i>=0; --i) {
			el=$(elementIds[i]);
			if (!el) continue;

			el.checked=el.value===tabVisibility;
		}
	},

	setDefaults: function() {
		if ("undefined"===typeof localStorage["sortOrder"]) {
			localStorage["sortOrder"]="lastUsed";
		}

		if ("undefined"===typeof localStorage["tabVisibility"]) {
			localStorage["tabVisibility"]="background";
		}
	}
};
