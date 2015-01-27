<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Evaluation Fragebogen</title>
<script type="text/javascript" src="JS/jquery.min191.js"></script>
<script type="text/javascript" src="/_layouts/1033/init.js"></script>
<script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>

</head>

<body style="width:1200px;padding-top:83px;background-color:#FEFEFE;">
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/Evaluation.css" />

	<style type="text/css">
		.dropdown-menu {
			min-width:129px;
		}

		.dropdown-menu li a {
			padding: 3px 15px 3px 15px;
		}
	</style>

	<script src="bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="JS/mlellipsis.min.js"></script>

	<script type="text/javascript" src="JS/Konfiguration.js"></script>
	<script type="text/javascript" src="JS/Evaluation.js"></script>

	<script type="text/javascript" src="raty/jquery.raty.min.js"></script>

	<script language="ecmascript" type="text/ecmascript">
		$(document).ready(function () {
			ExecuteOrDelayUntilScriptLoaded(programmStart, "SP.js");
		});

		var IJahr;
		var IPillar;
		var IKriterien;
		var IRGS;
		var ISno;
		var IRolle;
		var ObAlleOhne = false;

		var IAdmin = false;
		var IErgebnisKPI;

		var myStruktur;
		var myStrukturBaum;
		var myKriterien;
		var myRGS;
		var myRolle;
		var myFragebogen;
		var myStInitial = new Array;
		var myStatistik;

		var mySPZaehler = 0;
		var mySPResultSet = new Array();
		var mySPStatResultSet = new Array();

		var myCallback;
		var myFBGeaendert = false;

		function programmStart() {
			if (checkURIInput(getQueryString('jahr'), getQueryString('pid'),  getQueryString('sno'))) {
				IJahr = parseInt(getQueryString('jahr'));
				IPillar = new EinPillar(parseInt(getQueryString('pid')));
				ISno = getQueryString('sno');
			}
			else {
			    alert(Fragebogen_JS_Str1);
				return false;
			}

			if ((getQueryString('admin') + '').toUpperCase() == 'JA') {
				IAdmin = true;
			}
			
			if (getQueryString('kid') == null) {
				IKriterien = new Array();
				IKriterien.push(-1);
			}
			else {
				IKriterien = getQueryString('kid').split('*');
			}

			IErgebnisKPI = $.inArray('6', IKriterien) >= 0 ? true : false;
			
			var tmpFBTitelStr = ISno + '&nbsp\;&nbsp\;&nbsp\;&nbsp\;&nbsp\;' + IJahr;
			
			var filterRolle = false;

			if (getQueryString('rolle') == null || getQueryString('rolle') == '') {
				IRolle = new Array();
				IRolle.push('alle');
			}
			else {
				IRolle = getQueryString('rolle').split('*');

				var tmpObAlle = false;

				for (var i = 0; i < IRolle.length; i++) {
				    if (IRolle[i].toUpperCase() == 'ALLE') {
				        tmpObAlle = true;
				    }
				    else if (IRolle[i].toUpperCase() == 'ALLEOHNE') {
				        tmpObAlle = true;
				        ObAlleOhne = true;
				    }
				}

				if (tmpObAlle) {
				    IRolle = new Array();
				    IRolle.push('alle');
				}
				else {
				    filterRolle = true;

				    tmpFBTitelStr += '&nbsp\;&nbsp\;&nbsp\;&nbsp\;&nbsp\;' + Fragebogen_JS_Str2 + ' ' + Fragebogen_JS_Str3;
				}
			}

			if (getQueryString('rgs') == null) {
				IRGS = new Array();
				IRGS.push('alle');
			}
			else {
				IRGS = getQueryString('rgs').split('*');

				if (IRGS[0].toUpperCase() != 'ALLE') {
					for (var i = 0; i < IRGS.length; i++) {
						IRGS[i] = parseInt(IRGS[i]);
					}

					if (filterRolle == false) {
					    tmpFBTitelStr += '&nbsp\;&nbsp\;&nbsp\;&nbsp\;&nbsp\;' + Fragebogen_JS_Str2 + ' ' + Fragebogen_JS_Str4;
					}
					else {
					    tmpFBTitelStr += Fragebogen_JS_Str5 + Fragebogen_JS_Str4;
					}
				}
			}

			document.getElementById('FBSnoJahrPillar').innerHTML = tmpFBTitelStr + '<br />';

			IPillar.ladeById(pillarNameEinfuegen);
		}

		function pillarNameEinfuegen() {
			if (IErgebnisKPI == false) {
			    document.getElementById('FBSnoJahrPillar').innerHTML += Fragebogen_JS_Str6 + ' ' + IPillar.pName;
			}
			else {
			    document.getElementById('FBSnoJahrPillar').innerHTML += Fragebogen_JS_Str7;
			}

			myStrukturBaum = new AlleStrukturBaum('IAMFESTO', ladenRGS);
		}

		function ladenRGS() {
			for (var i = 0; i < myStrukturBaum.SEArray.length; i++) {
				if (myStrukturBaum.SEArray[i].sno == ISno) {
					myStruktur = myStrukturBaum.SEArray[i];
					break;
				}
			}

			if (typeof (myStruktur) == 'undefined') {
			    alert(Fragebogen_JS_Str8.fillArgs(ISno));
				return false;
			}

			myRGS = new RGS(initialRGSProgressBar);
		}

		function initialRGSProgressBar() {
			var tmpStr = '';

			for (i in myRGS.RGSArray) {
				tmpStr += EinRGSPBar(myRGS.RGSArray[i].rgsno);
				myRGS.RGSArray[i].rgsMaxZahl = 0;
				myRGS.RGSArray[i].rgsJetztZahl = 0;
			}

			document.getElementById('FBHeaderRight').innerHTML = tmpStr + document.getElementById('FBHeaderRight').innerHTML;

			myKriterien = new Kriterien(KriterienToTBody);
		}

		function KriterienToTBody() {
			for (var i = myKriterien.KriterienArray.length - 1; i >= 0; i--) {
				if ((IErgebnisKPI == false && myKriterien.KriterienArray[i].id == 6) || (IErgebnisKPI == true && myKriterien.KriterienArray[i].id != 6)) {
					myKriterien.KriterienArray.splice(i, 1);
				}
			}

			var myTable = document.getElementById('fragebogenMainTable');

			var KPIAnchorEingefueht = false;

			for (var i = 0; i < myKriterien.KriterienArray.length; i++) {
				var tmpAnchorStr = '';

				if (KPIAnchorEingefueht == false && myKriterien.KriterienArray[i].id >= 6) {
					tmpAnchorStr = '<div id="KPIAnchor"></div>';
					KPIAnchorEingefueht = true;
				}

				var myNewTBody = document.createElement("tbody");
				myNewTBody.id = 'TBody' + myKriterien.KriterienArray[i].id;

				var myNewRow = myNewTBody.insertRow(0);
				myNewRow.id = 'TK' + myKriterien.KriterienArray[i].id; // TK := Table Kriterien

				var myNewCell = myNewRow.insertCell(0);
				myNewCell.className = 'TKriterien';
				myNewCell.innerHTML = tmpAnchorStr + myKriterien.KriterienArray[i].kName;
				myNewCell.colSpan = 8;
				myNewCell.style.backgroundColor = '#b7d6ec';
				myNewCell.style.padding = '2px';

				myTable.appendChild(myNewTBody);

				// Ausgeblendete Fragen anzeigen TBody
				var myNewTBody = document.createElement("tbody");
				myNewTBody.id = 'TBody' + myKriterien.KriterienArray[i].id + 'X';
				myNewTBody.style.borderTop = 'none';
				myNewTBody.style.display = 'none';

				var myNewRow = myNewTBody.insertRow(0);

				var myNewCell = myNewRow.insertCell(0);
				myNewCell.className = 'TAusblenden';
				myNewCell.onmouseover = function () { this.style.textDecoration = 'underline'; };
				myNewCell.onmouseout = function () { this.style.textDecoration = 'none'; };
				tmpAktion = 'einOderAus("' + myNewTBody.id + '", 1)\;';
				myNewCell.onclick = Function(tmpAktion);
				myNewCell.innerHTML = '<span id="TAE' + myNewTBody.id + '" data-ae="E" class="glyphicon glyphicon-chevron-down" style="margin-top:3px\; margin-right:5px\;"></span>' + Fragebogen_JS_Str9;
				myNewCell.colSpan = 8;
				myNewCell.style.padding = '2px';

				myTable.appendChild(myNewTBody);
			}

			for (var i = 0; i < myRGS.RGSArray.length;i++) {
				myStInitial.push(new EineStatistik(null, IJahr, myStruktur, IPillar, myRGS.RGSArray[i], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
			}

			myStatistik = new EineFBStat(IJahr, ISno, IPillar.id, myStInitial, loadRolle);
		}

		function loadRolle() {
			myRolle = new Rolle(loadFragebogen);
		}

		function loadFragebogen() {
			myFragebogen = new Fragebogen(IJahr, IPillar.id, IErgebnisKPI, IRGS, myStruktur, myRolle, myKriterien, FrageToTBody);
		}

		function FrageToTBody() {
			for (var i in myFragebogen.FragebogenArray) {
				var tmpTBody = 'TBody';
				tmpTBody += myFragebogen.FragebogenArray[i].EF.fKriterien.id;

				var obAnzeigen = true;

				if (myFragebogen.FragebogenArray[i].FA != null) {
					if (myFragebogen.FragebogenArray[i].FA.fgPunkt < 0) {
						tmpTBody += 'X';
						obAnzeigen = false;
						document.getElementById(tmpTBody).style.display = '';
					}
					else {
						for (var l in myRGS.RGSArray) {
							if (myRGS.RGSArray[l].rgsno == myFragebogen.FragebogenArray[i].EF.fRGS.rgsno) {
							    myRGS.RGSArray[l].rgsMaxZahl += 3; // * myFragebogen.FragebogenArray[i].EF.fKriterien.kGewicht / 100;
							}
						}
					}
				}

				var _tmpTBody = document.getElementById(tmpTBody);
				var aNewRow = _tmpTBody.insertRow(_tmpTBody.rows.length);
				aNewRow.id = 'FB' + myFragebogen.FragebogenArray[i].EF.id;

				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				//aNewCell.style.width = '49px';
				aNewCell.style.paddingLeft = '20px';

				var tmpBlendenStr = '';
				if (IAdmin == true) {
				    tmpBlendenStr = obAnzeigen == true ? '<br /><span class="glyphicon glyphicon-eye-close" title="' + Fragebogen_JS_Str10 + '" style="margin-left:1px\; cursor:pointer\;" onclick="frageEinOderAus(' + myFragebogen.FragebogenArray[i].EF.id + ')\;"></span>' : '<br /><span class="glyphicon glyphicon-eye-open" title="' + Fragebogen_JS_Str11 + '" style="margin-left:1px\; cursor:pointer\;" onclick="frageEinOderAus(' + myFragebogen.FragebogenArray[i].EF.id + ')\;"></span>';
				}

				aNewCell.innerHTML = '<div style="width:21px\;">' + myFragebogen.FragebogenArray[i].EF.fOrder + tmpBlendenStr + '</div>';

				var tmpRolleStr = '';
				var tmpRolleGefunden = false;
				
				if (IRolle[0].toUpperCase() == 'ALLE') {
					tmpRolleGefunden = true;
				}

				if (myFragebogen.FragebogenArray[i].EF.fRolle.length == myRolle.RolleArray.length) {
				    tmpRolleStr = Fragebogen_JS_Str12 + '/ ';
					tmpRolleGefunden = true;
				}
				else {
					for (var k in myFragebogen.FragebogenArray[i].EF.fRolle) {
						var tmpRolle = myRolle.getRolle(myFragebogen.FragebogenArray[i].EF.fRolle[k].rKurz);
						tmpRolleStr += einRollToolTip('RollToolTip', tmpRolle.rKurz, tmpRolle.rName, 'top') + '/ ';
						
						if($.inArray(myFragebogen.FragebogenArray[i].EF.fRolle[k].rKurz, IRolle) != -1){
							tmpRolleGefunden = true;
						}
					}
				}

				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				//aNewCell.style.width = '86px';
				aNewCell.innerHTML = '<div style="width:70px\;">' + tmpRolleStr.substring(0, tmpRolleStr.length - 2) + '</div>';

				if (tmpRolleGefunden == false || (myFragebogen.FragebogenArray[i].EF.editierbar == false && ObAlleOhne)) {
					aNewRow.style.display = 'none';
				}

				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				aNewCell.innerHTML = '<div id="fFrage' + myFragebogen.FragebogenArray[i].EF.id + '" style="width:329px\;">' + myFragebogen.FragebogenArray[i].EF.fFrage.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />') + '</div>';
				document.getElementById('fFrage' + myFragebogen.FragebogenArray[i].EF.id).mlellipsis(maxRowInFB);

				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				aNewCell.style.width = '142px';
				var tmpPunkt = 0;
				if (myFragebogen.FragebogenArray[i].FA != null) {
					if (myFragebogen.FragebogenArray[i].FA.fgPunkt >= 0) {
						tmpPunkt = myFragebogen.FragebogenArray[i].FA.fgPunkt;
					}
				}
				if (myFragebogen.FragebogenArray[i].EF.fKriterien.id >= 6) {
				    aNewCell.innerHTML = '<div id="TBFPunkt' + myFragebogen.FragebogenArray[i].EF.id + '" class="TBPunktClassKPI" data-score="' + (tmpPunkt ? 1 : 0) + '" data-readOnly="' + !(myFragebogen.FragebogenArray[i].EF.editierbar && obAnzeigen) + '" data-myIndex="' + i + '"></div>';
				}
				else {
				    aNewCell.innerHTML = '<div id="TBFPunkt' + myFragebogen.FragebogenArray[i].EF.id + '" class="TBPunktClass" data-score="' + tmpPunkt + '" data-readOnly="' + !(myFragebogen.FragebogenArray[i].EF.editierbar && obAnzeigen) + '" data-myIndex="' + i + '"></div>';
				}

				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				aNewCell.style.textAlign = 'center';
				//aNewCell.style.width = '42px';
				aNewCell.innerHTML = '<div style="width:26px\;">' + myFragebogen.FragebogenArray[i].EF.fRGS.rgsno + '</div>';

				if (typeof(IRGS[0]) != 'string') {
					if ($.inArray(myFragebogen.FragebogenArray[i].EF.fRGS.rgsno, IRGS) == -1) {
						aNewRow.style.display = 'none';
					}
				}

				if (myFragebogen.FragebogenArray[i].EF.fKriterien.id >= 6) {
					var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
					aNewCell.innerHTML = '<div id="fSoll' + myFragebogen.FragebogenArray[i].EF.id + '" style="width:160px\;">' + (myFragebogen.FragebogenArray[i].EF.fSoll == null ? '' : myFragebogen.FragebogenArray[i].EF.fSoll.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />')) + '</div>';
					document.getElementById('fSoll' + myFragebogen.FragebogenArray[i].EF.id).mlellipsis(maxRowInFB);

					var tmpIst = '';
					if (myFragebogen.FragebogenArray[i].FA != null) {
						if (myFragebogen.FragebogenArray[i].FA.fgIst != null) {
							tmpIst = myFragebogen.FragebogenArray[i].FA.fgIst;
						}
					}
					var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
					aNewCell.innerHTML = '<textarea id="TBFIst' + myFragebogen.FragebogenArray[i].EF.id + '" rows="3" spellcheck="false" style="width:160px\;resize:none\;border:none\;background-color:transparent\;" onchange="var i = ' + i + '\; myFragebogen.FragebogenArray[i].FA.fgIst = this.value\; myFragebogen.FragebogenArray[i].geaendert = 1\; myFBGeaendert = true\;" ' + (myFragebogen.FragebogenArray[i].EF.editierbar && obAnzeigen ? '' : 'readonly="readonly"') + '>' + tmpIst + '</textarea>';
				}
				else {
					var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
					aNewCell.innerHTML = '<div id="fStichwort' + myFragebogen.FragebogenArray[i].EF.id + '" style="width:160px\;">' + (myFragebogen.FragebogenArray[i].EF.fStichwort == null ? '' : myFragebogen.FragebogenArray[i].EF.fStichwort.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />')) + '</div>';
					document.getElementById('fStichwort' + myFragebogen.FragebogenArray[i].EF.id).mlellipsis(maxRowInFB);

					var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
					aNewCell.innerHTML = '<div id="fNachweis' + myFragebogen.FragebogenArray[i].EF.id + '" style="width:160px\;">' + (myFragebogen.FragebogenArray[i].EF.fNachweis == null ? '' : myFragebogen.FragebogenArray[i].EF.fNachweis.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />')) + '</div>';
					document.getElementById('fNachweis' + myFragebogen.FragebogenArray[i].EF.id).mlellipsis(maxRowInFB);
				}

				var tmpKommentar = '';
				if (myFragebogen.FragebogenArray[i].FA != null) {
					if (myFragebogen.FragebogenArray[i].FA.fgKommentar != null) {
						tmpKommentar = myFragebogen.FragebogenArray[i].FA.fgKommentar;
					}
				}
				var aNewCell = aNewRow.insertCell(aNewRow.cells.length);
				aNewCell.innerHTML = '<textarea id="TBFKommentar' + myFragebogen.FragebogenArray[i].EF.id + '" rows="3" spellcheck="false" style="width:168px\;resize:none\;border:none\;background-color:transparent\;" onchange="var i = ' + i + '\; myFragebogen.FragebogenArray[i].FA.fgKommentar = this.value\; myFragebogen.FragebogenArray[i].geaendert = 1\; myFBGeaendert = true\;" ' + (myFragebogen.FragebogenArray[i].EF.editierbar && obAnzeigen ? '' : 'readonly="readonly"') + '>' + tmpKommentar + '</textarea>';

				if (obAnzeigen == false) {
					aNewRow.style.display = 'none';
				}
			}

			$('.TBPunktClass').raty({ score: function () { return $(this).attr('data-score'); }, cancel: true, readOnly: function () { return ($(this).attr('data-readOnly') == 'true' ? true : false); }, width: 102, path: 'image/FVP4/', space: false, iconRange: [{ range: 3, on: 'star-on.png' }, { range: 4, on: 'star-on4.png' }], click: function (score, evt) { var i = parseInt($(this).attr('data-myIndex')); myFragebogen.FragebogenArray[i].FA.fgPunkt = score ? score : 0; myFragebogen.FragebogenArray[i].geaendert = 1; myFBGeaendert = true; doFBStatistik(); if (!score) { showInfoBox('erfolg', Fragebogen_JS_Str30); } } });
			$('.TBPunktClassKPI').raty({ score: function () { return $(this).attr('data-score'); }, cancel: true, readOnly: function () { return ($(this).attr('data-readOnly') == 'true' ? true : false); }, number: 1, hints: [punktKommentar[3]], width: 102, path: 'image/FVP4/', space: false, iconRange: [{ range: 1, on: 'star-on.png' }], click: function (score, evt) { var i = parseInt($(this).attr('data-myIndex')); myFragebogen.FragebogenArray[i].FA.fgPunkt = 3 * (score ? score : 0); myFragebogen.FragebogenArray[i].geaendert = 1; myFBGeaendert = true; doFBStatistik(); if (!score) { showInfoBox('erfolg', Fragebogen_JS_Str30); } } });
			$('.raty-cancel').show();
			$('.RollToolTip').tooltip();

			setFBTHead();

			FBRecout();
			FBSetRGSBar();

			document.getElementById('TBody7').style.display = 'none';
			document.getElementById('TBody7X').style.display = 'none';

			stripRows();

			try{
				if (IKriterien[0] != -1) {
					$(window).scrollTop($('#TBody' + IKriterien[0]).offset().top - 120);
				}
			}
			catch (e) { }

			$('#divLoadingWrapper').fadeOut(200);
		}


		function EinRGSPBar(tmpRGS) {
			var tmpStr = '<div id="PBRGS' + tmpRGS + '" style="margin:12px 0 10px 15px\;font-weight:bold\;float:left\;">';
			tmpStr += Fragebogen_JS_Str13 + ' ' + tmpRGS + ':&nbsp\;&nbsp\;<span id="PBRGS' + tmpRGS + 'Zahl" class="ColorRed">0/0</span>';
			tmpStr += '<div id="PBRGS' + tmpRGS + 'All" class="progress" style="width:100px\;">';
			tmpStr += '<div id="PBRGS' + tmpRGS + 'R" class="progress-bar progress-bar-danger" style="width: 0%\;"></div>';
			tmpStr += '<div id="PBRGS' + tmpRGS + 'Y" class="progress-bar progress-bar-warning" style="width: 0%\;"></div>';
			tmpStr += '<div id="PBRGS' + tmpRGS + 'G" class="progress-bar progress-bar-success" style="width: 0%\;"></div>';
			tmpStr += '</div></div>';   

			return tmpStr;
		}
		
		function einOderAus(tbName, aktion) {
			var tmpDisplay = (aktion == 1) ? '' : 'none';

			var tmpTBody = document.getElementById(tbName);

			for (i = 1; i < tmpTBody.rows.length; i++) {
				tmpTBody.rows[i].style.display = tmpDisplay;
			}

			if (aktion == 1) {
				tmpTBody.rows[0].cells[0].onclick = function () { einOderAus(tbName, 0); };
				tmpTBody.rows[0].cells[0].innerHTML = '<span id="TAE' + tbName + '" data-ae="A" class="glyphicon glyphicon-chevron-up" style="margin-top:3px\; margin-right:5px\;"></span>' + Fragebogen_JS_Str14;
			}
			else {
				tmpTBody.rows[0].cells[0].onclick = function () { einOderAus(tbName, 1); };
				tmpTBody.rows[0].cells[0].innerHTML = '<span id="TAE' + tbName + '" data-ae="E" class="glyphicon glyphicon-chevron-down" style="margin-top:3px\; margin-right:5px\;"></span>' + Fragebogen_JS_Str9;
			}
		}

		function einRollToolTip(className, text, tip, position) {
			var tmpStr = '<span class="' + className + '" data-toggle="tooltip" data-placement="' + position + '" title="" data-original-title="' + tip + '">' + text + '</span>';
			return tmpStr;
		}

		function stripRows() {
			var myTBodies = document.getElementById('fragebogenMainTable').tBodies;

			for (var i = 0; i < myTBodies.length; i++) {
				var tmpZaehler = 0;
				for (var j = 0; j < myTBodies[i].rows.length; j++) {
					if (myTBodies[i].rows[j].style.display != 'none') {
						if (tmpZaehler % 2 == 0) {
							myTBodies[i].rows[j].style.backgroundColor = '#F9F9F9';
						}
						else {
							myTBodies[i].rows[j].style.backgroundColor = '';
						}
						tmpZaehler++;
					}
				}
			}
		}

		function doFBStatistik() {
			// 这里要优化
			FBRecout();

			FBSetRGSBar();
		}

		function FBRecout() {
		    for (var i = 0; i < myRGS.RGSArray.length; i++) {
		        myRGS.RGSArray[i].rgsJetztZahl = 0;
		        myRGS.RGSArray[i].rgsMaxZahl = 0;
		    }

			for (var i = 0; i < myStatistik.EFBSArray.length; i++) {
				for (var j = 0; j < myKriterien.KriterienArray.length; j++) {
					myStatistik.EFBSArray[i]['K' + myKriterien.KriterienArray[j].id + 'Summe'] = 0;
					myStatistik.EFBSArray[i]['K' + myKriterien.KriterienArray[j].id + 'Anzahl'] = 0;
				}
			}

			for (var i = 0; i < myFragebogen.FragebogenArray.length; i++) {
			    if (myFragebogen.FragebogenArray[i].FA.fgPunkt >= 0) {
			        if (myFragebogen.FragebogenArray[i].EF.fKriterien.id != 7) {
			            var tmpRGSX = myRGS.getRGSByNo(myFragebogen.FragebogenArray[i].EF.fRGS.rgsno);
			            tmpRGSX.rgsJetztZahl += getMinZahl(myFragebogen.FragebogenArray[i].FA.fgPunkt, 3);
			            tmpRGSX.rgsMaxZahl += 3;
			        }

					for (var j = 0; j < myStatistik.EFBSArray.length; j++) {
						if (myStatistik.EFBSArray[j].stRGS.rgsno == myFragebogen.FragebogenArray[i].EF.fRGS.rgsno) {
						    myStatistik.EFBSArray[j]['K' + myFragebogen.FragebogenArray[i].EF.fKriterien.id + 'Summe'] += myFragebogen.FragebogenArray[i].AvgFAPunkt();
							myStatistik.EFBSArray[j]['K' + myFragebogen.FragebogenArray[i].EF.fKriterien.id + 'Anzahl'] += 1;
							break;
						}
					}
				}
			}
		}

		function FBSetRGSBar() {
			for (var i in myRGS.RGSArray) {
				var rgsErreichtRound = Math.floor(RGSErreicht * myRGS.RGSArray[i].rgsMaxZahl);
				var rgsErreichtMitAuflagenRound = Math.floor(RGSErreichtMitAuflagen * myRGS.RGSArray[i].rgsMaxZahl);

				var rgsJetztZahl = Math.round(myRGS.RGSArray[i].rgsJetztZahl);

				var RGSFarbe = 'ColorRed';

				if (rgsJetztZahl < rgsErreichtMitAuflagenRound) {
					RGSFarbe = 'ColorRed';
				}
				else if (rgsJetztZahl >= rgsErreichtRound) {
					RGSFarbe = 'ColorGreen';
				}
				else{
					RGSFarbe = 'ColorYellow';
				}
				
				document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'Zahl').innerHTML = Math.round(myRGS.RGSArray[i].rgsJetztZahl) + '/' + Math.floor(myRGS.RGSArray[i].rgsMaxZahl);
				document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'Zahl').className = RGSFarbe;

				if (myRGS.RGSArray[i].rgsMaxZahl != 0) {
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'R').style.width = (rgsJetztZahl < rgsErreichtMitAuflagenRound ? rgsJetztZahl : rgsErreichtMitAuflagenRound) / myRGS.RGSArray[i].rgsMaxZahl * 100 + '%';
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'Y').style.width = (rgsJetztZahl < rgsErreichtRound ? (rgsJetztZahl < rgsErreichtMitAuflagenRound ? 0 : (rgsJetztZahl - rgsErreichtMitAuflagenRound)) : (rgsErreichtRound - rgsErreichtMitAuflagenRound)) / myRGS.RGSArray[i].rgsMaxZahl * 100 + '%';
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'G').style.width = (rgsJetztZahl >= rgsErreichtRound ? (getMinZahl(rgsJetztZahl, myRGS.RGSArray[i].rgsMaxZahl) - rgsErreichtRound) : 0) / myRGS.RGSArray[i].rgsMaxZahl * 100 + '%';
				}
				else {
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'R').style.width = '0%';
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'Y').style.width = '0%';
					document.getElementById('PBRGS' + myRGS.RGSArray[i].rgsno + 'G').style.width = '0%';
				}

			}
		}

		function setFBTHead() {
			var KPIAnchorTop = $('#KPIAnchor').offset().top;
			var windowScrollTop = $(window).scrollTop();
			var windowClientHeight = $(window).height();

			if (KPIAnchorTop >= windowScrollTop + windowClientHeight) {
			    document.getElementById('divFBTHeadFrage').innerHTML = Fragebogen_JS_Str15;
			    document.getElementById('divFBTHeadStichwort').innerHTML = Fragebogen_JS_Str16;
			    document.getElementById('divFBTHeadNachweis').innerHTML = Fragebogen_JS_Str17;
			}
			else if (KPIAnchorTop - 125 <= windowScrollTop) {
			    document.getElementById('divFBTHeadFrage').innerHTML = Fragebogen_JS_Str18;
			    document.getElementById('divFBTHeadStichwort').innerHTML = Fragebogen_JS_Str19;
			    document.getElementById('divFBTHeadNachweis').innerHTML = Fragebogen_JS_Str20;
			}
			else {
			    document.getElementById('divFBTHeadFrage').innerHTML = Fragebogen_JS_Str21;
			    document.getElementById('divFBTHeadStichwort').innerHTML = Fragebogen_JS_Str22;
			    document.getElementById('divFBTHeadNachweis').innerHTML = Fragebogen_JS_Str23;
			}
		}

		window.onscroll = function () {
			try {
				setFBTHead();
			}
			catch (e) {

			}
		}

		window.onresize = function () {
			try {
				setFBTHead();
			}
			catch (e) {

			}
		}

		function FBSpeichern(callback) {
			$('#divLoadingWrapper').fadeIn(200);
			myCallback = callback;
			doFBStatistik();
			frageAntwortSpeichernStep1();
		}

		function frageAntwortSpeichernStep1() {
			mySPZaehler = 0;
			mySPResultSet = new Array();

			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('Fragebogen');

			for (var i = 0; i < myFragebogen.FragebogenArray.length; i++) {
				if (myFragebogen.FragebogenArray[i].geaendert == 1) {
					var oListItem2;

					if (myFragebogen.FragebogenArray[i].FA.id == null) {
						var itemCreateInfo = new SP.ListItemCreationInformation();
						oListItem2 = oList.addItem(itemCreateInfo);

						oListItem2.set_item('fgno', myFragebogen.FragebogenArray[i].FA.fgno);
						oListItem2.set_item('fgFno', myFragebogen.FragebogenArray[i].EF.id);
						oListItem2.set_item('fgSno', myFragebogen.FragebogenArray[i].FA.fgSno.id);
					}
					else {
						oListItem2 = oList.getItemById(myFragebogen.FragebogenArray[i].FA.id);
					}

					oListItem2.set_item('fgPunkt', myFragebogen.FragebogenArray[i].FA.fgPunkt);
					oListItem2.set_item('fgIst', (myFragebogen.FragebogenArray[i].FA.fgIst == null ? "" : myFragebogen.FragebogenArray[i].FA.fgIst));
					oListItem2.set_item('fgKommentar', (myFragebogen.FragebogenArray[i].FA.fgKommentar == null ? "" : myFragebogen.FragebogenArray[i].FA.fgKommentar));

					oListItem2.update();

					clientContext.load(oListItem2);
					mySPResultSet.push(oListItem2);

					mySPZaehler++;
					if (mySPZaehler >= 220) {
						break;
					}
				}
			}

			if (mySPZaehler == 0) {
				FBStatistikSpeichernStep1();
			}
			else {
				clientContext.executeQueryAsync(Function.createDelegate(this, this.frageAntwortSpeichernStep2), Function.createDelegate(this, this.onQueryFailed));
			}
		}

		function frageAntwortSpeichernStep2() {
			for (var i = 0; i < mySPResultSet.length; i++) {
				for (var j = 0; j < myFragebogen.FragebogenArray.length; j++) {
					if (mySPResultSet[i].get_item('fgno') == myFragebogen.FragebogenArray[j].FA.fgno) {
						if (myFragebogen.FragebogenArray[j].FA.id == null) {
							myFragebogen.FragebogenArray[j].FA.id = mySPResultSet[i].get_id();
						}

						myFragebogen.FragebogenArray[j].geaendert = 0;
						break;
					}
				}
			}

			frageAntwortSpeichernStep1();
		}

		function FBStatistikSpeichernStep1() {
			mySPStatResultSet = new Array();

			var clientContext = new SP.ClientContext(siteUrl);
			var oList = clientContext.get_web().get_lists().getByTitle('Statistik');

			for (var i = 0; i < myStatistik.EFBSArray.length; i++) {
				var oListItem2;

				if (myStatistik.EFBSArray[i].id == null) {
					var itemCreateInfo = new SP.ListItemCreationInformation();
					oListItem2 = oList.addItem(itemCreateInfo);

					oListItem2.set_item('stSno', myStatistik.EFBSArray[i].stSno.id);
					oListItem2.set_item('stPillar', myStatistik.EFBSArray[i].stPillar.id);
					oListItem2.set_item('stRGS', myStatistik.EFBSArray[i].stRGS.id);
					oListItem2.set_item('stJahr', myStatistik.EFBSArray[i].stJahr);
				}
				else {
					oListItem2 = oList.getItemById(myStatistik.EFBSArray[i].id);
				}

				for (var j = 0; j < myKriterien.KriterienArray.length; j++) {
					oListItem2.set_item('K' + myKriterien.KriterienArray[j].id + 'Summe', myStatistik.EFBSArray[i]['K' + myKriterien.KriterienArray[j].id + 'Summe']);
					oListItem2.set_item('K' + myKriterien.KriterienArray[j].id + 'Anzahl', myStatistik.EFBSArray[i]['K' + myKriterien.KriterienArray[j].id + 'Anzahl']);
				}

				oListItem2.update();

				clientContext.load(oListItem2);
				mySPStatResultSet.push(oListItem2);
			}

			clientContext.executeQueryAsync(Function.createDelegate(this, this.FBStatistikSpeichernStep2), Function.createDelegate(this, this.onQueryFailed));
		}

		function FBStatistikSpeichernStep2() {
			for (var i = 0; i < myStatistik.EFBSArray.length; i++) {
				if (myStatistik.EFBSArray[i].id == null) {
					for (var j = 0; j < mySPStatResultSet.length; j++) {
						if (myStatistik.EFBSArray[i].stRGS.id == parseInt(mySPStatResultSet[j].get_item('stRGS').get_lookupId())) {
							myStatistik.EFBSArray[i].id = mySPStatResultSet[j].get_id();
							break;
						}
					}
				}
			}

			myFBGeaendert = false;

			$('#divLoadingWrapper').fadeOut(200);

			showInfoBox('erfolg', Fragebogen_JS_Str24);

			if (typeof (myCallback) === "function") {
				myCallback();
			}
		}

		function FBStatistikloeschenStep1() {
		    if (confirm(Fragebogen_JS_Str25)) {
				$('#divLoadingWrapper').fadeIn(200);
				var tmpFBStatLoeschen = new FBStatLoeschen(IJahr, ISno, IPillar.id, myStInitial, FBStatistikloeschenStep2);
			}
			else {
		        showInfoBox('warning', Fragebogen_JS_Str26);
			}
		}

		function FBStatistikloeschenStep2() {
			$('#divLoadingWrapper').fadeOut(200);
			showInfoBox('erfolg', Fragebogen_JS_Str27);
		}

		function seiteNeuLaden() {
			if (myFBGeaendert == true) {
			    if (confirm(Fragebogen_JS_Str28)) {
					FBSpeichern(doSeiteNeuLaden);
				}
				else {
					doSeiteNeuLaden();
				}
			}
			else {
				doSeiteNeuLaden();
			}
		}

		function doSeiteNeuLaden(){
			location.reload();
		}

		function FBDrucken() {
			window.open(location.href.replace(/Fragebogen.aspx/i, 'FragebogenDruck.aspx'));
		}

		function closeParentModal() {
			if (myFBGeaendert == true) {
			    if (confirm(Fragebogen_JS_Str29)) {
					FBSpeichern(doCloseParentModal);
				}
				else {
					doCloseParentModal();
				}
			}
			else {
				doCloseParentModal();
			}
		}

		function doCloseParentModal() {
			try {
				parent.window.$('#fragebogenModal').modal('hide');
			}
			catch (e) { }
		}

		function frageEinOderAus(tmpId) {
		    myFBGeaendert = true;

			var tmpFrage;

			for (var i = 0; i < myFragebogen.FragebogenArray.length; i++) {
				if (myFragebogen.FragebogenArray[i].EF.id == tmpId) {
					tmpFrage = myFragebogen.FragebogenArray[i];
					break;
				}
			}

			var obAnzeigen;

			var tmpRow = document.getElementById('FB' + tmpFrage.EF.id);

			var tmpTBodyFrom = tmpRow.parentNode;
			var tmpTBodyTo;

			tmpFrage.geaendert = 1;

			if (tmpFrage.FA.fgPunkt >= 0) { // ausblenden
				obAnzeigen = false;
				tmpFrage.FA.fgPunkt = -1;

				tmpTBodyTo = document.getElementById(tmpRow.parentNode.id + 'X');
				tmpTBodyTo.style.display = '';

				if (document.getElementById('TAE' + tmpTBodyTo.id).getAttribute('data-ae') == 'E') {
					tmpRow.style.display = 'none';
				}

				$('#FB' + tmpFrage.EF.id + ' .glyphicon').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open').attr('title', Fragebogen_JS_Str11);

				$('#TBFPunkt' + tmpFrage.EF.id).raty('readOnly', true);
				$('#TBFPunkt' + tmpFrage.EF.id + ' .raty-cancel').show();

				try{
					document.getElementById('TBFIst' + tmpFrage.EF.id).setAttribute('readonly', 'readonly');
				}
				catch (e) { }

				document.getElementById('TBFKommentar' + tmpFrage.EF.id).setAttribute('readonly', 'readonly');
			}
			else { // einblenden
				obAnzeigen = true;
				var tmpScore = $('#TBFPunkt' + tmpFrage.EF.id).raty('score');
				tmpFrage.FA.fgPunkt = tmpScore ? tmpScore : 0;

				tmpTBodyTo = document.getElementById(tmpRow.parentNode.id.replace('X', ''));

				$('#FB' + tmpFrage.EF.id + ' .glyphicon').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close').attr('title', Fragebogen_JS_Str10);

				if (tmpFrage.EF.editierbar) {
					$('#TBFPunkt' + tmpFrage.EF.id).raty('readOnly', false);

					try {
						document.getElementById('TBFIst' + tmpFrage.EF.id).removeAttribute('readonly');
					}
					catch (e) { }

					document.getElementById('TBFKommentar' + tmpFrage.EF.id).removeAttribute('readonly');
				}

			}

			tmpTBodyTo.appendChild(tmpRow);

			if (obAnzeigen == true) {
				if (tmpTBodyFrom.children.length == 1) {
					einOderAus(tmpTBodyFrom.id, 0);
					tmpTBodyFrom.style.display = 'none';
				}
			}

			doFBStatistik();

			setFBTHead();
			stripRows();
		}

	</script>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="width:1200px; height:83px;">
		<div class="navbar-header" id="bs-example-navbar-collapse-1" style="width:1200px;">
			<div class="nav navbar-nav" style="font-size:30px;font-weight:bold;float:left;width:70px;height:70px;margin:7px 10px 5px 10px;">
				<img src="image/FVP Logo.png" width="70" height="70" />
			</div>
			<div class="nav navbar-nav" style="font-size:30px;font-weight:bold;margin:0;padding-top:19px;float:left;"><script type="text/javascript">document.write(Fragebogen_HTML_Str1);</script></div>
			<div id="FBSnoJahrPillar" class="nav navbar-nav" style="margin:12px 5px 10px 25px;font-size:20px;font-weight:bold;color:#0091DC;float:left;"></div>
	
			<div id="FBHeaderRight" class="nav navbar-nav" style="margin-right: 6px;float:right;">
				<!-- Spaceholder for RGS Progress Bar -->
				<div class="btn-group" style="margin:23px 8px 23px 13px;float:left;">
					<button type="button" class="btn btn-primary" style="width:90px;height:34px;padding-top:4px;" onclick="FBSpeichern();"><script type="text/javascript">document.write(Fragebogen_HTML_Str2);</script></button>
					<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" style="height:34px;padding-top:7px;">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" onclick="FBDrucken();"><script type="text/javascript">document.write(Fragebogen_HTML_Str3);</script></a></li>
						<li class="divider"></li>
						<li><a href="#"onclick="seiteNeuLaden();"><script type="text/javascript">document.write(Fragebogen_HTML_Str4);</script></a></li>
						<li><a href="#" onclick="FBStatistikloeschenStep1();"><script type="text/javascript">document.write(Fragebogen_HTML_Str5);</script></a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<table class="table table-hover" id="fragebogenMainTable" style="width:1200px;background-color:#FEFEFE; ">
		<thead style="position: fixed; right: 0; left: 0; z-index: 1029;width:1200px;background-color:#FEFEFE; ">
			<tr>
				<th style="padding-left:20px;"><div style="width:21px;"><script type="text/javascript">document.write(Fragebogen_HTML_Str6);</script></div></th>
				<th><div style="width:70px;"><script type="text/javascript">document.write(Fragebogen_HTML_Str7);</script></div></th>
				<th><div id="divFBTHeadFrage" style="width:329px;"><script type="text/javascript">document.write(Fragebogen_JS_Str15);</script></div></th>
				<th style="width:142px;padding-left:37px;"><script type="text/javascript">document.write(Fragebogen_HTML_Str8);</script></th>
				<th style="text-align:center;"><div style="width:26px;"><script type="text/javascript">document.write(Fragebogen_HTML_Str9);</script></div></th>
				<th><div id="divFBTHeadStichwort" style="width:160px;"><script type="text/javascript">document.write(Fragebogen_JS_Str16);</script></div></th>
				<th><div id="divFBTHeadNachweis" style="width:160px;"><script type="text/javascript">document.write(Fragebogen_JS_Str17);</script></div></th>
				<th><div style="width:168px;"><script type="text/javascript">document.write(Fragebogen_HTML_Str10);</script></div></th>
			</tr>
		</thead>
			  
		<tbody id="leerTBody">
		<tr><th style="border:none;">&nbsp;</th></tr>
		</tbody>
							
	</table>

	<br />

	<div id="divLoadingWrapper">
		<div class="myModal-backdrop"></div>
		<div class="myModal-body">
			<div style="float:left;"><img src="image/loading.gif" alt="Please Wait..." /></div><div style="float:left; line-height:25px;">&nbsp;&nbsp;&nbsp;<script type="text/javascript">document.write(Fragebogen_HTML_Str11);</script></div>
		</div>
	</div>

	<div id="divAlertWrapper" style="color:Black; z-index: 10002; position: fixed; top: 88px; right:3px; display:none;">
		<div id="divAlertContent" style="height:20px; margin-top:5px; font-size:15px; padding:0 23px 0 23px;">Erfolg!</div>
	</div>

	<SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
</body>

</html>

