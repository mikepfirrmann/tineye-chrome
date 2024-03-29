/*
Copyright (c) 2010 Mike Pfirrmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var options={
	init: function() {
		this.setDefaults();
		this.internationalize();
		this.attachEvents();
		this.populateForm();
	},

	attachEvents: function() {
		var $=document.getElementById,
			formEl=$('options');
		if (!formEl) return;

		formEl.onsubmit=this.handleSubmit;
	},

	handleSubmit: function() {
		var elementIds=[],
			el=null,
			i=null,
			$=document.getElementById;

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
		textDirection=chrome.i18n.getMessage("@@bidi_dir"),
		$=document.getElementById;

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
			i=null,
			$=document.getElementById;

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
