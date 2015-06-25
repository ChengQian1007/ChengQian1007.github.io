/*========================================== 

	Projekt: Evaluation
	Datei: Evaluation.js
	Verfasser: Cheng Qian
	Datum: 02.02.2015

===========================================*/

/*==========================================
	Allgemeine Methoden
===========================================*/

function addCookie(name, value, expiresDays) {
	var cookieString = name + "=" + escape(value);
	if (expiresDays > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
		cookieString = cookieString + '\; expires=' + date.toGMTString();
	}
	document.cookie = cookieString;
}

function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split('\; ');
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name) return unescape(arr[1]);
	}
	return "";
}

function deleteCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + '=v\; expires=' + date.toGMTString();
} 

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]); return null;
}

function checkURIInput() {
	if (arguments.length == 0) {
		return false;
	}
	else {
		for (var i in arguments) {
			if (arguments[i] == '' || arguments[i] == null) {
				return false;
			}
		}
	}
	return true;
}

function getMinZahl() {
	if (arguments.length == 0) {
		return false;
	}
	else {
		var tmpMin = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i] < tmpMin) {
				tmpMin = arguments[i];
			}
		}
		return tmpMin;
	}
}

function getMaxZahl() {
	if (arguments.length == 0) {
		return false;
	}
	else {
		var tmpMax = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i] > tmpMax) {
				tmpMax = arguments[i];
			}
		}
		return tmpMax;
	}
}

function obj2str(o) {
	var r = [];
	if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	if (typeof o == "object") {
		if (!o.sort) {
			for (var i in o)
				r.push(i + ":" + obj2str(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}"
		} else {
			for (var i = 0; i < o.length; i++)
				r.push(obj2str(o[i]))
			r = "[" + r.join() + "]"
		}
		return r;
	}
	return o.toString();
}

function checkFileExist(URL) {
	try{
		var xmlDoc;
		var xmlhttp;

		if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if (document.implementation && document.implementation.createDocument) {
			xmlhttp = new window.XMLHttpRequest();
		}

		xmlhttp.open("GET", URL, false);
		xmlhttp.send();

		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) return true;
			else if (xmlhttp.status == 404) return false;
			else return false;
		}
	}
	catch (e) {
		return false;
	}
}

function getSprache() {
	var lang = '';

	if (navigator.appName == 'Netscape') {
		lang = navigator.language;
	}
	else {
		lang = navigator.userLanguage;
	}

	var mainlang = lang.substr(0, 2);

	return mainlang;
}

var seiteSprache = 'EN';

seiteSprache = getSprache();

if (getCookie('userSprache') != '') {
	seiteSprache = getCookie('userSprache');
}

if (getQueryString('Sprache') != '' && getQueryString('Sprache') != null) {
	seiteSprache = getQueryString('Sprache');
}

if (checkFileExist('JS/language/Sprache_' + seiteSprache.toUpperCase() + '.js') == true) {
	document.write('<script type="text/javascript" src="JS/language/Sprache_' + seiteSprache.toUpperCase() + '.js" ><' + '/script>');
}
else{
	document.write('<script type="text/javascript" src="JS/language/Sprache_EN.js" ><' + '/script>');
}

String.prototype.fillArgs = function () {
	var formated = this;
	for (var i = 0; i < arguments.length; i++) {
		var param = '{%' + i + '%}';
		formated = formated.replace(new RegExp(param, 'g'), arguments[i])
	}
	return formated;
}

String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
	return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
	return this.replace(/(\s*$)/g, "");
}

function changeSprache2(neuSprache) {
	addCookie('userSprache', neuSprache, 90);
	location.reload(true);
}

function SToL(str1, str2) {
	if (str1 < str2) {
		return -1;
	} else if (str1 > str2) {
		return 1;
	} else {
		return 0;
	}
}

function LToS(str1, str2) {
	if (str1 < str2) {
		return 1;
	} else if (str1 > str2) {
		return -1;
	} else {
		return 0;
	}
}

function focusMeRichtig(obj) {
	var FFstart = 0;
	var FFend = obj.value.length;
	if (window.ActiveXObject) {
		var t = obj.createTextRange();
		t.move("character", FFstart), t.moveEnd("character", FFend), t.select();
	}
	else if (document.implementation && document.implementation.createDocument) {
		obj.setSelectionRange(FFstart, FFend);
	}
}

function showInfoBox(infoType, alertContent) {
	document.getElementById('divAlertContent').innerHTML = alertContent;
	document.getElementById('divAlertWrapper').className = 'divAlertWrapper-' + infoType;
	document.getElementById('divAlertContent').className = 'divAlertContent-' + infoType;
	$('#divAlertWrapper').fadeIn(200);
	setTimeout("$('#divAlertWrapper').fadeOut(700)", 1500);
}

function returnJetzt() {
	var d = new Date();

	var str = monthname[d.getMonth()] + ' ' + d.getFullYear();

	return str;
}

function clearSelect(selectid) {
	var obj = document.getElementById(selectid);
	obj.length = 0;
}

function newSelectOption(selectid, oVaule, oText) {
	var obj = document.getElementById(selectid);
	var oOption = document.createElement("OPTION");
	obj.options.add(oOption);
	oOption.innerText = oText;
	oOption.value = oVaule;
}

function setLoadingWraper(imgSrc, text) {
	try {
		var tmpIMG = document.getElementById('divLoadingWrapper').children[1].children[0].children[0];

		tmpIMG.width = 24;
		tmpIMG.heigth = 24;
		tmpIMG.src = imgSrc;

		document.getElementById('divLoadingWrapper').children[1].children[1].innerHTML = "&nbsp;&nbsp;&nbsp;" + text;
	} catch (e) { }
}

function setLWNV() { // set Loading Wraper "Nicht Verfügbar"
	setLoadingWraper('image/stop.jpg', EJS_JS_Str32);
}

/*==========================================
	SP onQueryFailed
===========================================*/

function onQueryFailed(sender, args) {
	alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}



/*==========================================
	Struktureinheit
	AlleStrukturFlat
	AlleStrukturBaum
	StrukturForStat
===========================================*/

var Struktureinheit = function (id, sno, sName, sVater, sLayer) {
	this.id = id;
	this.sno = sno;
	this.sName = sName;
	this.sVater = sVater;
	this.sLayer = sLayer;
	this.sSoehne = new Array();

}

Struktureinheit.prototype.erstellen = function (callback) {
	this.altId = this.id;

	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var itemCreateInfo = new SP.ListItemCreationInformation();
		oListItem = oList.addItem(itemCreateInfo);

		oListItem.set_item('sno', me.sno);
		oListItem.set_item('sName', me.sName);
		oListItem.set_item('sVater', typeof (me.sVater) == "number" ? me.sVater : me.sVater.id);
		oListItem.set_item('sLayer', me.sLayer);

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.id = oListItem.get_id();

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

Struktureinheit.prototype.aendern = function (neuSno, neuSName, neuSVater, myStruktur, myAendernSEArray, callback) {
	var me = this;

	var tmpOListItemArray = new Array();
	var diff = 0;
	var vaterGeaendert;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var oListItem = oList.getItemById(me.id);

		oListItem.set_item('sno', neuSno);
		oListItem.set_item('sName', neuSName);

		vaterGeaendert = ((typeof (neuSVater) == "number" ? myStruktur.getSEById(neuSVater) : neuSVater).id != (typeof (me.sVater) == "number" ? me.sVater : me.sVater.id));

		if (vaterGeaendert) {
			diff = (typeof (neuSVater) == "number" ? myStruktur.getSEById(neuSVater) : neuSVater).sLayer + 1 - me.sLayer;

			oListItem.set_item('sVater', typeof (neuSVater) == "number" ? neuSVater : neuSVater.id);
			oListItem.set_item('sLayer', me.sLayer + diff);
		}

		oListItem.update();

		clientContext.load(oListItem);

		tmpOListItemArray.push(oListItem);
		myAendernSEArray.push(me);

		var tmpSE = me;
		var tmpAlleSoehneIdArray = new Array();

		var tmpArray = new Array();
		tmpArray.push(tmpSE);

		do {
			var tmpArrayNeu = new Array();

			for (var i = 0; i < tmpArray.length; i++) {
				for (var j = 0; j < tmpArray[i].sSoehne.length; j++) {
					tmpAlleSoehneIdArray.push(tmpArray[i].sSoehne[j].id);
					tmpArrayNeu.push(tmpArray[i].sSoehne[j]);
				}
			}

			tmpArray = tmpArrayNeu;

		} while (tmpArray.length > 0);

		for (var i = myStruktur.SEArray.length - 1; i >= 0; i--) {
			if ($.inArray(myStruktur.SEArray[i].id, tmpAlleSoehneIdArray) != -1) {
				if (vaterGeaendert) {
					var oListItem2 = oList.getItemById(myStruktur.SEArray[i].id);

					oListItem2.set_item('sLayer', myStruktur.SEArray[i].sLayer + diff);

					oListItem2.update();

					clientContext.load(oListItem2);

					tmpOListItemArray.push(oListItem2);
				}
				
				myAendernSEArray.push(myStruktur.SEArray[i]);
			}
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.sno = neuSno;
		me.sName = neuSName;

		if (vaterGeaendert) {
			for (var i = 0; i < me.sVater.sSoehne.length; i++) {
				if (me.sVater.sSoehne[i].id == me.id) {
					me.sVater.sSoehne.splice(i, 1);
					break;
				}
			}

			me.sVater = typeof (neuSVater) == "number" ? myStruktur.getSEById(neuSVater) : neuSVater;
			me.sVater.sSoehne.push(me);
		}

		for (var i = 0; i < myAendernSEArray.length; i++) {
			myAendernSEArray[i].sLayer += diff;
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

Struktureinheit.prototype.loeschen = function (callback) {
	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		oListItem = oList.getItemById(me.id);

		oListItem.deleteObject();

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

Struktureinheit.prototype.ladeBySno = function (callback) {
	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'sno\'/><Value Type=\'Text\'>' + me.sno + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, sno, sName, sVater, sLayer)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str1);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.id = oListItem.get_id();
				me.sName = oListItem.get_item('sName');
				me.sVater = new Struktureinheit(oListItem.get_item('sVater').get_lookupId(), oListItem.get_item('sVater').get_lookupValue());
				me.sLayer = oListItem.get_item('sLayer');
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}

	ladeMe();
}



var AlleStrukturFlat = function (callback) {
	this.SEArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Gt><FieldRef Name=\'sLayer\'/><Value Type=\'Number\'>0</Value></Gt></Where><OrderBy><FieldRef Name="sno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, sno, sName, sVater, sLayer)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str2);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.SEArray.push(new Struktureinheit(oListItem.get_id(), oListItem.get_item('sno'), oListItem.get_item('sName'), new Struktureinheit(oListItem.get_item('sVater').get_lookupId(), oListItem.get_item('sVater').get_lookupValue()), oListItem.get_item('sLayer')));
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}


	ladeMe();
}

var AlleStrukturBaum = function (topSEName, callback) { // IAMFESTO kann auch drin!
	this.SEArray = new Array();

	var me = this;
	var tmpSEArray = new Array();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="sno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, sno, sName, sVater, sLayer)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str3);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				tmpSEArray.push(new Struktureinheit(oListItem.get_id(), oListItem.get_item('sno'), oListItem.get_item('sName'), new Struktureinheit(oListItem.get_item('sVater').get_lookupId(), oListItem.get_item('sVater').get_lookupValue()), oListItem.get_item('sLayer')));
			}

			reOrganise();
		}
	}

	function reOrganise() {
		for (var i = 0; i < tmpSEArray.length; i++) {
			tmpSEArray[i].verschoben = false;

			if (tmpSEArray[i].sno == topSEName) {
				me.SEArray.push(tmpSEArray[i]);
				tmpSEArray[i].verschoben = true;
			}

			for (var j = 0; j < tmpSEArray.length; j++) {
				if (tmpSEArray[i].sVater.id == tmpSEArray[j].id) {
					tmpSEArray[i].sVater = tmpSEArray[j];
					if (tmpSEArray[i].id != tmpSEArray[j].id) {
						tmpSEArray[j].sSoehne.push(tmpSEArray[i]);
					}
					break;
				}
			}
		}

		filterStruktur();
	}

	function filterStruktur() {
		var tmpSEStrArray = new Array();
		tmpSEStrArray.push(topSEName);

		var nochMehr = false;

		do {
			nochMehr = false;

			for (var i = 0; i < tmpSEArray.length; i++) {
				if (tmpSEArray[i].verschoben == false && $.inArray(tmpSEArray[i].sVater.sno, tmpSEStrArray) != -1) {
					me.SEArray.push(tmpSEArray[i]);
					tmpSEStrArray.push(tmpSEArray[i].sno);
					tmpSEArray[i].verschoben = true;
					nochMehr = true;
				}
			}
		} while (nochMehr);

		me.SEArray.sort(function (x, y) { return x.sno.localeCompare(y.sno); });

		if (me.SEArray.length == 0) {
			alert(EJS_JS_Str4);
			return false;
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

AlleStrukturBaum.prototype.getSE = function (idOrName) {
	var me = this;
	var tmpStr = (typeof (idOrName) === 'number') ? 'id' : 'sno';

	for (var i = 0; i < me.SEArray.length; i++) {
		if (idOrName == me.SEArray[i][tmpStr]) {
			return me.SEArray[i];
		}
	}
}

AlleStrukturBaum.prototype.getSEById = function (tmpId) { // 可以和getSE合并
	var me = this;

	for (var i = 0; i < me.SEArray.length; i++) {
		if (tmpId == me.SEArray[i].id) {
			return me.SEArray[i];
		}
	}
}

AlleStrukturBaum.prototype.getLZ = function (tmpInput) {
	var tmpInputSE = null;
	var tmpOutputSE = null;

	if (typeof (tmpInput) === 'object') {
		tmpInputSE = tmpInput; // 前提是该对象中的SE
	}
	else {
		tmpInputSE = this.getSE(tmpInput);

		if (tmpInputSE == undefined) {
			console.error('No Department with the name or id: ' + tmpInput);
			return false;
		}
	}

	if (tmpInputSE.sLayer < 2) {
		return false;
	}
	else {
		tmpOutputSE = tmpInputSE;

		do{
			if (tmpOutputSE.sLayer == 2) {
				break;
			}

			tmpOutputSE = tmpOutputSE.sVater;
		} while (true);

		return tmpOutputSE;
	}
}

var StrukturForStat = function (topSEName, IStat, callback) {
	this.SEArray = new Array();
	this.SEInStr = '';

	var me = this;
	var tmpSEArray = new Array();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Struktureinheit');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="sno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, sno, sName, sVater, sLayer)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str5);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				tmpSEArray.push(new Struktureinheit(oListItem.get_id(), oListItem.get_item('sno'), oListItem.get_item('sName'), new Struktureinheit(oListItem.get_item('sVater').get_lookupId(), oListItem.get_item('sVater').get_lookupValue()), oListItem.get_item('sLayer')));
			}

			reOrganise();
		}
	}

	function reOrganise() {
		for (var i = 0; i < tmpSEArray.length; i++) {
			tmpSEArray[i].verschoben = false;

			if (tmpSEArray[i].sno == topSEName) {
				me.SEArray.push(tmpSEArray[i]);
				tmpSEArray[i].verschoben = true;
			}

			for (var j = 0; j < tmpSEArray.length; j++) {
				if (tmpSEArray[i].sVater.id == tmpSEArray[j].id) {
					tmpSEArray[i].sVater = tmpSEArray[j];
					if (tmpSEArray[i].id != tmpSEArray[j].id) {
						tmpSEArray[j].sSoehne.push(tmpSEArray[i]);
					}
					break;
				}
			}
		}

		filterStruktur();
	}

	function filterStruktur() {
		var tmpSEStrArray = new Array();
		tmpSEStrArray.push(topSEName);

		var nochMehr = false;

		do {
			nochMehr = false;

			for (var i = 0; i < tmpSEArray.length; i++) {
				if (tmpSEArray[i].verschoben == false && $.inArray(tmpSEArray[i].sVater.sno, tmpSEStrArray) != -1) {
					me.SEArray.push(tmpSEArray[i]);
					tmpSEStrArray.push(tmpSEArray[i].sno);
					tmpSEArray[i].verschoben = true;
					nochMehr = true;
				}
			}
		} while (nochMehr);

		me.SEArray.sort(function (x, y) { return x.sno.localeCompare(y.sno); });

		me.SEInStr = '<Values>';
		
		for (var i = 0; i < me.SEArray.length; i++) {
			me.SEInStr += '<Value Type=\'Text\'>' + me.SEArray[i].sno + '</Value>';
			
			me.SEArray[i].sStat = eval(IStat);
		}

		me.SEInStr += '</Values>';

		if (me.SEArray.length == 0) {
			alert(EJS_JS_Str6);
			return false;
		}
		
		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

StrukturForStat.prototype.getSEById = function (tmpId) {
	var me = this;

	for (var i = 0; i < me.SEArray.length; i++) {
		if (tmpId == me.SEArray[i].id) {
			return me.SEArray[i];
		}
	}
}

/*==========================================
	EinPillar
	Pillar
===========================================*/

var EinPillar = function (id, pName) {
	this.id = id;
	this.pName = pName;
}

EinPillar.prototype.ladeById = function (callback) {
	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Pillar');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Text\'>' + me.id + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, pName)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str7);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.pName =  oListItem.get_item('pName');
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}

	ladeMe();
}

var Pillar = function (callback) {
	this.PillarArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Pillar');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID"></FieldRef></OrderBy></Query><RowLimit>50</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, pName)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str8);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.PillarArray.push(new EinPillar(oListItem.get_id(), oListItem.get_item('pName')));
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}







	ladeMe();
}

Pillar.prototype.getPillar = function (idOrName) {
	var tmpStr = (typeof (idOrName) === 'number') ? 'id' : 'pName';

	for (var i in this.PillarArray) {
		if (this.PillarArray[i][tmpStr] == idOrName) {
			return this.PillarArray[i];
		}
	}
}



/*==========================================
	EinKriterium
	Kriterien
===========================================*/

var EinKriterium = function (id, kName, kFType, kGewicht) {
	this.id = id;
	this.kName = kName;
	this.kFType = kFType;
	this.kGewicht = kGewicht;
}

var Kriterien = function (callback) {
	this.KriterienArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Kriterien');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID"></FieldRef></OrderBy></Query><RowLimit>50</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, kName, kFType, kGewicht)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str9);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.KriterienArray.push(new EinKriterium(oListItem.get_id(), oListItem.get_item('kName'), oListItem.get_item('kFType'), oListItem.get_item('kGewicht')));
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}







	ladeMe();
}

Kriterien.prototype.getKriterium = function (idOrName) {
	var tmpStr = (typeof (idOrName) === 'number') ? 'id' : 'kName';

	for (var i in this.KriterienArray) {
		if (this.KriterienArray[i][tmpStr] == idOrName) {
			return this.KriterienArray[i];
		}
	}
}

Kriterien.prototype.speichernGewicht = function (callback) {
	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Kriterien');

		var oListItem;

		for (var i = 0; i < me.KriterienArray.length; i++) {
			oListItem = oList.getItemById(me.KriterienArray[i].id);

			oListItem.set_item('kGewicht', me.KriterienArray[i].kGewicht);

			oListItem.update();

			clientContext.load(oListItem);
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}



/*==========================================
	EineRGS
	RGS
===========================================*/

var EineRGS = function (id, rgsno, rgsBsb) {
	this.id = id;
	this.rgsno = rgsno;
	this.rgsBsb = rgsBsb;
}

var RGS = function (callback) {
	this.RGSArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('RGS');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="rgsno"></FieldRef></OrderBy></Query><RowLimit>10</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, rgsno, rgsBsb)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str10);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.RGSArray.push(new EineRGS(oListItem.get_id(), oListItem.get_item('rgsno'), oListItem.get_item('rgsBsb')));
			}

			if (typeof (callback) === "function") {
				callback();
			}
		}
	}







	ladeMe();
}

RGS.prototype.getRGSById = function (_id) {
	for (var i in this.RGSArray) {
		if (this.RGSArray[i].id == _id) {
			return this.RGSArray[i];
		}
	}
}

RGS.prototype.getRGSByNo = function (_no) {
	for (var i in this.RGSArray) {
		if (this.RGSArray[i].rgsno == _no) {
			return this.RGSArray[i];
		}
	}
}

RGS.prototype.getRGSIdByNo = function (_no) {
	for (var i in this.RGSArray) {
		if (this.RGSArray[i].rgsno == _no) {
			return this.RGSArray[i].id;
		}
	}
}



/*==========================================
	EineRolle
	Rolle
===========================================*/

var EineRolle = function (id, rKurz, rName, rBsb, rLayer) {
	this.id = id;
	this.rKurz = rKurz;
	this.rName = rName;
	this.rBsb = rBsb;
	this.rLayer = rLayer;
}

EineRolle.prototype.erstellen = function (callback) {
	this.altId = this.id;

	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Rolle');

		var itemCreateInfo = new SP.ListItemCreationInformation();
		oListItem = oList.addItem(itemCreateInfo);

		oListItem.set_item('rKurz', me.rKurz);
		oListItem.set_item('rName', me.rName);
		oListItem.set_item('rBsb', me.rBsb);
		oListItem.set_item('rLayer', parseInt(me.rLayer));

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.id = oListItem.get_id();

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineRolle.prototype.aendern = function (neuRKurz, neuRName, neuRBsb, neuRLayer, callback) {
	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Rolle');

		oListItem = oList.getItemById(me.id);

		oListItem.set_item('rKurz', neuRKurz);
		oListItem.set_item('rName', neuRName);
		oListItem.set_item('rBsb', neuRBsb);
		oListItem.set_item('rLayer', parseInt(neuRLayer));

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.rKurz = neuRKurz;
		me.rName = neuRName;
		me.rBsb = neuRBsb;
		me.rLayer = parseInt(neuRLayer);

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineRolle.prototype.loeschen = function (callback) {
	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Rolle');

		oListItem = oList.getItemById(me.id);

		oListItem.deleteObject();

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineRolle.prototype.kopie = function () {
	var tmpNeuRolle = new EineRolle(this.id, this.rKurz, this.rName, this.rBsb, this.rLayer);
	return tmpNeuRolle;
}

var Rolle = function (callback) {
	this.RolleArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Rolle');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="rKurz"></FieldRef></OrderBy></Query><RowLimit>500</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, rKurz, rName, rBsb, rLayer)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str11);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.RolleArray.push(new EineRolle(oListItem.get_id(), oListItem.get_item('rKurz'), oListItem.get_item('rName'), oListItem.get_item('rBsb') == null ? '' : oListItem.get_item('rBsb'), oListItem.get_item('rLayer')));
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

Rolle.prototype.getRolle = function (idOrName) {
	var tmpStr = (typeof (idOrName) === 'number') ? 'id' : 'rKurz';

	for (var i in this.RolleArray) {
		if (this.RolleArray[i][tmpStr] == idOrName) {
			return this.RolleArray[i];
		}
	}
}



/*==========================================
	EineFrage
	FrageAnt
	FAInFB
	Fragebogen
	FBFuerWL
	FBFuerPL
	FragePool
	FPUKommentar
	FBAuswertung
===========================================*/

var EineFrage = function (id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder, fRolle) {
	this.id = id;
	this.fno = fno;
	this.fPillar = fPillar;
	this.fKriterien = fKriterien;
	this.fRGS = fRGS;
	this.fJahr = fJahr;
	this.fFrage = fFrage;
	this.fStichwort = fStichwort;
	this.fNachweis = fNachweis;
	this.fSoll = fSoll;
	this.fGewicht = fGewicht;
	this.fOrder = fOrder;
	this.fRolle = fRolle;

}

EineFrage.prototype.erstellen = function (callback) {
	this.altId = this.id;

	var me = this;
	var oListItem;
	var rolleArray = new Array();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var itemCreateInfo = new SP.ListItemCreationInformation();
		oListItem = oList.addItem(itemCreateInfo);

		oListItem.set_item('fno', me.fno);
		oListItem.set_item('fPillar', me.fPillar.id);
		oListItem.set_item('fKriterien', me.fKriterien.id);
		oListItem.set_item('fRGS', me.fRGS.id);
		oListItem.set_item('fJahr', me.fJahr);
		oListItem.set_item('fFrage', me.fFrage);
		oListItem.set_item('fStichwort', me.fStichwort);
		oListItem.set_item('fNachweis', me.fNachweis);
		oListItem.set_item('fSoll', me.fSoll);
		oListItem.set_item('fGewicht', me.fGewicht);
		oListItem.set_item('fOrder', me.fOrder);

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.id = oListItem.get_id();

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		for (var i = 0; i < me.fRolle.length; i++) {
			var itemCreateInfo = new SP.ListItemCreationInformation();
			var oListItem2 = oList.addItem(itemCreateInfo);

			oListItem2.set_item('fawFno', me.id);
			oListItem2.set_item('fawRolle', me.fRolle[i].id);

			oListItem2.update();

			clientContext.load(oListItem2);

			rolleArray.push(oListItem2);
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep3), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep3(sender, args) {
		for (var i = 0; i < rolleArray.length; i++) {
			for (var j = 0; j < me.fRolle.length; j++) {
				if (rolleArray[i].get_item('fawRolle').get_lookupId() == me.fRolle[j].id) {
					me.fRolle[j].FAWId = rolleArray[i].get_id();
					break;
				}
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineFrage.prototype.aendern = function (neuFKriterien, neuFRGS, neuFFrage, neuFStichwort, neuFNachweis, neuFSoll, neuFRolle, callback) {
	this.obKriterienGeaendert = (neuFKriterien.id != this.fKriterien.id);

	var me = this;

	var oListItem;
	var rolleArray = new Array();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		oListItem = oList.getItemById(me.id);

		oListItem.set_item('fKriterien', neuFKriterien.id);
		oListItem.set_item('fRGS', neuFRGS.id);
		oListItem.set_item('fFrage', neuFFrage);
		oListItem.set_item('fStichwort', neuFStichwort);
		oListItem.set_item('fNachweis', neuFNachweis);
		oListItem.set_item('fSoll', neuFSoll);

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.fKriterien = neuFKriterien;
		me.fRGS = neuFRGS;
		me.fFrage = neuFFrage;
		me.fStichwort = neuFStichwort;
		me.fNachweis = neuFNachweis;
		me.fSoll = neuFSoll;

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var tmpAltRolle = me.fRolle.slice(0);

		for (var i = 0; i < neuFRolle.length; i++) {
			var obDrin = false;

			for (var j = 0; j < tmpAltRolle.length; j++) {
				if (neuFRolle[i].id == tmpAltRolle[j].id) {
					neuFRolle[i] = tmpAltRolle[j];
					tmpAltRolle.splice(j, 1);
					obDrin = true;
					break;
				}
			}

			if (obDrin == false) {
				var itemCreateInfo = new SP.ListItemCreationInformation();
				var oListItem2 = oList.addItem(itemCreateInfo);

				oListItem2.set_item('fawFno', me.id);
				oListItem2.set_item('fawRolle', neuFRolle[i].id);

				oListItem2.update();

				clientContext.load(oListItem2);

				rolleArray.push(oListItem2);
			}
		}

		for (var i = 0; i < tmpAltRolle.length; i++) {
			var oListItem3 = oList.getItemById(tmpAltRolle[i].FAWId);

			oListItem3.deleteObject();
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep3), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep3(sender, args) {
		me.fRolle = neuFRolle;

		for (var i = 0; i < rolleArray.length; i++) {
			for (var j = 0; j < me.fRolle.length; j++) {
				if (rolleArray[i].get_item('fawRolle').get_lookupId() == me.fRolle[j].id) {
					me.fRolle[j].FAWId = rolleArray[i].get_id();
					break;
				}
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineFrage.prototype.loeschen = function (callback) {
	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		oListItem = oList.getItemById(me.id);

		oListItem.deleteObject();

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineFrage.prototype.ladeById = function (callback) {
	var me = this;

	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		oListItem = oList.getItemById(me.id);

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		me.fno = oListItem.get_item('fno');
		me.fPillar = new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue());
		me.fKriterien = new EinKriterium(oListItem.get_item('fKriterien').get_lookupId(), oListItem.get_item('fKriterien').get_lookupValue());
		me.fRGS = new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue()));
		me.fJahr = oListItem.get_item('fJahr');
		me.fFrage = oListItem.get_item('fFrage');
		me.fStichwort = oListItem.get_item('fStichwort') == null ? '' : oListItem.get_item('fStichwort');
		me.fNachweis = oListItem.get_item('fNachweis') == null ? '' : oListItem.get_item('fNachweis');
		me.fSoll = oListItem.get_item('fSoll') == null ? '' : oListItem.get_item('fSoll');
		me.fGewicht = oListItem.get_item('fGewicht');
		me.fOrder = oListItem.get_item('fOrder');
		me.fRolle = new Array();

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'fawFno\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + me.id + '</Value></Eq></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>100</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep3), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep3(sender, args) {
		if (collListItem2.get_count() == 0) {
			console.log("Es gibt keine Rolle zu diesen Fragen!");
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.fRolle.push(new EineRolle(oListItem.get_item('fawRolle').get_lookupId(), oListItem.get_item('fawRolle').get_lookupValue()));
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FrageAnt = function (id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar) { // fgSno ist eine Struktureinheit Objekt
	this.id = id;
	this.fgno = fgno;
	this.fgFno = fgFno;
	this.fgSno = fgSno;
	this.fgPunkt = fgPunkt;
	this.fgIst = fgIst;
	this.fgKommentar = fgKommentar;
}

FrageAnt.prototype.kopie = function () {
	return (new FrageAnt(this.id, this.fgno, this.fgFno, this.fgSno, this.fgPunkt, this.fgIst, this.fgKommentar));
}

var FAInFB = function (EF, FA, geaendert) { // FrageAntwort Paar In Fragebogen
	this.EF = EF;
	this.FA = FA;
	this.FAArray = new Array();
	this.geaendert = geaendert;
}

FAInFB.prototype.AvgFAPunkt = function () {
	var tmpSumme = 0;
	var tmpZaehler = 0;

	for (var i = 0; i < this.FAArray.length; i++) {
		if (this.FAArray[i].fgPunkt >= 0) {
			tmpSumme += getMinZahl(this.FAArray[i].fgPunkt, 3);
			tmpZaehler++;
		}
	}

	return tmpSumme / tmpZaehler;
}

var Fragebogen = function (fJahr, fPillarId, isErgebnisKPI, fRGS, fgSno, allRolle, IKriterien, callback) {
	this.FragebogenArray = new Array();

	var me = this;
	var allFrageStr = '';
	var allWLFrageStr = '';
	var allNichtWLFrageStr = '';

	var obNichtWLFrageGibt = false;
	var obWLFrageGibt = false;

	var thisSnoUndVatersArr = new Array();
	var thisSUVStr = '';

	var tmpFGno = (new Date()).getTime();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var camlQuery = new SP.CamlQuery();

		if (isErgebnisKPI == false) { 
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		else{
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		
		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str12);
			setLWNV();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			allFrageStr = '<Values>';

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpEineFrage = new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array());
				tmpEineFrage.editierbar = false;
				tmpEineFrage.obWL = false;

				me.FragebogenArray.push(new FAInFB(tmpEineFrage, new FrageAnt(null, tmpFGno, oListItem.get_item('fno'), fgSno, 0, '', ''), 1));
				allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
				tmpFGno++;
			}

			allFrageStr += '</Values>';

			ladeMeStep3();
		}
	}

	function ladeMeStep3() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep4(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str13);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
						var tmpFBEFRolle = allRolle.getRolle(oListItem.get_item('fawRolle').get_lookupId());

						me.FragebogenArray[i].EF.fRolle.push(tmpFBEFRolle);
						break;
					}
				}
			}

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				for (var j = 0; j < me.FragebogenArray[i].EF.fRolle.length; j++) {
					if (me.FragebogenArray[i].EF.fRolle[j].rLayer >= 0) {
						me.FragebogenArray[i].EF.obWL = true;
					}
					else {
						me.FragebogenArray[i].EF.editierbar = true;
					}
				}
			}

			allWLFrageStr = '<Values>';
			allNichtWLFrageStr = '<Values>';

			for (var i = me.FragebogenArray.length - 1; i >= 0 ; i--) {
				if (me.FragebogenArray[i].EF.obWL == true) {
					allWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
					obWLFrageGibt = true;
					me.FragebogenArray[i].geaendert = 0;
				}
				else {
					obNichtWLFrageGibt = true;
					allNichtWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
				}
			}

			allWLFrageStr += '</Values>';
			allNichtWLFrageStr += '</Values>';

			var tmpSno = fgSno;

			thisSUVStr = '<Values>';

			do {
				thisSnoUndVatersArr.push(tmpSno);
				thisSUVStr += '<Value Type=\'Integer\'>' + tmpSno.id + '</Value>';

				tmpSno = tmpSno.sVater;

				if (tmpSno.sno == 'IAMFESTO') {
					break;
				}
			} while (true);

			thisSUVStr += '</Values>';

			ladeMeStep5();
		}
	}

	function ladeMeStep5() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		if (obNichtWLFrageGibt) {
			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'fgSno\'/><Value Type=\'Text\'>' + fgSno.sno + '</Value></Eq><In><FieldRef Name=\'fgFno\' />' + allNichtWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

			this.collListItem2 = oList.getItems(camlQuery);

			clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');
		}

		if (obWLFrageGibt) {
			var camlQuery2 = new SP.CamlQuery();
			camlQuery2.set_viewXml('<View><Query><Where><And><In><FieldRef Name=\'fgSno\' LookupId=\'True\' />' + thisSUVStr + '</In><In><FieldRef Name=\'fgFno\' />' + allWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno" /><FieldRef Name="fgSno" Ascending="False" /></OrderBy></Query><RowLimit>2000</RowLimit></View>');

			this.collListItem3 = oList.getItems(camlQuery2);

			clientContext.load(collListItem3, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');
		}

		if (obNichtWLFrageGibt || obWLFrageGibt) {
			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep6), Function.createDelegate(this, onQueryFailed));
		}
		else {
			ladeMeStep6();
		}
	}

	function ladeMeStep6(sender, args) {
		if (obNichtWLFrageGibt) {
			if (collListItem2.get_count() == 0) {
				// alert(EJS_JS_Str14);
			}
			else {
				var listItemEnumerator = collListItem2.getEnumerator();

				while (listItemEnumerator.moveNext()) {
					var oListItem = listItemEnumerator.get_current();

					for (var i in me.FragebogenArray) {
						if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
							me.FragebogenArray[i].FA = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), fgSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));
							me.FragebogenArray[i].geaendert = 0;
							break;
						}
					}
				}
			}
		}

		if (obWLFrageGibt) {
			if (collListItem3.get_count() == 0) {
				// alert(EJS_JS_Str15);
			}
			else {
				var listItemEnumerator = collListItem3.getEnumerator();

				while (listItemEnumerator.moveNext()) {
					var oListItem = listItemEnumerator.get_current();

					for (var i in me.FragebogenArray) {
						if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
							var tmpSno;

							for (var j = 0; j < thisSnoUndVatersArr.length; j++) {
								if (thisSnoUndVatersArr[j].sno == oListItem.get_item('fgSno').get_lookupValue()) {
									tmpSno = thisSnoUndVatersArr[j];
									break;
								}
							}

							var tmpFA2 = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), tmpSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));

							if (me.FragebogenArray[i].EF.obWL == true && me.FragebogenArray[i].EF.editierbar == false) {
								if (me.FragebogenArray[i].FA.id == null || me.FragebogenArray[i].FA.fgSno.sLayer < tmpSno.sLayer) {
									if (me.FragebogenArray[i].FA.id != null) {
										me.FragebogenArray[i].FAArray.push(me.FragebogenArray[i].FA);
									}
									me.FragebogenArray[i].FA = tmpFA2;
									me.FragebogenArray[i].geaendert = 0;
								}
								else {
									me.FragebogenArray[i].FAArray.push(tmpFA2);
								}
							}
							else {
								if (me.FragebogenArray[i].FA.fgSno.sno == tmpSno.sno) {
									me.FragebogenArray[i].FA = tmpFA2;
									me.FragebogenArray[i].geaendert = 0;
								}
								else {
									me.FragebogenArray[i].FAArray.push(tmpFA2);
								}
							}

							break;
						}
					}
				}
			}
		}

		for (var i = 0; i < me.FragebogenArray.length; i++) {
			if (me.FragebogenArray[i].FAArray.length > 0 && me.FragebogenArray[i].FA.id == null) {
				var tmpLowestLayerPunktObj = { layer: -1, punkt: NaN };

				for (var j = 0; j < me.FragebogenArray[i].FAArray.length; j++) {
					if (me.FragebogenArray[i].FAArray[j].fgSno.sLayer > tmpLowestLayerPunktObj.layer) {
						tmpLowestLayerPunktObj.layer = me.FragebogenArray[i].FAArray[j].fgSno.sLayer;
						tmpLowestLayerPunktObj.punkt = me.FragebogenArray[i].FAArray[j].fgPunkt;
					}
				}

				// 之前是当问题没有被回答的时候 并且父部门将问题Ausblenden的时候 也进行Ausblenden。现在只要问题没有回答 就继承父部门的Punkt,并主动保存。
				//if (tmpLowestLayerPunktObj.layer != -1 && tmpLowestLayerPunktObj.punkt == -1) {
				//    me.FragebogenArray[i].FA.fgPunkt = -1;
				//    me.FragebogenArray[i].geaendert = 0;
				//}

				if (tmpLowestLayerPunktObj.layer != -1) {
					me.FragebogenArray[i].FA.fgPunkt = tmpLowestLayerPunktObj.punkt;
					me.FragebogenArray[i].geaendert = 1;
				}
			}

			me.FragebogenArray[i].FAArray.push(me.FragebogenArray[i].FA);

			//下面是Vererben后将父部门的FrageAnt转化为该部门的FA的代码 但是现在不需要
			//if (me.FragebogenArray[i].FA.fgSno.sno != fgSno.sno) {
			//	me.FragebogenArray[i].FA.fgSno = fgSno;
			//	me.FragebogenArray[i].FA.id = null;
			//	me.FragebogenArray[i].FA.fgno = tmpFGno;
			//	tmpFGno++;
			//	// me.FragebogenArray[i].geaendert = 1;
			//}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FBEKPI = function (fJahr, fPillarId, isErgebnisKPI, fRGS, fgSno, fRolleId, IKriterien, callback) {
	this.FragebogenArray = new Array();

	var me = this;
	var allFrageStr = '';

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var camlQuery = new SP.CamlQuery();

		if (isErgebnisKPI == false) {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		else {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str16);
			setLWNV();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			var tmpFGno = (new Date()).getTime();

			allFrageStr = '<Values>';

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.FragebogenArray.push(new FAInFB(new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array()), new FrageAnt(null, tmpFGno, oListItem.get_item('fno'), fgSno, 0, '', ''), 1));
				allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
				tmpFGno++;
			}

			allFrageStr += '</Values>';

			ladeMeStep3();
		}
	}

	function ladeMeStep3() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep4(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str17);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
						me.FragebogenArray[i].EF.fRolle.push(new EineRolle(oListItem.get_item('fawRolle').get_lookupId(), oListItem.get_item('fawRolle').get_lookupValue()));
						break;
					}
				}
			}

			ladeMeStep5();
		}
	}

	function ladeMeStep5() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'fgSno\'/><Value Type=\'Text\'>' + fgSno.sno + '</Value></Eq><In><FieldRef Name=\'fgFno\' />' + allFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep6), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep6(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str18);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
						me.FragebogenArray[i].FA = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), fgSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));
						me.FragebogenArray[i].geaendert = 0;
						break;
					}
				}
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}


var FBFuerWL = function (fJahr, fPillarId, isErgebnisKPI, fRGS, fgSno, fRolleKurz, IKriterien, callback) {
	this.FragebogenArray = new Array();

	var me = this;
	var allFrageStr = '';
	var allWLFrageStr = '';

	var obWLFrageGibt = false;

	var thisSnoUndVatersArr = new Array();
	var thisSUVStr = '';

	var tmpFGno = (new Date()).getTime();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var camlQuery = new SP.CamlQuery();

		if (isErgebnisKPI == false) {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		else {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str19);
			setLWNV();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			allFrageStr = '<Values>';

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpEineFrage = new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array());
				tmpEineFrage.editierbar = false;
				tmpEineFrage.obWL = false;

				me.FragebogenArray.push(new FAInFB(tmpEineFrage, new FrageAnt(null, tmpFGno, oListItem.get_item('fno'), fgSno, 0, '', ''), 1));
				allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
				tmpFGno++;
			}

			allFrageStr += '</Values>';

			ladeMeStep3();
		}
	}

	function ladeMeStep3() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep4(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str20);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
						me.FragebogenArray[i].EF.fRolle.push(new EineRolle(oListItem.get_item('fawRolle').get_lookupId(), oListItem.get_item('fawRolle').get_lookupValue()));
						break;
					}
				}
			}

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				for (var j = 0; j < me.FragebogenArray[i].EF.fRolle.length; j++) {
					if (me.FragebogenArray[i].EF.fRolle[j].rKurz == fRolleKurz) {
						me.FragebogenArray[i].EF.obWL = true;
						me.FragebogenArray[i].EF.editierbar = true;
						break;
					}
				}
			}

			allWLFrageStr = '<Values>';

			for (var i = me.FragebogenArray.length - 1; i >= 0 ; i--) {
				if (me.FragebogenArray[i].EF.obWL == true) {
					allWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
					obWLFrageGibt = true;
				}
				else {
					me.FragebogenArray.splice(i, 1);
				}
			}

			allWLFrageStr += '</Values>';

			var tmpSno = fgSno;

			thisSUVStr = '<Values>';

			do {
				thisSnoUndVatersArr.push(tmpSno);
				thisSUVStr += '<Value Type=\'Integer\'>' + tmpSno.id + '</Value>';

				tmpSno = tmpSno.sVater;

				if (tmpSno.sno == 'IAMFESTO') {
					break;
				}
			} while (true);

			thisSUVStr += '</Values>';

			ladeMeStep5();
		}
	}

	function ladeMeStep5() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		if (obWLFrageGibt) {
			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml('<View><Query><Where><And><In><FieldRef Name=\'fgSno\' LookupId=\'True\' />' + thisSUVStr + '</In><In><FieldRef Name=\'fgFno\' />' + allWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno" /><FieldRef Name="fgSno" Ascending="False" /></OrderBy></Query><RowLimit>2000</RowLimit></View>');

			this.collListItem2 = oList.getItems(camlQuery);

			clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');

			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep6), Function.createDelegate(this, onQueryFailed));
		}
		else{
			alert(EJS_JS_Str21);
			setLWNV();
		}
	}

	function ladeMeStep6(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str22);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
						var tmpSno;
						
						for (var j = 0; j < thisSnoUndVatersArr.length; j++) {
							if (thisSnoUndVatersArr[j].sno == oListItem.get_item('fgSno').get_lookupValue()) {
								tmpSno = thisSnoUndVatersArr[j];
								break;
							}
						}

						if (me.FragebogenArray[i].FA.id != null && me.FragebogenArray[i].FA.fgSno.sLayer > tmpSno.sLayer) {
							break;
						}

						me.FragebogenArray[i].FA = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), tmpSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));
						me.FragebogenArray[i].geaendert = 0;
						break;
					}
				}
			}
		}

		for (var i = 0; i < me.FragebogenArray.length; i++) {
			if (me.FragebogenArray[i].FA.fgSno.sno != fgSno.sno) {
				me.FragebogenArray[i].FA.fgSno = fgSno;
				me.FragebogenArray[i].FA.id = null;
				me.FragebogenArray[i].FA.fgno = tmpFGno;
				tmpFGno++;
				// me.FragebogenArray[i].geaendert = 1;
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FBFuerPL = function (fJahr, fPillarId, isErgebnisKPI, fRGS, fgSno, fRolleKurz, IKriterien, callback) { // Pillar Layer; 只修改了一下带*的行
	this.FragebogenArray = new Array();

	var me = this;
	var allFrageStr = '';
	var allWLFrageStr = '';

	var obWLFrageGibt = false;

	var thisSnoUndVatersArr = new Array();
	var thisSUVStr = '';

	var tmpFGno = (new Date()).getTime();

	var tmpRolleArray; // *

	function ladeMe() { // *
		tmpRolleArray = new Rolle(ladeMeStep1); // *
	} // *

	function ladeMeStep1() { // *
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var camlQuery = new SP.CamlQuery();

		if (isErgebnisKPI == false) {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		else {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str19);
			setLWNV();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			allFrageStr = '<Values>';

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpEineFrage = new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array());
				tmpEineFrage.editierbar = false;
				tmpEineFrage.obWL = false;

				me.FragebogenArray.push(new FAInFB(tmpEineFrage, new FrageAnt(null, tmpFGno, oListItem.get_item('fno'), fgSno, 0, '', ''), 1));
				allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
				tmpFGno++;
			}

			allFrageStr += '</Values>';

			ladeMeStep3();
		}
	}

	function ladeMeStep3() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep4(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str20);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
						me.FragebogenArray[i].EF.fRolle.push(new EineRolle(oListItem.get_item('fawRolle').get_lookupId(), oListItem.get_item('fawRolle').get_lookupValue()));
						break;
					}
				}
			}

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				for (var j = 0; j < me.FragebogenArray[i].EF.fRolle.length; j++) {
					if (tmpRolleArray.getRolle(me.FragebogenArray[i].EF.fRolle[j].rKurz).rLayer == 100) { // *
						me.FragebogenArray[i].EF.obWL = true;
						me.FragebogenArray[i].EF.editierbar = true;
						break;
					}
				}
			}

			allWLFrageStr = '<Values>';

			for (var i = me.FragebogenArray.length - 1; i >= 0 ; i--) {
				if (me.FragebogenArray[i].EF.obWL == true) {
					allWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
					obWLFrageGibt = true;
				}
				else {
					me.FragebogenArray.splice(i, 1);
				}
			}

			allWLFrageStr += '</Values>';

			var tmpSno = fgSno;

			thisSUVStr = '<Values>';

			do {
				thisSnoUndVatersArr.push(tmpSno);
				thisSUVStr += '<Value Type=\'Integer\'>' + tmpSno.id + '</Value>';

				tmpSno = tmpSno.sVater;

				if (tmpSno.sno == 'IAMFESTO') {
					break;
				}
			} while (true);

			thisSUVStr += '</Values>';

			ladeMeStep5();
		}
	}

	function ladeMeStep5() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		if (obWLFrageGibt) {
			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml('<View><Query><Where><And><In><FieldRef Name=\'fgSno\' LookupId=\'True\' />' + thisSUVStr + '</In><In><FieldRef Name=\'fgFno\' />' + allWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno" /><FieldRef Name="fgSno" Ascending="False" /></OrderBy></Query><RowLimit>2000</RowLimit></View>');

			this.collListItem2 = oList.getItems(camlQuery);

			clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');

			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep6), Function.createDelegate(this, onQueryFailed));
		}
		else {
			alert(EJS_JS_Str31); // *
			setLWNV();
		}
	}

	function ladeMeStep6(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str22);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.FragebogenArray) {
					if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
						var tmpSno;

						for (var j = 0; j < thisSnoUndVatersArr.length; j++) {
							if (thisSnoUndVatersArr[j].sno == oListItem.get_item('fgSno').get_lookupValue()) {
								tmpSno = thisSnoUndVatersArr[j];
								break;
							}
						}

						if (me.FragebogenArray[i].FA.id != null && me.FragebogenArray[i].FA.fgSno.sLayer > tmpSno.sLayer) {
							break;
						}

						me.FragebogenArray[i].FA = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), tmpSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));
						me.FragebogenArray[i].geaendert = 0;
						break;
					}
				}
			}
		}

		for (var i = 0; i < me.FragebogenArray.length; i++) {
			if (me.FragebogenArray[i].FA.fgSno.sno != fgSno.sno) {
				me.FragebogenArray[i].FA.fgSno = fgSno;
				me.FragebogenArray[i].FA.id = null;
				me.FragebogenArray[i].FA.fgno = tmpFGno;
				tmpFGno++;
				// me.FragebogenArray[i].geaendert = 1;
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FragePool = function (fJahr, fPillarId, isErgebnisKPI, IKriterien, callback) {
	this.FragePoolArray = new Array();

	var me = this;
	var allFrageStr = '';

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		var camlQuery = new SP.CamlQuery();

		if (isErgebnisKPI == false) {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}
		else {
			camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
		}

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			callCallback();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			allFrageStr = '<Values>';

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.FragePoolArray.push(new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array()));
				allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
			}

			allFrageStr += '</Values>';

			ladeMeStep3();
		}
	}

	function ladeMeStep3() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep4(sender, args) {
		if (collListItem2.get_count() != 0) {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i = 0; i < me.FragePoolArray.length; i++) {
					if (me.FragePoolArray[i].fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
						var tmpRolle = new EineRolle(oListItem.get_item('fawRolle').get_lookupId(), oListItem.get_item('fawRolle').get_lookupValue());
						tmpRolle.FAWId = oListItem.get_id();
						me.FragePoolArray[i].fRolle.push(tmpRolle);
						break;
					}
				}
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

FragePool.prototype.getEineFrageById = function (tmpId) {
	var me = this;

	for (var i = 0; i < me.FragePoolArray.length; i++) {
		if (me.FragePoolArray[i].id == tmpId) {
			return me.FragePoolArray[i];
		}
	}
}

FragePool.prototype.speichernFOrder = function (callback) {
	var me = this;
	var tmpFrageArray = new Array();

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		for (var i = 0; i < me.FragePoolArray.length; i++) {
			if (me.FragePoolArray[i].fOrderGeaendert == true) {
				var oListItem = oList.getItemById(me.FragePoolArray[i].id);

				oListItem.set_item('fOrder', me.FragePoolArray[i].fOrder);

				oListItem.update();

				clientContext.load(oListItem);

				tmpFrageArray.push(oListItem);
			}
		}

		if (tmpFrageArray.length == 0) {
			if (typeof (callback) === "function") {
				callback();
			}
		}
		else {
			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
		}
	}

	function ladeMeStep2(sender, args) {
		for (var i = 0; i < tmpFrageArray.length; i++) {
			me.getEineFrageById(tmpFrageArray[i].get_id()).fOrderGeaendert = false;
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FPUKommentar = function (frageId, callback) { // FragePunktUndKommentar
	this.FPUKommentarArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'fgFno\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + frageId + '</Value></Eq></Where><OrderBy><FieldRef Name="fgPunkt" /><FieldRef Name="fgSno" /></OrderBy></Query><RowLimit>2000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str23);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.FPUKommentarArray.push(new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), new Struktureinheit(oListItem.get_item('fgSno').get_lookupId(), oListItem.get_item('fgSno').get_lookupValue()), oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst') == null ? '' : oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar') == null ? '' : oListItem.get_item('fgKommentar')));
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var FBAuswertung = function (IJahr, fPillarId, isErgebnisKPI, IKriterien, callback) {
	this.myFP = null;
	this.myStruktur = null;
	this.myEvaluierteStruktur = new Array();
	this.myRollen = null;

	var me = this;

	function ladeMe() {
		me.myStruktur = new AlleStrukturBaum('IAMFESTO', ladeRollen);
	}

	function ladeRollen() {
		me.myRollen = new Rolle(ladeStatByPillarStep1);
	}

	function ladeStatByPillarStep1() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq><Eq><FieldRef Name=\'stPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq></And></Where><OrderBy><FieldRef Name="stSno"></FieldRef><FieldRef Name="stRGS"></FieldRef></OrderBy></Query><RowLimit>20000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, stJahr, stSno, stPillar, stRGS, K1Summe, K1Anzahl, K2Summe, K2Anzahl, K3Summe, K3Anzahl, K4Summe, K4Anzahl, K5Summe, K5Anzahl, K6Summe, K6Anzahl, K7Summe, K7Anzahl, K8Summe, K8Anzahl)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatByPillarStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatByPillarStep2() {
		if (collListItem2.get_count() == 0) {
			alert('Keine Evaluation vorhanden!'); // 加入字典
		}
		else {
			var tmpSnoId = null;

			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				if (tmpSnoId != oListItem.get_item('stSno').get_lookupId()) {
					tmpSnoId = oListItem.get_item('stSno').get_lookupId();

					var tmpSno = me.myStruktur.getSEById(tmpSnoId);

					if (fPillarId == 1 && tmpSno.sLayer == 1) {
						if (oListItem.get_item('K1Anzahl') + oListItem.get_item('K2Anzahl') + oListItem.get_item('K3Anzahl') + oListItem.get_item('K4Anzahl') + oListItem.get_item('K5Anzahl') + oListItem.get_item('K7Anzahl') + oListItem.get_item('K8Anzahl') != 0) {
							me.myEvaluierteStruktur.push(tmpSno);
						}
					}
					else {
						me.myEvaluierteStruktur.push(tmpSno);
					}
				}
			}
		}

		ladeMeStep3();
	}
	
	function ladeMeStep3(sender, args) {
		me.myFP = new FragePool(IJahr, fPillarId, isErgebnisKPI, IKriterien, ladeMeStep4);
	}

	function ladeMeStep4(sender, args) {
		if (me.myFP.FragePoolArray.length == 0) {
			alert('Es gibt keine Frage in dieser Pillar!'); // 加入字典
			callCallback();
			return false;
		}

		var allFrageIdStr = '<Values>';
		var FBStrInStruktur = '({';

		for (var i = 0; i < me.myFP.FragePoolArray.length; i++) {
			allFrageIdStr += '<Value Type=\'Text\'>' + me.myFP.FragePoolArray[i].fno + '</Value>';
			FBStrInStruktur += 'F' + parseInt(me.myFP.FragePoolArray[i].fno) + ':{fgPunkt:undefined},';
			me.myFP.FragePoolArray[i].WDPArray = new Array();
			me.myFP.FragePoolArray[i].gibtEsKommentar = false;
		}

		allFrageIdStr += '</Values>';
		FBStrInStruktur = FBStrInStruktur.slice(0, FBStrInStruktur.length - 1) + '})';

		for (var i = 0; i < me.myStruktur.SEArray.length; i++) {
			me.myStruktur.SEArray[i]['P' + fPillarId] = eval(FBStrInStruktur);
		}

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

		var camlQuery2 = new SP.CamlQuery();
		camlQuery2.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fgFno\' />' + allFrageIdStr + '</In></Where><OrderBy><FieldRef Name="fgSno" Ascending="False" /><FieldRef Name="fgFno" /></OrderBy></Query><RowLimit>20000</RowLimit></View>');

		this.collListItem3 = oList.getItems(camlQuery2);

		clientContext.load(collListItem3, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep5), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep5(sender, args) {
		if (collListItem3.get_count() == 0) {
			alert('Pillar Noch nicht evaluiert!'); // 加入字典
		}
		else {
			var tmpSnoId = null;
			var tmpSno = null;

			var listItemEnumerator = collListItem3.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				if (tmpSnoId != oListItem.get_item('fgSno').get_lookupId()) {
					tmpSnoId = oListItem.get_item('fgSno').get_lookupId();
					tmpSno = me.myStruktur.getSEById(tmpSnoId);
				}

				tmpSno['P' + fPillarId]['F' + parseInt(oListItem.get_item('fgFno').get_lookupValue())] = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), tmpSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));

				if (oListItem.get_item('fgPunkt') >= 0 && oListItem.get_item('fgKommentar') != null) {
					me.myFP.getEineFrageById(oListItem.get_item('fgFno').get_lookupId()).gibtEsKommentar = true;
				}
			}
		}

		for (var i = 0; i < me.myFP.FragePoolArray.length; i++) {
			for (var k = 0; k < me.myFP.FragePoolArray[i].fRolle.length; k++) {
				if (me.myRollen.getRolle(me.myFP.FragePoolArray[i].fRolle[k].id).rLayer >= 0) {
					me.myFP.FragePoolArray[i].obWL = true;
				}
				else {
					me.myFP.FragePoolArray[i].editierbar = true;
				}
			}

			if (me.myFP.FragePoolArray[i].obWL) {
				if (me.myFP.FragePoolArray[i].editierbar) {
					me.myFP.FragePoolArray[i].frageType = 'WLMA';
				}
				else {
					me.myFP.FragePoolArray[i].frageType = 'WL';
				}
			}
			else {
				me.myFP.FragePoolArray[i].frageType = 'MA';
			}

			for (var j = 0; j < me.myEvaluierteStruktur.length; j++) {
				var tmpSDPArray = new Array();
				var tmpUnterstPunkt = null;

				if (me.myFP.FragePoolArray[i].frageType == 'MA') {
					var tmpPunkt = me.myEvaluierteStruktur[j]['P' + fPillarId]['F' + me.myFP.FragePoolArray[i].fno].fgPunkt;
					tmpPunkt = (tmpPunkt == undefined ? 0 : getMinZahl(tmpPunkt, 3));
					tmpUnterstPunkt = tmpPunkt;
					tmpSDPArray.push(tmpUnterstPunkt);
				}
				else if (me.myFP.FragePoolArray[i].frageType == 'WL') {
					var tmpSno2 = me.myEvaluierteStruktur[j];

					while(tmpSno2.sLayer>0){
						var tmpPunkt = tmpSno2['P' + fPillarId]['F' + me.myFP.FragePoolArray[i].fno].fgPunkt;

						if (tmpPunkt != undefined) {
							tmpPunkt = getMinZahl(tmpPunkt, 3);

							if (tmpUnterstPunkt == null) {
								tmpUnterstPunkt = tmpPunkt;
							}

							if (tmpPunkt != -1) {
								tmpSDPArray.push(tmpPunkt);
							}
						}

						tmpSno2 = tmpSno2.sVater;
					}

					if (tmpUnterstPunkt == null) {
						tmpUnterstPunkt = 0;
						tmpSDPArray.push(tmpUnterstPunkt);
					}
				}
				else {
					var tmpSno2 = me.myEvaluierteStruktur[j];
					var tmpUntersteSno = null;

					while (tmpSno2.sLayer > 0) {
						var tmpPunkt = tmpSno2['P' + fPillarId]['F' + me.myFP.FragePoolArray[i].fno].fgPunkt;

						if (tmpPunkt != undefined) {
							tmpPunkt = getMinZahl(tmpPunkt, 3);

							if (tmpUnterstPunkt == null) {
								tmpUnterstPunkt = tmpPunkt;
								tmpUntersteSno = tmpSno2;
							}

							if (tmpPunkt != -1) {
								tmpSDPArray.push(tmpPunkt);
							}
						}

						tmpSno2 = tmpSno2.sVater;
					}

					if (tmpUnterstPunkt == null) {
						tmpUnterstPunkt = 0;
						tmpSDPArray.push(tmpUnterstPunkt);
					}
					else {
						if (tmpUntersteSno.sno != me.myEvaluierteStruktur[j].sno) {
							tmpSDPArray.push(tmpUnterstPunkt);
						}
					}
				}

				var tmpSDP;

				var tmpSumme = 0;
				var tmpAnzahl = 0;

				if (tmpUnterstPunkt == -1) {
					tmpSDP = -1;
				}
				else {
					for (var n = 0; n < tmpSDPArray.length; n++) {
						if (tmpSDPArray[n] >= 0) {
							tmpSumme += tmpSDPArray[n];
							tmpAnzahl++;
						}
					}

					tmpSDP = tmpSumme / tmpAnzahl;
				}

				me.myEvaluierteStruktur[j]['P' + fPillarId]['F' + me.myFP.FragePoolArray[i].fno].SDP = tmpSDP;

				me.myFP.FragePoolArray[i].WDPArray.push(tmpSDP);
			}

			var tmpWDP;

			var tmpSumme2 = 0;
			var tmpAnzahl2 = 0;

			if (me.myFP.FragePoolArray[i].WDPArray.length == 0) {
				tmpWDP = 0;
			}
			else {
				for (var n = 0; n < me.myFP.FragePoolArray[i].WDPArray.length; n++) {
					if (me.myFP.FragePoolArray[i].WDPArray[n] >= 0) {
						tmpSumme2 += me.myFP.FragePoolArray[i].WDPArray[n];
						tmpAnzahl2++;
					}
				}

				tmpWDP = (tmpAnzahl2 == 0 ? -1 : (tmpSumme2 / tmpAnzahl2));
			}

			me.myFP.FragePoolArray[i].WDP = tmpWDP;
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

/*==========================================
	EineStatistik
	EineFBStat
	getStatistik
===========================================*/

var EineStatistik = function (id, stJahr, stSno, stPillar, stRGS, K1Summe, K1Anzahl, K2Summe, K2Anzahl, K3Summe, K3Anzahl, K4Summe, K4Anzahl, K5Summe, K5Anzahl, K6Summe, K6Anzahl, K7Summe, K7Anzahl, K8Summe, K8Anzahl) {
	this.id = id;
	this.stJahr = stJahr;
	this.stSno = stSno;
	this.stPillar = stPillar;
	this.stRGS = stRGS;
	this.K1Summe = K1Summe;
	this.K1Anzahl = K1Anzahl;
	this.K2Summe = K2Summe;
	this.K2Anzahl = K2Anzahl;
	this.K3Summe = K3Summe;
	this.K3Anzahl = K3Anzahl;
	this.K4Summe = K4Summe;
	this.K4Anzahl = K4Anzahl;
	this.K5Summe = K5Summe;
	this.K5Anzahl = K5Anzahl;
	this.K6Summe = K6Summe;
	this.K6Anzahl = K6Anzahl;
	this.K7Summe = K7Summe;
	this.K7Anzahl = K7Anzahl;
	this.K8Summe = K8Summe;
	this.K8Anzahl = K8Anzahl;
}

var EineFBStat = function (stJahr, stSno, stPillar, stInitial, callback) {
	this.EFBSArray = stInitial;

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + stJahr + '</Value></Eq><Eq><FieldRef Name=\'stSno\'/><Value Type=\'Text\'>' + stSno + '</Value></Eq></And><Eq><FieldRef Name=\'stPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + stPillar + '</Value></Eq></And></Where><OrderBy><FieldRef Name="stRGS"></FieldRef></OrderBy></Query><RowLimit>200</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, stJahr, stSno, stPillar, stRGS, K1Summe, K1Anzahl, K2Summe, K2Anzahl, K3Summe, K3Anzahl, K4Summe, K4Anzahl, K5Summe, K5Anzahl, K6Summe, K6Anzahl, K7Summe, K7Anzahl, K8Summe, K8Anzahl)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str24);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				for (var i in me.EFBSArray) {
					if (parseInt(me.EFBSArray[i].stRGS.rgsno) == parseInt(oListItem.get_item('stRGS').get_lookupValue())) {
						me.EFBSArray[i].id = oListItem.get_id();

						me.EFBSArray[i].K1Summe = oListItem.get_item('K1Summe');
						me.EFBSArray[i].K1Anzahl = oListItem.get_item('K1Anzahl');
						me.EFBSArray[i].K2Summe = oListItem.get_item('K2Summe');
						me.EFBSArray[i].K2Anzahl = oListItem.get_item('K2Anzahl');
						me.EFBSArray[i].K3Summe = oListItem.get_item('K3Summe');
						me.EFBSArray[i].K3Anzahl = oListItem.get_item('K3Anzahl');
						me.EFBSArray[i].K4Summe = oListItem.get_item('K4Summe');
						me.EFBSArray[i].K4Anzahl = oListItem.get_item('K4Anzahl');
						me.EFBSArray[i].K5Summe = oListItem.get_item('K5Summe');
						me.EFBSArray[i].K5Anzahl = oListItem.get_item('K5Anzahl');
						me.EFBSArray[i].K6Summe = oListItem.get_item('K6Summe');
						me.EFBSArray[i].K6Anzahl = oListItem.get_item('K6Anzahl');
						me.EFBSArray[i].K7Summe = oListItem.get_item('K7Summe');
						me.EFBSArray[i].K7Anzahl = oListItem.get_item('K7Anzahl');
						me.EFBSArray[i].K8Summe = oListItem.get_item('K8Summe');
						me.EFBSArray[i].K8Anzahl = oListItem.get_item('K8Anzahl');

						break;
					}
				}
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EineFBStat.prototype.getSummeViaRGS = function () {

}

var FBStatLoeschen = function (stJahr, stSno, stPillar, stInitial, callback) {
	this.EFBSArray = stInitial;

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + stJahr + '</Value></Eq><Eq><FieldRef Name=\'stSno\'/><Value Type=\'Text\'>' + stSno + '</Value></Eq></And><Eq><FieldRef Name=\'stPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + stPillar + '</Value></Eq></And></Where><OrderBy><FieldRef Name="stRGS"></FieldRef></OrderBy></Query><RowLimit>200</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, stJahr, stSno, stPillar, stRGS)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str25);
			ladeMeStep3();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('Statistik');
			
			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				this.oListItem2 = oList.getItemById(oListItem.get_id());

				oListItem2.deleteObject();
			}

			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep3), Function.createDelegate(this, this.onQueryFailed));
		}
	}

	function ladeMeStep3(sender, args) {
		for (var i in me.EFBSArray) {
			me.EFBSArray[i].id = null;
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}


var getStatistik = function (IJahr, IPillarInStr, IKriterien, IStruktur, topSESno, callback) {
	this.StatInfo;

	var me = this;

	var IncludeStr = 'Include(Id, stJahr, stSno, stPillar, stRGS';

	function ladeMe() {
		for (var i = 0; i < IKriterien.KriterienArray.length; i++) {
			IncludeStr += ', K' + IKriterien.KriterienArray[i].id + 'Summe, K' + IKriterien.KriterienArray[i].id + 'Anzahl';
			IKriterien.KriterienArray[i].kStat = eval('({Summe:0, Anzahl:0})');
		}
		IncludeStr += ')';

		ladeStat();
	}

	function ladeStat() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq><In><FieldRef Name=\'stSno\'/>' + IStruktur.SEInStr + '</In></And><In><FieldRef Name=\'stPillar\' LookupId=\'True\' />' + IPillarInStr + '</In></And></Where><OrderBy><FieldRef Name="stSno"></FieldRef></OrderBy></Query><RowLimit>400000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, IncludeStr);

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str26);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			var tmpStruktur = IStruktur.SEArray[0];
			var tmpI = 0;

			var tmpSnoPillarABF = new Array();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpSnoId = oListItem.get_item('stSno').get_lookupId();

				if (tmpSnoId != tmpStruktur.id) {
					var gefunden = false;
					var iterationMal = 0;
					do {
						iterationMal++;

						if (iterationMal > 1) {
							tmpI = 0;
						}

						if (iterationMal > 2) {
							alert(EJS_JS_Str27);
							return false;
						}

						for (tmpI; tmpI < IStruktur.SEArray.length; tmpI++) {
							if (tmpSnoId == IStruktur.SEArray[tmpI].id) {
								tmpStruktur = IStruktur.SEArray[tmpI];
								gefunden = true;
								break;
							}
						}
					} while (gefunden == false);
				}

				if (tmpStruktur.sLayer == 1) {
					continue;
				}

				var tmpSnoPillarStr = tmpSnoId + 'X' + oListItem.get_item('stPillar').get_lookupId();

				var tmpPPId = 'P' + oListItem.get_item('stPillar').get_lookupId();
				var tmpRRGSId = 'R' + oListItem.get_item('stRGS').get_lookupId();

				tmpStruktur.sStat[tmpPPId]['OBF'] = true;

				if ($.inArray(tmpSnoPillarStr, tmpSnoPillarABF) == -1) {
					tmpSnoPillarABF.push(tmpSnoPillarStr);

					var tmpStrukturToAdd2;

					var topSnoErreicht2 = false;
					tmpStrukturToAdd2 = tmpStruktur;

					do {
						if (tmpStrukturToAdd2.sno == topSESno) {
							topSnoErreicht2 = true;
						}

						tmpStrukturToAdd2.sStat[tmpPPId]['ABF'] += 1;

						tmpStrukturToAdd2 = tmpStrukturToAdd2.sVater;
					} while (topSnoErreicht2 == false);
				}

				var tmpStrukturToAdd;

				for (var i = 0; i < IKriterien.KriterienArray.length; i++) {
					var tmpKKId = 'K' + IKriterien.KriterienArray[i].id;

					var tmpKSumme = oListItem.get_item(tmpKKId + 'Summe');
					var tmpKAnzahl = oListItem.get_item(tmpKKId + 'Anzahl');

					var topSnoErreicht = false;
					tmpStrukturToAdd = tmpStruktur;
					
					do {
						if (tmpStrukturToAdd.sno == topSESno) {
							topSnoErreicht = true;
						}

						tmpStrukturToAdd.sStat[tmpPPId][tmpRRGSId][tmpKKId].Summe += tmpKSumme;
						tmpStrukturToAdd.sStat[tmpPPId][tmpRRGSId][tmpKKId].Anzahl += tmpKAnzahl;

						tmpStrukturToAdd = tmpStrukturToAdd.sVater;
					} while (topSnoErreicht == false);
				}
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}
	
	ladeMe();
}

var getEKPIStat = function (IJahr, IEKPIStat, callback){
	this.StatInfo;

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq><Gt><FieldRef Name=\'K6Anzahl\'/><Value Type=\'Number\'>0</Value></Gt></And></Where><OrderBy><FieldRef Name="stRGS"></FieldRef></OrderBy></Query><RowLimit>100</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, stJahr, stSno, stPillar, stRGS, K6Summe, K6Anzahl)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str28);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpRRGSId = 'R' + oListItem.get_item('stRGS').get_lookupId();

				IEKPIStat.kStat[tmpRRGSId]['OBF'] = true;

				var tmpKSumme = oListItem.get_item('K6Summe');
				var tmpKAnzahl = oListItem.get_item('K6Anzahl');

				IEKPIStat.kStat[tmpRRGSId].Summe += tmpKSumme;
				IEKPIStat.kStat[tmpRRGSId].Anzahl += tmpKAnzahl;
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}


/*==========================================
	EineEStep
	EStep
===========================================*/

var EineEStep = function (id, esKurz, esName) {
	this.id = id;
	this.esKurz = esKurz;
	this.esName = esName;
}

var EStep = function (callback) {
	this.EStepArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EStep');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><RowLimit>50</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, esKurz, esName)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert(EJS_JS_Str29);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.EStepArray.push(new EineEStep(oListItem.get_id(), oListItem.get_item('esKurz'), oListItem.get_item('esName')));
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EStep.prototype.getEStep = function (idOrName) {
	var tmpStr = (typeof (idOrName) === 'number') ? 'id' : 'esKurz';

	for (var i in this.EStepArray) {
		if (this.EStepArray[i][tmpStr] == idOrName) {
			return this.EStepArray[i];
		}
	}
}


/*==========================================
	EineEPlan
	EPlan
	EPlanFuerStat
	EPlanFuerEPVerwaltung
===========================================*/

var EineEPlan = function (id, epno, epJahr, epSno, epEStep, epPillar) {
	this.id = id;
	this.epno = epno;
	this.epJahr = epJahr;
	this.epSno = epSno;
	this.epEStep = epEStep;
	this.epPillar = epPillar;
}

var EPlan = function (IJahr, IPillar, IStruktur, IEStep, callback) {
	this.EPlanInfo;
	this.EPlanArray = new Array();

	var me = this;

	function ladeMe() {
		var tmpObjStr = '({';

		for (var i = 0; i < IEStep.EStepArray.length; i++) {
			tmpObjStr += IEStep.EStepArray[i].esKurz + ':[],';
		}

		tmpObjStr = tmpObjStr.substring(0, tmpObjStr.length - 1);
		tmpObjStr += '})';

		for (var i = 0; i < IStruktur.SEArray.length; i++) {
			IStruktur.SEArray[i].EPInfo = eval(tmpObjStr);
		}

		ladeStat();
	}

	function ladeStat() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EPlan');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'epJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq></Where><OrderBy><FieldRef Name="epSno"></FieldRef></OrderBy></Query><RowLimit>400000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, epno, epJahr, epSno, epEStep, epPillar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str30);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpId = oListItem.get_id();
				var tmpEpno = oListItem.get_item('epno');
				var tmpEpJahr = oListItem.get_item('epJahr');
				var tmpEpSno = IStruktur.getSEById(oListItem.get_item('epSno').get_lookupId());
				var tmpEpEStep = IEStep.getEStep(oListItem.get_item('epEStep').get_lookupId());
				var tmpEpPillar = IPillar.getPillar(oListItem.get_item('epPillar').get_lookupId());

				me.EPlanArray.push(new EineEPlan(tmpId, tmpEpno, tmpEpJahr, tmpEpSno, tmpEpEStep, tmpEpPillar));

				tmpEpSno.EPInfo[tmpEpEStep.esKurz].push(tmpEpPillar);
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var EPlanFuerStat = function (IJahr, callback) {
	this.EPlanInfo;
	this.EPlanArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EPlan');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'epJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq></Where><OrderBy><FieldRef Name="epSno"></FieldRef></OrderBy></Query><RowLimit>400000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, epno, epJahr, epSno, epEStep, epPillar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str30);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpId = oListItem.get_id();
				var tmpEpno = oListItem.get_item('epno');
				var tmpEpJahr = oListItem.get_item('epJahr');
				var tmpEpSno = { id: oListItem.get_item('epSno').get_lookupId(), sno: oListItem.get_item('epSno').get_lookupValue() };
				var tmpEpEStep = { id: oListItem.get_item('epEStep').get_lookupId() };
				var tmpEpPillar = { id: oListItem.get_item('epPillar').get_lookupId(), pName: oListItem.get_item('epPillar').get_lookupValue() };

				me.EPlanArray.push(new EineEPlan(tmpId, tmpEpno, tmpEpJahr, tmpEpSno, tmpEpEStep, tmpEpPillar));
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var EPlanFuerEPVerwaltung = function (IJahr, IPillarId, IEStepId, callback) {
	this.EPlanInfo;
	this.EPlanArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EPlan');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'epJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq><Eq><FieldRef Name=\'epPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + IPillarId + '</Value></Eq></And><Eq><FieldRef Name=\'epEStep\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + IEStepId + '</Value></Eq></And></Where><OrderBy><FieldRef Name="epSno"></FieldRef></OrderBy></Query><RowLimit>400000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, epno, epJahr, epSno, epEStep, epPillar)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			// alert(EJS_JS_Str30);
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpId = oListItem.get_id();
				var tmpEpno = oListItem.get_item('epno');
				var tmpEpJahr = oListItem.get_item('epJahr');
				var tmpEpSno = { id: oListItem.get_item('epSno').get_lookupId() };
				var tmpEpEStep = { id: oListItem.get_item('epEStep').get_lookupId() };
				var tmpEpPillar = { id: oListItem.get_item('epPillar').get_lookupId() };

				me.EPlanArray.push(new EineEPlan(tmpId, tmpEpno, tmpEpJahr, tmpEpSno, tmpEpEStep, tmpEpPillar));
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

/*==========================================
	sysRecount
===========================================*/

var sysRecount = function (IJahr, callback) {
	this.myJahr = IJahr;
	this.myStruktur = null;
	this.myPillar = null;
	this.myKriterien = null;
	this.myRGS = null;
	this.myRolle = null;

	var me = this;

	var allStatToSaveArray = new Array();

	var tmpPillar = null;
	var tmpSEStatArray = null;
	var tmpFBArray = null;

	var tmpOneSEStat = null;

	var mySPZaehler = 0;

	var EineSEStat = function (tmpSE) {
		this.SE = tmpSE;
		this.EFBSArray = new Array();

		for (var i = 0; i < me.myRGS.RGSArray.length; i++) {
			this.EFBSArray.push(new EineStatistik(null, IJahr, tmpSE, tmpPillar, me.myRGS.RGSArray[i], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
		}
	}

	function checkSEExisted(tmpSEId){
		for (var i = 0; i < tmpSEStatArray.length; i++) {
			if (tmpSEStatArray[i].SE.id == tmpSEId) {
				return true;
			}
		}

		return false;
	}

	function initSEStatAndInsert(tmpAStruktur) {
		tmpSEStatArray.push(new EineSEStat(tmpAStruktur));
	}

	var FBFuerStat = function (fJahr, fPillarId, isErgebnisKPI, fRGS, allRolle, IKriterien, callback) {
		this.FragebogenArray = new Array();

		var me = this;
		var allFrageStr = '';
		var allWLFrageStr = '';
		var allNichtWLFrageStr = '';

		var obNichtWLFrageGibt = false;
		var obWLFrageGibt = false;

		var fgSno = null;
		var thisSnoUndVatersArr = new Array();
		var thisSUVStr = '';

		var tmpFBSEStat = null;

		var tmpCallback2 = null;

		var tmpFGno = (new Date()).getTime();

		function ladeMe() {
			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

			var camlQuery = new SP.CamlQuery();

			if (isErgebnisKPI == false) {
				camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Neq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Neq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
			}
			else {
				camlQuery.set_viewXml('<View><Query><Where><And><And><Eq><FieldRef Name=\'fPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + fPillarId + '</Value></Eq><Eq><FieldRef Name=\'fJahr\'/><Value Type=\'Text\'>' + fJahr + '</Value></Eq></And><Eq><FieldRef Name=\'fKriterien\' LookupId=\'True\' /><Value Type=\'Lookup\'>6</Value></Eq></And></Where><OrderBy><FieldRef Name="fOrder"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');
			}

			this.collListItem2 = oList.getItems(camlQuery);

			clientContext.load(collListItem2, 'Include(Id, fno, fPillar, fKriterien, fRGS, fJahr, fFrage, fStichwort, fNachweis, fSoll, fGewicht, fOrder)');

			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
		}

		function ladeMeStep2(sender, args) {
			if (collListItem2.get_count() == 0) {
				// alert(EJS_JS_Str12);
				backToLoopByPillar();
			}
			else {
				var listItemEnumerator = collListItem2.getEnumerator();

				allFrageStr = '<Values>';

				while (listItemEnumerator.moveNext()) {
					var oListItem = listItemEnumerator.get_current();

					var tmpEineFrage = new EineFrage(oListItem.get_id(), oListItem.get_item('fno'), new EinPillar(oListItem.get_item('fPillar').get_lookupId(), oListItem.get_item('fPillar').get_lookupValue()), IKriterien.getKriterium(oListItem.get_item('fKriterien').get_lookupId()), new EineRGS(oListItem.get_item('fRGS').get_lookupId(), parseInt(oListItem.get_item('fRGS').get_lookupValue())), oListItem.get_item('fJahr'), oListItem.get_item('fFrage'), oListItem.get_item('fStichwort'), oListItem.get_item('fNachweis'), oListItem.get_item('fSoll'), oListItem.get_item('fGewicht'), oListItem.get_item('fOrder'), new Array());
					tmpEineFrage.editierbar = false;
					tmpEineFrage.obWL = false;

					me.FragebogenArray.push(new FAInFB(tmpEineFrage, new FrageAnt(null, tmpFGno, oListItem.get_item('fno'), fgSno, 0, '', ''), 1));
					allFrageStr += '<Value Type=\'Text\'>' + oListItem.get_item('fno') + '</Value>';
					tmpFGno++;
				}

				allFrageStr += '</Values>';

				ladeMeStep3();
			}
		}

		function ladeMeStep3() {
			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml('<View><Query><Where><In><FieldRef Name=\'fawFno\' />' + allFrageStr + '</In></Where><OrderBy><FieldRef Name="fawFno"></FieldRef><FieldRef Name="fawRolle" Ascending="False"></FieldRef></OrderBy></Query><RowLimit>6000</RowLimit></View>');

			this.collListItem2 = oList.getItems(camlQuery);

			clientContext.load(collListItem2, 'Include(Id, fawFno, fawRolle)');

			clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep4), Function.createDelegate(this, onQueryFailed));
		}

		function ladeMeStep4(sender, args) {
			if (collListItem2.get_count() == 0) {
				alert(EJS_JS_Str13);
			}
			else {
				var listItemEnumerator = collListItem2.getEnumerator();

				while (listItemEnumerator.moveNext()) {
					var oListItem = listItemEnumerator.get_current();

					for (var i in me.FragebogenArray) {
						if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fawFno').get_lookupValue())) {
							var tmpFBEFRolle = allRolle.getRolle(oListItem.get_item('fawRolle').get_lookupId());

							me.FragebogenArray[i].EF.fRolle.push(tmpFBEFRolle);
							break;
						}
					}
				}

				for (var i = 0; i < me.FragebogenArray.length; i++) {
					for (var j = 0; j < me.FragebogenArray[i].EF.fRolle.length; j++) {
						if (me.FragebogenArray[i].EF.fRolle[j].rLayer >= 0) {
							me.FragebogenArray[i].EF.obWL = true;
						}
						else {
							me.FragebogenArray[i].EF.editierbar = true;
						}
					}
				}

				allWLFrageStr = '<Values>';
				allNichtWLFrageStr = '<Values>';

				for (var i = me.FragebogenArray.length - 1; i >= 0 ; i--) {
					if (me.FragebogenArray[i].EF.obWL == true) {
						allWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
						obWLFrageGibt = true;
						me.FragebogenArray[i].geaendert = 0;
					}
					else {
						obNichtWLFrageGibt = true;
						allNichtWLFrageStr += '<Value Type=\'Text\'>' + me.FragebogenArray[i].EF.fno + '</Value>';
					}
				}

				allWLFrageStr += '</Values>';
				allNichtWLFrageStr += '</Values>';

				if (typeof (callback) === "function") {
					callback();
				}

				
			}
		}

		this.ladeFBbySEAndRecount = function (tmpASEStat, tmpCallback) {
			fgSno = tmpASEStat.SE;
			tmpFBSEStat = tmpASEStat.EFBSArray;
			tmpCallback2 = tmpCallback;

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				me.FragebogenArray[i].FA = new FrageAnt(null, tmpFGno, me.FragebogenArray[i].EF.fno, fgSno, 0, '', '');
				me.FragebogenArray[i].FAArray = new Array();
				me.FragebogenArray[i].geaendert = 1;
				tmpFGno++;
			}

			var tmpSno = fgSno;

			thisSUVStr = '<Values>';
			thisSnoUndVatersArr = new Array();

			do {
				thisSnoUndVatersArr.push(tmpSno);
				thisSUVStr += '<Value Type=\'Integer\'>' + tmpSno.id + '</Value>';

				tmpSno = tmpSno.sVater;

				if (tmpSno.sno == 'IAMFESTO') {
					break;
				}
			} while (true);

			thisSUVStr += '</Values>';

			ladeMeStep5();
		}

		function ladeMeStep5() {
			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

			if (obNichtWLFrageGibt) {
				var camlQuery = new SP.CamlQuery();
				camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'fgSno\'/><Value Type=\'Text\'>' + fgSno.sno + '</Value></Eq><In><FieldRef Name=\'fgFno\' />' + allNichtWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno"></FieldRef></OrderBy></Query><RowLimit>2000</RowLimit></View>');

				this.collListItem2 = oList.getItems(camlQuery);

				clientContext.load(collListItem2, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');
			}

			if (obWLFrageGibt) {
				var camlQuery2 = new SP.CamlQuery();
				camlQuery2.set_viewXml('<View><Query><Where><And><In><FieldRef Name=\'fgSno\' LookupId=\'True\' />' + thisSUVStr + '</In><In><FieldRef Name=\'fgFno\' />' + allWLFrageStr + '</In></And></Where><OrderBy><FieldRef Name="fgFno" /><FieldRef Name="fgSno" Ascending="False" /></OrderBy></Query><RowLimit>2000</RowLimit></View>');

				this.collListItem3 = oList.getItems(camlQuery2);

				clientContext.load(collListItem3, 'Include(Id, fgno, fgFno, fgSno, fgPunkt, fgIst, fgKommentar)');
			}

			if (obNichtWLFrageGibt || obWLFrageGibt) {
				clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep6), Function.createDelegate(this, onQueryFailed));
			}
			else {
				ladeMeStep6();
			}
		}

		function ladeMeStep6(sender, args) {
			if (obNichtWLFrageGibt) {
				if (collListItem2.get_count() == 0) {
					// alert(EJS_JS_Str14);
				}
				else {
					var listItemEnumerator = collListItem2.getEnumerator();

					while (listItemEnumerator.moveNext()) {
						var oListItem = listItemEnumerator.get_current();

						for (var i in me.FragebogenArray) {
							if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
								me.FragebogenArray[i].FA = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), fgSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));
								me.FragebogenArray[i].geaendert = 0;
								break;
							}
						}
					}
				}
			}

			if (obWLFrageGibt) {
				if (collListItem3.get_count() == 0) {
					// alert(EJS_JS_Str15);
				}
				else {
					var listItemEnumerator = collListItem3.getEnumerator();

					while (listItemEnumerator.moveNext()) {
						var oListItem = listItemEnumerator.get_current();

						for (var i in me.FragebogenArray) {
							if (me.FragebogenArray[i].EF.fno == parseInt(oListItem.get_item('fgFno').get_lookupValue())) {
								var tmpSno;

								for (var j = 0; j < thisSnoUndVatersArr.length; j++) {
									if (thisSnoUndVatersArr[j].sno == oListItem.get_item('fgSno').get_lookupValue()) {
										tmpSno = thisSnoUndVatersArr[j];
										break;
									}
								}

								var tmpFA2 = new FrageAnt(oListItem.get_id(), oListItem.get_item('fgno'), parseInt(oListItem.get_item('fgFno').get_lookupValue()), tmpSno, oListItem.get_item('fgPunkt'), oListItem.get_item('fgIst'), oListItem.get_item('fgKommentar'));

								if (me.FragebogenArray[i].EF.obWL == true && me.FragebogenArray[i].EF.editierbar == false) {
									if (me.FragebogenArray[i].FA.id == null || me.FragebogenArray[i].FA.fgSno.sLayer < tmpSno.sLayer) {
										if (me.FragebogenArray[i].FA.id != null) {
											me.FragebogenArray[i].FAArray.push(me.FragebogenArray[i].FA);
										}
										me.FragebogenArray[i].FA = tmpFA2;
										me.FragebogenArray[i].geaendert = 0;
									}
									else {
										me.FragebogenArray[i].FAArray.push(tmpFA2);
									}
								}
								else {
									if (me.FragebogenArray[i].FA.fgSno.sno == tmpSno.sno) {
										me.FragebogenArray[i].FA = tmpFA2;
										me.FragebogenArray[i].geaendert = 0;
									}
									else {
										me.FragebogenArray[i].FAArray.push(tmpFA2);
									}
								}

								break;
							}
						}
					}
				}
			}

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				if (me.FragebogenArray[i].FAArray.length > 0 && me.FragebogenArray[i].FA.id == null) {
					var tmpLowestLayerPunktObj = { layer: -1, punkt: NaN };

					for (var j = 0; j < me.FragebogenArray[i].FAArray.length; j++) {
						if (me.FragebogenArray[i].FAArray[j].fgSno.sLayer > tmpLowestLayerPunktObj.layer) {
							tmpLowestLayerPunktObj.layer = me.FragebogenArray[i].FAArray[j].fgSno.sLayer;
							tmpLowestLayerPunktObj.punkt = me.FragebogenArray[i].FAArray[j].fgPunkt;
						}
					}

					if (tmpLowestLayerPunktObj.layer != -1) {
						me.FragebogenArray[i].FA.fgPunkt = tmpLowestLayerPunktObj.punkt;
						me.FragebogenArray[i].geaendert = 1;
					}
				}

				me.FragebogenArray[i].FAArray.push(me.FragebogenArray[i].FA);
			}

			// recount
			for (var i = 0; i < tmpFBSEStat.length; i++) {
				for (var j = 0; j < IKriterien.KriterienArray.length; j++) {
					tmpFBSEStat[i]['K' + IKriterien.KriterienArray[j].id + 'Summe'] = 0;
					tmpFBSEStat[i]['K' + IKriterien.KriterienArray[j].id + 'Anzahl'] = 0;
				}
			}

			for (var i = 0; i < me.FragebogenArray.length; i++) {
				if (me.FragebogenArray[i].FA.fgPunkt >= 0) {
					for (var j = 0; j < tmpFBSEStat.length; j++) {
						if (parseInt(tmpFBSEStat[j].stRGS.rgsno) == parseInt(me.FragebogenArray[i].EF.fRGS.rgsno)) {
							tmpFBSEStat[j]['K' + me.FragebogenArray[i].EF.fKriterien.id + 'Summe'] += me.FragebogenArray[i].AvgFAPunkt();
							tmpFBSEStat[j]['K' + me.FragebogenArray[i].EF.fKriterien.id + 'Anzahl'] += 1;
							break;
						}
					}
				}
			}

			// callback
			if (typeof (tmpCallback2) === "function") {
				tmpCallback2();
			}
		}

		ladeMe();
	}

	function ladeMe() {
		me.myStruktur = new AlleStrukturBaum('IAMFESTO', ladeKriterien);
	}

	function ladeKriterien() {
		me.myKriterien = new Kriterien(ladeRGS);
	}
	
	function ladeRGS(){
		me.myRGS = new RGS(ladeRolle);
	}

	function ladeRolle() {
		me.myRolle = new Rolle(ladePillar);
	}

	function ladePillar() {
		me.myPillar = new Pillar(loopPillar);
	}

	function loopPillar() {
		if (me.myPillar.PillarArray.length == 0) {
			statSpeichern();
		}
		else {
			tmpPillar = me.myPillar.PillarArray[me.myPillar.PillarArray.length - 1];
			me.myPillar.PillarArray.splice(me.myPillar.PillarArray.length - 1, 1);

			ladeStatByPillarStep1();
		}
	}

	function ladeStatByPillarStep1() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'stJahr\'/><Value Type=\'Text\'>' + IJahr + '</Value></Eq><Eq><FieldRef Name=\'stPillar\' LookupId=\'True\' /><Value Type=\'Lookup\'>' + tmpPillar.id + '</Value></Eq></And></Where><OrderBy><FieldRef Name="stSno"></FieldRef><FieldRef Name="stRGS"></FieldRef></OrderBy></Query><RowLimit>20000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, stJahr, stSno, stPillar, stRGS, K1Summe, K1Anzahl, K2Summe, K2Anzahl, K3Summe, K3Anzahl, K4Summe, K4Anzahl, K5Summe, K5Anzahl, K6Summe, K6Anzahl, K7Summe, K7Anzahl, K8Summe, K8Anzahl)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeStatByPillarStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeStatByPillarStep2() {
		if (collListItem2.get_count() == 0) {
			loopPillar();
		}
		else {
			tmpSEStatArray = new Array();

			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				var tmpSnoId = oListItem.get_item('stSno').get_lookupId();

				var tmpSnoObj = me.myStruktur.getSEById(tmpSnoId);
				if (tmpSnoObj.sLayer == 1 && tmpPillar.id == 1) {
					continue;
				}

				if (checkSEExisted(tmpSnoId) == false) {
					initSEStatAndInsert(tmpSnoObj);
				}

				for (var i = 0; i < tmpSEStatArray.length; i++) {
					if (tmpSEStatArray[i].SE.id == tmpSnoId) {
						for (var j = 0; j < tmpSEStatArray[i].EFBSArray.length; j++) {
							if (parseInt(tmpSEStatArray[i].EFBSArray[j].stRGS.rgsno) == parseInt(oListItem.get_item('stRGS').get_lookupValue())) {
								tmpSEStatArray[i].EFBSArray[j].id = oListItem.get_id();
								break;
							}
						}
						break;
					}
				}
			}

			ladeBasicFragePool();
		}
	}

	function ladeBasicFragePool() {
		tmpFBArray = new FBFuerStat(IJahr, tmpPillar.id, false, me.myRGS, me.myRolle, me.myKriterien, loopStruktureinheit);
	}

	function loopStruktureinheit() {
		if (tmpSEStatArray.length == 0) {
			backToLoopByPillar();
		}
		else {
			tmpOneSEStat = tmpSEStatArray[tmpSEStatArray.length - 1];
			tmpSEStatArray.splice(tmpSEStatArray.length - 1, 1);

			ladeSEFBUndRecount();
		}
	}

	function ladeSEFBUndRecount() {
		tmpFBArray.ladeFBbySEAndRecount(tmpOneSEStat, pushSEStatToAllStatToSaveArray);
	}

	function pushSEStatToAllStatToSaveArray() {
		for (var i = 0; i < tmpOneSEStat.EFBSArray.length; i++) {
			allStatToSaveArray.push(tmpOneSEStat.EFBSArray[i]);
		}

		backToLoopByStruktureinheit();
	}

	function backToLoopByStruktureinheit() {
		loopStruktureinheit();
	}

	function backToLoopByPillar() {
		loopPillar();
	}

	function statSpeichern() {
		if (allStatToSaveArray.length == 0) {
			callCallback();
		}
		else {
			for (var i = 0; i < allStatToSaveArray.length; i++) {
				allStatToSaveArray[i].notSaved = true;
			}

			doStatSpeichernStep1();
		}
	}

	function doStatSpeichernStep1() {
		mySPZaehler = 0;

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

		for (var i = 0; i < allStatToSaveArray.length; i++) {
			if (allStatToSaveArray[i].notSaved) {
				var oListItem2;

				if (allStatToSaveArray[i].id == null) {
					var itemCreateInfo = new SP.ListItemCreationInformation();
					oListItem2 = oList.addItem(itemCreateInfo);

					oListItem2.set_item('stSno', allStatToSaveArray[i].stSno.id);
					oListItem2.set_item('stPillar', allStatToSaveArray[i].stPillar.id);
					oListItem2.set_item('stRGS', allStatToSaveArray[i].stRGS.id);
					oListItem2.set_item('stJahr', allStatToSaveArray[i].stJahr);
				}
				else {
					oListItem2 = oList.getItemById(allStatToSaveArray[i].id);
				}

				for (var j = 0; j < me.myKriterien.KriterienArray.length; j++) {
					oListItem2.set_item('K' + me.myKriterien.KriterienArray[j].id + 'Summe', allStatToSaveArray[i]['K' + me.myKriterien.KriterienArray[j].id + 'Summe']);
					oListItem2.set_item('K' + me.myKriterien.KriterienArray[j].id + 'Anzahl', allStatToSaveArray[i]['K' + me.myKriterien.KriterienArray[j].id + 'Anzahl']);
				}

				oListItem2.update();

				clientContext.load(oListItem2);

				allStatToSaveArray[i].notSaved = false;

				mySPZaehler++;
				if (mySPZaehler >= 220) {
					break;
				}
			}
		}

		if (mySPZaehler == 0) {
			callCallback();
		}
		else {
			clientContext.executeQueryAsync(Function.createDelegate(this, doStatSpeichernStep2), Function.createDelegate(this, this.onQueryFailed));
		}
	}

	function doStatSpeichernStep2(sender, args) {
		doStatSpeichernStep1();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

/*==========================================
	EinEJahr
	EJahr
===========================================*/

var EinEJahr = function (id, Jahr, EJAlias) {
	this.id = id;
	this.Jahr = Jahr;
	this.EJAlias = EJAlias;
}

EinEJahr.prototype.ladeByJahr = function (callback) {
	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EJahr');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Jahr\'/><Value Type=\'Integer\'>' + me.Jahr + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, Jahr, EJAlias)');

		clientContext.executeQueryAsync(Function.createDelegate(this, einEJahrErstellen), Function.createDelegate(this, onQueryFailed));
	}

	function einEJahrErstellen(sender, args) {
		if (collListItem2.get_count() == 0) {
			me.id = null;
			me.EJAlias = 'N/A';
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem2 = listItemEnumerator.get_current();

				me.id = oListItem2.get_id();
				me.EJAlias = oListItem2.get_item('EJAlias');
			}
		}

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EinEJahr.prototype.erstelleByEinNeuesJahr = function (callback) {
	var me = this;
	var oListItem;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EJahr');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><And><Gt><FieldRef Name=\'Jahr\'/><Value Type=\'Integer\'>' + me.Jahr * 100 + '</Value></Gt><Lt><FieldRef Name=\'Jahr\'/><Value Type=\'Integer\'>' + (me.Jahr + 1) * 100 + '</Value></Lt></And></Where><OrderBy><FieldRef Name="Jahr" Ascending="FALSE"/></OrderBy></Query><RowLimit>1</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, Jahr, EJAlias)');

		clientContext.executeQueryAsync(Function.createDelegate(this, einEJahrErstellen), Function.createDelegate(this, onQueryFailed));
	}

	function einEJahrErstellen(sender, args) {
		if (collListItem2.get_count() == 0) {
			me.Jahr = me.Jahr * 100 + 1;
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem2 = listItemEnumerator.get_current();
				me.Jahr = ((oListItem2.get_item('Jahr') < 100000) ? (oListItem2.get_item('Jahr') * 100 + 1) : (oListItem2.get_item('Jahr') + 1));
			}
		}

		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EJahr');

		var itemCreateInfo = new SP.ListItemCreationInformation();
		oListItem = oList.addItem(itemCreateInfo);

		oListItem.set_item('Jahr', me.Jahr);
		oListItem.set_item('EJAlias', me.EJAlias);

		oListItem.update();

		clientContext.load(oListItem);

		clientContext.executeQueryAsync(Function.createDelegate(this, prozessEinEJahr), Function.createDelegate(this, onQueryFailed));
	}

	function prozessEinEJahr(sender, args) {
		me.id = oListItem.get_id();

		callCallback();
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EinEJahr.prototype.loeschen = function (callback) {
	var IJahr = parseInt(this.Jahr);

	function ladeMe() {
		var LILBSFP = new ListItemLoeschenBySpalte('FragePool', 'fJahr', IJahr, loeschenStatistik);
	}

	function loeschenStatistik() {
		var LILBSST = new ListItemLoeschenBySpalte('Statistik', 'stJahr', IJahr, loeschenEPlan);
	}

	function loeschenEPlan() {
		var LILBSEP = new ListItemLoeschenBySpalte('EPlan', 'epJahr', IJahr, loeschenEJahr);
	}

	function loeschenEJahr() {
		var LILBSEJ = new ListItemLoeschenBySpalte('EJahr', 'Jahr', IJahr, callCallback);
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var EJahr = function (callback) {
	this.EJahrArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('EJahr');

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID" Ascending="FALSE"/></OrderBy></Query><RowLimit>5000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id, Jahr, EJAlias)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			alert('There is no year!');
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				me.EJahrArray.push(new EinEJahr(oListItem.get_id(), oListItem.get_item('Jahr'), oListItem.get_item('EJAlias')));
			}
		}

		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

EJahr.prototype.getEJAliasByJahr = function (Jahr) {
	var tmpStr = 'Jahr';

	for (var i in this.EJahrArray) {
		if (this.EJahrArray[i][tmpStr] == Jahr) {
			return this.EJahrArray[i].EJAlias;
		}
	}

	return false;
}

EJahr.prototype.getEinEJahrByJahr = function (Jahr) {
	var tmpStr = 'Jahr';

	for (var i in this.EJahrArray) {
		if (this.EJahrArray[i][tmpStr] == Jahr) {
			return this.EJahrArray[i];
		}
	}

	return false;
}

/*==========================================
	kopieFPuRolleByPillar
	kopieFPuRolleInAllePillar
===========================================*/

var kopieFPuRolleByPillar = function (altJahr, neuJahr, IPillarId, IEKPI, IKriterien, callback) {
	this.FP = null;
	this.FPFromServer = null;

	var tmpUniFno = (new Date()).getTime();
	var FPRollenArray = null;

	var me = this;

	function ladeMe() {
		FPRollenArray = new Array();
		me.FPFromServer = new Array();
		me.FP = new FragePool(altJahr, IPillarId, IEKPI, IKriterien, prozessFP);
	}

	function prozessFP() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle('FragePool');

		for (var i = 0; i < me.FP.FragePoolArray.length; i++) {
			tmpUniFno++;

			me.FP.FragePoolArray[i].fJahr = neuJahr;
			me.FP.FragePoolArray[i].fno = tmpUniFno;
			me.FP.FragePoolArray[i].id = null;

			// set 'null' to null
			me.FP.FragePoolArray[i].fStichwort = (me.FP.FragePoolArray[i].fStichwort == 'null' ? null : me.FP.FragePoolArray[i].fStichwort);
			me.FP.FragePoolArray[i].fNachweis = (me.FP.FragePoolArray[i].fNachweis == 'null' ? null : me.FP.FragePoolArray[i].fNachweis);
			me.FP.FragePoolArray[i].fSoll = (me.FP.FragePoolArray[i].fSoll == 'null' ? null : me.FP.FragePoolArray[i].fSoll);

			// create new Question
			var itemCreateInfo = new SP.ListItemCreationInformation();
			var oListItem = oList.addItem(itemCreateInfo);

			oListItem.set_item('fno', me.FP.FragePoolArray[i].fno);
			oListItem.set_item('fPillar', me.FP.FragePoolArray[i].fPillar.id);
			oListItem.set_item('fKriterien', me.FP.FragePoolArray[i].fKriterien.id);
			oListItem.set_item('fRGS', me.FP.FragePoolArray[i].fRGS.id);
			oListItem.set_item('fJahr', me.FP.FragePoolArray[i].fJahr);
			oListItem.set_item('fFrage', me.FP.FragePoolArray[i].fFrage);
			oListItem.set_item('fStichwort', me.FP.FragePoolArray[i].fStichwort);
			oListItem.set_item('fNachweis', me.FP.FragePoolArray[i].fNachweis);
			oListItem.set_item('fSoll', me.FP.FragePoolArray[i].fSoll);
			oListItem.set_item('fGewicht', me.FP.FragePoolArray[i].fGewicht);
			oListItem.set_item('fOrder', me.FP.FragePoolArray[i].fOrder);

			oListItem.update();

			clientContext.load(oListItem);

			me.FPFromServer.push(oListItem);
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, prozessFPRollen), Function.createDelegate(this, onQueryFailed));
	}

	function prozessFPRollen(sender, args) {
		// update Question Id in FP
		for (var i = 0; i < me.FP.FragePoolArray.length; i++) {
			for (var j = 0; j < me.FPFromServer.length; j++) {
				if (me.FP.FragePoolArray[i].fno == parseInt(me.FPFromServer[j].get_item('fno'))) {
					me.FP.FragePoolArray[i].id = me.FPFromServer[j].get_id();
					break;
				}
			}
		}

		// push FAW in FPRollenArray
		for (var i = 0; i < me.FP.FragePoolArray.length; i++) {
			for (var j = 0; j < me.FP.FragePoolArray[i].fRolle.length; j++) {
				FPRollenArray.push({ 'FId': me.FP.FragePoolArray[i].id, 'RId': me.FP.FragePoolArray[i].fRolle[j].id });
			}
		}

		loopFAW();
	}

	function loopFAW() {
		if (FPRollenArray.length == 0) {
			callCallback();
		}
		else {
			var tmpCounter = 0;

			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('FrageAnWen');

			for (var i = FPRollenArray.length - 1; i >= 0; i--) {
				if (tmpCounter > 200) {
					break;
				}

				var itemCreateInfo = new SP.ListItemCreationInformation();
				var oListItem = oList.addItem(itemCreateInfo);

				oListItem.set_item('fawFno', FPRollenArray[i].FId);
				oListItem.set_item('fawRolle', FPRollenArray[i].RId);

				oListItem.update();
				clientContext.load(oListItem);

				FPRollenArray.splice(i, 1);

				tmpCounter++;
			}

			clientContext.executeQueryAsync(Function.createDelegate(this, loopFAW), Function.createDelegate(this, onQueryFailed));
		}
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

var kopieFPuRolleInAllePillar = function (myAltJahr, myNeuJahr, callback) {
	var myPillar;
	var myRolle;
	var myKriterien;

	var me = this;

	function ladeMe() {
		myPillar = new Pillar(loadRolle);
	}

	function loadRolle() {
		myRolle = new Rolle(loadKriterien);
	}

	function loadKriterien() {
		myKriterien = new Kriterien(kopieEKPI);
	}

	function kopieEKPI() {
		var tmpKFPuRBP = new kopieFPuRolleByPillar(myAltJahr, myNeuJahr, 1, true, myKriterien, loopPillar);
	}

	var tmpPosition = -1;

	function loopPillar() {
		tmpPosition++;

		if (tmpPosition + 1 > myPillar.PillarArray.length) {
			callCallback();
		}
		else {
			var tmpKFPuRBP = new kopieFPuRolleByPillar(myAltJahr, myNeuJahr, myPillar.PillarArray[tmpPosition].id, false, myKriterien, loopPillar);
		}
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}

/*==========================================
	ListItemLoeschenBySpalte
===========================================*/

var ListItemLoeschenBySpalte = function (IListe, ISpalteName, IJahr, callback) {
	var tmpLimmit = 200;
	var tmpPosition = 0;

	var tmpToBeDeleteIDArray = new Array();

	var me = this;

	function ladeMe() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle(IListe);

		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="' + ISpalteName + '" /><Value Type="Integer">' + IJahr + '</Value></Eq></Where></Query><RowLimit>2000000</RowLimit></View>');

		this.collListItem2 = oList.getItems(camlQuery);

		clientContext.load(collListItem2, 'Include(Id)');

		clientContext.executeQueryAsync(Function.createDelegate(this, ladeMeStep2), Function.createDelegate(this, onQueryFailed));
	}

	function ladeMeStep2(sender, args) {
		if (collListItem2.get_count() == 0) {
			callCallback();
		}
		else {
			var listItemEnumerator = collListItem2.getEnumerator();

			while (listItemEnumerator.moveNext()) {
				var oListItem = listItemEnumerator.get_current();

				tmpToBeDeleteIDArray.push(oListItem.get_id());
			}

			loeschenStep1();
		}
	}

	function loeschenStep1() {
		var clientContext = new SP.ClientContext(siteUrl);
		var oList = clientContext.get_web().get_lists().getByTitle(IListe);

		var tmpRoundLimmit = getMinZahl(tmpPosition + tmpLimmit, tmpToBeDeleteIDArray.length);

		for (tmpPosition; tmpPosition < tmpRoundLimmit; tmpPosition++) {
			var oListItem = oList.getItemById(tmpToBeDeleteIDArray[tmpPosition]);

			oListItem.deleteObject();
		}

		clientContext.executeQueryAsync(Function.createDelegate(this, loeschenStep2), Function.createDelegate(this, onQueryFailed));
	}

	function loeschenStep2() {
		if (tmpPosition == tmpToBeDeleteIDArray.length) {
			callCallback();
		}
		else {
			loeschenStep1();
		}
	}

	function callCallback() {
		if (typeof (callback) === "function") {
			callback();
		}
	}

	ladeMe();
}
