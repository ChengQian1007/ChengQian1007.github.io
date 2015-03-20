<%@ Assembly Name="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%> 
<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WikiEditPage" MasterPageFile="/default.master" meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full"       %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" 
  Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" 
  Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" 
  Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/ecmascript" src="JS/SP.Core.Debug.js" />
	<script type="text/ecmascript" src="JS/SP.Debug.js" />
	<script type="text/ecmascript" src="JS/SP.Runtime.Debug.js" />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
	
<body style="margin:0; width:1276px;">
	<link rel="stylesheet" type="text/css" href="css/Evaluation.css" />

	<style type="text/css">
		#kriterienPillarRGSInfoTable {
			text-align: center;
		}

		#kriterienPillarRGSInfoTable thead tr td {
			font-weight: bold;
		}

	    #kriterienPillarRGSInfoTable tr td {
	        padding: 5px 15px 5px 15px;
	    }
	</style>

	<script type="text/javascript" src="JS/Konfiguration.js"></script>
	<script type="text/javascript" src="JS/Evaluation.js"></script>

	<script type="text/ecmascript">
		$(document).ready(function () {
			ExecuteOrDelayUntilScriptLoaded(programmStart, "SP.js");
		});

		var IJahr;
		var ISno;

		var myEinEJahr;
		var myPillar;
		var myRGS;
		var myKriterien;

		var myInitialStatStr;

		var allMyStruktur;
		var myStruktur;

		var myPillarInStr;
		var myStatistikInfo;

		var myEKPIStat;
		var myEKPIStatInfo;

		var pillarFarbe = new Array();

		pillarFarbe.push({ pId: 1, pKurz: EPlan_JS_Str1, pFarbe: '#00b0f0', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 2, pKurz: EPlan_JS_Str2, pFarbe: '#ffff00', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 3, pKurz: EPlan_JS_Str3, pFarbe: '#ffc000', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 4, pKurz: EPlan_JS_Str4, pFarbe: '#ccffcc', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 5, pKurz: EPlan_JS_Str5, pFarbe: '#00ffff', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 6, pKurz: EPlan_JS_Str6, pFarbe: '#002060', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 7, pKurz: EPlan_JS_Str7, pFarbe: '#7030a0', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 8, pKurz: EPlan_JS_Str8, pFarbe: '#9fa4a4', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 9, pKurz: EPlan_JS_Str9, pFarbe: '#c4eaff', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 10, pKurz: EPlan_JS_Str10, pFarbe: '#ff0000', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });
		pillarFarbe.push({ pId: 11, pKurz: EPlan_JS_Str11, pFarbe: '#00b050', K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, K6: {}, K7: {}, K8: {} });

		function getPillarInPFById(tmpPId) {
			for (var i = 0; i < pillarFarbe.length; i++) {
				if (pillarFarbe[i].pId == tmpPId) {
					return pillarFarbe[i];
				}
			}

			return false;
		}

		function programmStart() {
			if (checkURIInput(getQueryString('jahr'), getQueryString('pid'), getQueryString('sno'))) {
				IJahr = parseInt(getQueryString('jahr'));
				ISno = getQueryString('sno');
			}
			else {
				alert(cockpit_JS_Str1);
				return false;
			}

			document.getElementById('divdepartment').innerHTML = ISno;
			document.getElementById('divstandbisdatum').innerHTML = returnJetzt();
			document.getElementById('footNoteTd1').innerHTML = ISno;

			myEinEJahr = new EinEJahr(null, IJahr, null);
			myEinEJahr.ladeByJahr(prozessJahrAlias);
		}

		function prozessJahrAlias() {
		    document.getElementById('divtitle').innerHTML += myEinEJahr.EJAlias;

		    myPillar = new Pillar(filterPillar);
		}

		function filterPillar() {
			if (getQueryString('pid').toUpperCase() == 'ALLE') {
				document.getElementById('divPillar').innerHTML += cockpit_JS_Str10;
			}
			else {
				for (var i = myPillar.PillarArray.length - 1; i >= 0; i--) {
					if (myPillar.PillarArray[i].id != parseInt(getQueryString('pid'))) {
						myPillar.PillarArray.splice(i, 1);
					}
					else {
						document.getElementById('divPillar').innerHTML += myPillar.PillarArray[i].pName;
					}
				}
			}

			if (myPillar.PillarArray.length == 0) {
				alert(cockpit_JS_Str2);
				return false;
			}

			myRGS = new RGS(loadKriterien);
		}

		function loadKriterien() {
			myKriterien = new Kriterien(filterKriterien);
		}

		function filterKriterien() {
			for (var i = 0; i < myKriterien.KriterienArray.length; i++) {
				if (myKriterien.KriterienArray[i].id == 6) {
					myEKPIStat = myKriterien.KriterienArray[i];
					myKriterien.KriterienArray.splice(i, 1);
					break;
				}
			}

			if (myKriterien.KriterienArray.length == 0 || myRGS.RGSArray.length == 0) {
				alert(cockpit_JS_Str3);
				return false;
			}

			constructInitialStat();
		}

		function constructInitialStat() {
			// Anzahl der beantwortet Fragebogen / Ob beantwortete Fragebogen eines Pillars in einer Abteilung
			var ABFStr = ', ABF:0, OBF:false';

			// Eben 4: Stat
			var statObjStr = '{Summe:0, Anzahl:0}';

			// Eben 3: Kriterium
			var kriterienObjStr = '';
			for (var i = 0; i < myKriterien.KriterienArray.length; i++) {
				kriterienObjStr += 'K' + myKriterien.KriterienArray[i].id + ':' + statObjStr + ',';
			}
			kriterienObjStr = '{' + kriterienObjStr.substring(0, kriterienObjStr.length - 1) + '}';

			// Eben 2: RGS // construct myEKPIStat
			var tmpEKPIStatStr = '';
			var rgsObjStr = '';
			for (var i = 0; i < myRGS.RGSArray.length; i++) {
				rgsObjStr += 'R' + myRGS.RGSArray[i].id + ':' + kriterienObjStr + ',';
				tmpEKPIStatStr += 'R' + myRGS.RGSArray[i].id + ':' + '{Summe:0, Anzahl:0, OBF:false}' + ',';
			}
			rgsObjStr = '{' + rgsObjStr.substring(0, rgsObjStr.length - 1) + ABFStr + '}';

			// initial myEKPIStat
			myEKPIStat.kStat = eval('({' + tmpEKPIStatStr.substring(0, tmpEKPIStatStr.length - 1) + '})');

			// Eben 1: Pillar // construct myPillarInStr
			var pillarObjStr = '';
			myPillarInStr = '<Values>';
			for (var i = 0; i < myPillar.PillarArray.length; i++) {
				pillarObjStr += 'P' + myPillar.PillarArray[i].id + ':' + rgsObjStr + ',';
				myPillarInStr += '<Value Type=\'Lookup\'>' + myPillar.PillarArray[i].id + '</Value>';
			}
			pillarObjStr = '{' + pillarObjStr.substring(0, pillarObjStr.length - 1) + '}';
			myPillarInStr += '</Values>';

			myInitialStatStr = '(' + pillarObjStr + ')';

			loadMyStruktur();
		}

		function loadMyStruktur() {
			myStruktur = new StrukturForStat(ISno, myInitialStatStr, loadEKPI);
		}

		function loadEKPI() {
			if (getQueryString('pid').toUpperCase() == 'ALLE') {
				myEKPIStatInfo = new getEKPIStat(IJahr, myEKPIStat, loadStatistik);
			}
			else {
				loadStatistik();
			}
		}

		function loadStatistik() {
			myStatistikInfo = new getStatistik(IJahr, myPillarInStr, myKriterien, myStruktur, ISno, loadCockpit);
		}

		function loadCockpit() {
			var tmpSetOnceB = 0;
			var tmpSetOnceE = false;

			for (var SI = 0; SI < myStruktur.SEArray.length; SI++) {
				if (myStruktur.SEArray[SI].sno != ISno) {
					continue;
				}

				for (var RI = 0; RI < myRGS.RGSArray.length; RI++) {
					var tmpKriterienStat = eval(obj2str(myKriterien.KriterienArray));

					for (var PI = 0; PI < myPillar.PillarArray.length; PI++) {
						for (var KI = 0; KI < tmpKriterienStat.length; KI++) {
							var theStat = myStruktur.SEArray[SI].sStat['P' + myPillar.PillarArray[PI].id]['R' + myRGS.RGSArray[RI].id]['K' + tmpKriterienStat[KI].id];

							var tmpABF = myStruktur.SEArray[SI].sStat['P' + myPillar.PillarArray[PI].id]['ABF'];

							tmpKriterienStat[KI].kStat.Summe += (tmpABF == 0 ? 0 : theStat.Summe / tmpABF);
							tmpKriterienStat[KI].kStat.Anzahl += (tmpABF == 0 ? 0 : theStat.Anzahl / tmpABF);

							getPillarInPFById(myPillar.PillarArray[PI].id)['K' + tmpKriterienStat[KI].id]['R' + myRGS.RGSArray[RI].id] = { Summe: (tmpABF == 0 ? 0 : theStat.Summe / tmpABF), Anzahl: (tmpABF == 0 ? 0 : theStat.Anzahl / tmpABF) };
						}
					}

					var tmpRGSSummeB = 0;
					var tmpRGSAnzahlB = 0;

					var tmpRGSSummeE = 0;
					var tmpRGSAnzahlE = 0;

					var tmpF;

					if (getQueryString('pid').toUpperCase() == 'ALLE' && myStruktur.SEArray[SI].sLayer == 1) {
						var tmpEKPIRGSStat;
						var tmpEKPIRGSIndex = RI;

						do {
							if (tmpEKPIRGSIndex < 0) {
								break;
							}
							tmpEKPIRGSStat = myEKPIStat.kStat['R' + myRGS.RGSArray[tmpEKPIRGSIndex].id];
							tmpEKPIRGSIndex--;
						} while (tmpEKPIRGSStat['OBF'] == false);

						tmpRGSSummeE += tmpEKPIRGSStat.Summe;
						tmpRGSAnzahlE += tmpEKPIRGSStat.Anzahl;
					}

					for (var i = 0; i < tmpKriterienStat.length; i++) {
						if (myStruktur.SEArray[SI].sLayer > 1 && tmpKriterienStat[i].id == 7) {
							continue;
						}

						if (tmpKriterienStat[i].id < 6) {
							tmpRGSSummeB += tmpKriterienStat[i].kStat.Summe;
							tmpRGSAnzahlB += tmpKriterienStat[i].kStat.Anzahl;
							tmpF = 1;
						}
						else {
							tmpRGSSummeE += tmpKriterienStat[i].kStat.Summe;
							tmpRGSAnzahlE += tmpKriterienStat[i].kStat.Anzahl;

							tmpF = 3 / 7 * tmpRGSAnzahlB / tmpRGSAnzahlE;
						}

						var tmpKSumme = (tmpKriterienStat[i].kStat.Anzahl == 0 ? '-' : Math.round(tmpKriterienStat[i].kStat.Summe * tmpF));
						var tmpMaxPunkt = (tmpKriterienStat[i].kStat.Anzahl == 0 ? '-' : Math.round(tmpKriterienStat[i].kStat.Anzahl * 3 * tmpF));

						pushAKriterienRGS(tmpKriterienStat[i].id, myRGS.RGSArray[RI].rgsno, tmpKSumme, tmpMaxPunkt, '');

						if (myPillar.PillarArray.length == 1 && myStruktur.SEArray[SI].sStat['P' + myPillar.PillarArray[0].id]['OBF'] && tmpSetOnceB < 6) {
							setKTitelOnClick(tmpKriterienStat[i].id);
							tmpSetOnceB++;
						}

						if (myPillar.PillarArray.length == 1 && myStruktur.SEArray[SI].sLayer == 1) {
							setKTitelOnClickToKommentar(tmpKriterienStat[i].id);
						}

						if (getQueryString('pid').toUpperCase() == 'ALLE' && myStruktur.SEArray[SI].sLayer == 1) {
							 setKTitelOnClickShowPillarDetail(tmpKriterienStat[i].id);
						}
					}

					if (getQueryString('pid').toUpperCase() == 'ALLE' && myStruktur.SEArray[SI].sLayer == 1) {
						tmpF = 3 / 7 * tmpRGSAnzahlB / tmpRGSAnzahlE;
						
						var tmpKSumme2 = (tmpEKPIRGSStat.Anzahl == 0 ? '-' : Math.round(tmpEKPIRGSStat.Summe * tmpF));
						var tmpMaxPunkt3 = (tmpEKPIRGSStat.Anzahl == 0 ? '-' : Math.round(tmpEKPIRGSStat.Anzahl * 3 * tmpF));

						document.getElementById('K6TitleForNon').style.display = 'none';

						pushAKriterienRGS(6, myRGS.RGSArray[RI].rgsno, tmpKSumme2, tmpMaxPunkt3, tmpEKPIRGSIndex == RI - 1 ? '' : cockpit_JS_Str7);

						if (tmpSetOnceE == false) {
							setEKPIOnClick();
							tmpSetOnceE = true;
						}
					}

					var tmpELinie2 = 3 * RGSErreicht;
					var tmpEMALinie2 = 3 * RGSErreichtMitAuflagen;

					var wieGutB = tmpRGSAnzahlB == 0 ? -1 : tmpRGSSummeB / tmpRGSAnzahlB;
					var wieGutE = tmpRGSAnzahlE == 0 ? -1 : tmpRGSSummeE / tmpRGSAnzahlE;
					var wieGutW;

					var tmpRGSSollSummeRound;

					if (myStruktur.SEArray[SI].sLayer <= 1 && wieGutE != -1) {
						wieGutW = (wieGutB == -1 && wieGutE == -1) ? -1 : 0.7 * getMaxZahl(wieGutB, 0) + 0.3 * getMaxZahl(wieGutE, 0);

						tmpRGSSollSummeRound = tmpRGSAnzahlB == 0 ? '-' : Math.round(tmpRGSAnzahlB * 3 / 0.7); // AnzahlB==0 aber AnzahlE!=0 ?

						document.getElementById('K7TitleForNon').style.display = 'none';
					}
					else {
						wieGutW = wieGutB == -1 ? -1 : wieGutB;

						tmpRGSSollSummeRound = tmpRGSAnzahlB == 0 ? '-' : Math.round(tmpRGSAnzahlB * 3);
					}

					var tmpColor2;
					if (wieGutW == -1) {
						tmpColor2 = '#C3C3C3';
					}
					else if (wieGutW < tmpEMALinie2) {
						tmpColor2 = '#D9534F';
					}
					else if (wieGutW >= tmpEMALinie2 && wieGutW < tmpELinie2) {
						tmpColor2 = '#F0AD4D';
					}
					else {
						tmpColor2 = '#5CB85C';
					}

					pushAEERGS(myRGS.RGSArray[RI].rgsno, isNaN(tmpRGSSollSummeRound) ? '-' : Math.round(tmpRGSSollSummeRound * wieGutW / 3), tmpRGSSollSummeRound, tmpColor2, isNaN(tmpRGSSollSummeRound) ? '-' : (Math.round(1000 * Math.round(tmpRGSSollSummeRound * wieGutW / 3) / tmpRGSSollSummeRound) / 10 + '%'), '');
				}
			}

			repositionTitel();

			if (parseInt(getQueryString('print')) == 1) {
				document.getElementById('divLoadingWrapper').style.display = 'none';
				druckenMich();
			}
			else {
				$('#divLoadingWrapper').fadeOut(200);
			}


		}

		function pushAKriterienRGS(KId, RGSNo, punktErreicht, MaxPunkt, bemerkung) {
			document.getElementById('K' + KId + 'RGSWraper').innerHTML += '<div id="K' + KId + 'RGS' + RGSNo + '" class="KRGS">' + cockpit_JS_Str4 + RGSNo + cockpit_JS_Str5 + setStrToSameLength(punktErreicht, 5) + cockpit_JS_Str6 + setStrToSameLength(MaxPunkt, 5) + bemerkung + '</div>';
		}

		function pushAEERGS(RGSNo, punktErreicht, MaxPunkt, tmpColor, tmpWieGut, tmpWieGutColor) { // Evaluationsergebnis RGS
			document.getElementById('divCockpitRGSErgebnisWraper').innerHTML += '<div id="divCockpitRGS' + RGSNo + 'Container" class="divCockpitRGSContainer"><div id="ERGS' + RGSNo + '" class="ERGSTitle">' + cockpit_JS_Str8 + RGSNo + '</div><div id="ERGS' + RGSNo + 'InhaltWraper" class="ERGSInhalt"><div id="ERGS' + RGSNo + 'ZahlIst" class="ERGSInhaltZahlIst" style="background-color:' + tmpColor + '\;">' + punktErreicht + '</div><div id="ERGS' + RGSNo + 'Von" class="ERGSInhaltVon">' + cockpit_JS_Str9 + '</div><div id="ERGS' + RGSNo + 'ZahlSoll" class="ERGSInhaltZahlSoll">' + MaxPunkt + '</div></div><div id="ERGSWG' + RGSNo + '" class="ERGSWieGut">' + tmpWieGut + '</div></div>';
		}

		function setStrToSameLength(IStr, ILength) {
			var OStr = IStr + '';
			ILength = parseInt(ILength);

			var lengthDiff = ILength - OStr.length;

			if (lengthDiff > 0) {
				for (var i = 0; i < lengthDiff; i++) {
					OStr += '&nbsp;';
				}
			}
			else if (lengthDiff < 0) {
				OStr = OStr.substring(0, ILength - 3) + '...';
			}

			return OStr;
		}

		function repositionTitel() {
			var tmpKIdArray = new Array(2, 5, 6, 7, 3, 8);
			for (var i = 0; i < tmpKIdArray.length; i++) {
				var KId = tmpKIdArray[i];
				var tmpPaddingTop = ($('#divCockpitKriterien' + KId).height() - $('#K' + KId + 'RGSWraper').height() - $('#K' + KId + 'Title').height()) / 2 + 'px';
				document.getElementById('K' + KId + 'Title').style.paddingTop = tmpPaddingTop;
			}
		}

		function setEKPIOnClick() {
			var tmpTitel = document.getElementById('K6Title');
			tmpTitel.style.cursor = 'pointer';
			tmpTitel.onclick = function () { try { parent.window.$('#cockpitModal').modal('hide'); parent.document.getElementById('GoFragebogenErgebnisKPI').click(); } catch (e) { } };
		}

		function setKTitelOnClick(KId) {
			var tmpTitel = document.getElementById('K' + KId + 'Title');
			tmpTitel.style.cursor = 'pointer';
			tmpTitel.onclick = function () { try { parent.window.$('#cockpitModal').modal('hide'); parent.document.getElementById('fragebogenIframe').src = 'Fragebogen.aspx?jahr=' + IJahr + '&sno=' + ISno + '&pid=' + myPillar.PillarArray[0].id + '&kid=' + KId + (parent.window.isAdministrator == 1 ? '&admin=ja' : ''); parent.window.$('#fragebogenModal').modal('show'); } catch (e) { } };
		}

		function setKTitelOnClickToKommentar(KId) {
			var tmpTitel = document.getElementById('K' + KId + 'Title');
			tmpTitel.style.cursor = 'pointer';
			tmpTitel.onclick = function () { try { parent.window.$('#cockpitModal').modal('hide'); parent.document.getElementById('kommentarIframe').src = 'FBAuswertung.aspx?jahr=' + IJahr + '&pid=' + myPillar.PillarArray[0].id + '&kid=' + KId + (parent.window.isAdministrator == 1 ? '&admin=ja' : ''); parent.window.$('#kommentarModal').modal('show'); } catch (e) { } };
		}

		function setKTitelOnClickShowPillarDetail(KId) {
			var tmpTitel = document.getElementById('K' + KId + 'Title');
			tmpTitel.style.cursor = 'pointer';
			tmpTitel.onclick = new Function('showPillarRGSInfoByKriterien(' + KId + ');');
		}

		function showPillarRGSInfoByKriterien(tmpKId) {
		    var tmpStr = '<b style="line-height: 30px; text-decoration: underline;">' + myKriterien.getKriterium(tmpKId).kName + '</b>';
			document.getElementById('divPillarDetailTableWrapper').innerHTML = tmpStr;

			var tmpTable = document.createElement('table');
			tmpTable.id = 'kriterienPillarRGSInfoTable';
			tmpTable.style.margin = 'auto';

			var tmpTHead = tmpTable.createTHead();
			var tmpRow = tmpTHead.insertRow(0);
			
			var tmpCell = tmpRow.insertCell(tmpRow.cells.length);
			tmpCell.innerHTML = '&nbsp;';

			for (var i = 0; i < myRGS.RGSArray.length; i++) {
				var tmpCell = tmpRow.insertCell(tmpRow.cells.length);
				tmpCell.innerHTML = cockpit_JS_Str4 + ' ' + myRGS.RGSArray[i].rgsno;
			}

			var tmpTBody = tmpTable.createTBody();
			
			for (var i = 0; i < pillarFarbe.length; i++) {
				var tmpRow = tmpTBody.insertRow(tmpTBody.rows.length);

				var tmpCell = tmpRow.insertCell(tmpRow.cells.length);
				tmpCell.style.fontWeight = 'bold';
				tmpCell.innerHTML = pillarFarbe[i].pKurz;

				for (var j = 0; j < myRGS.RGSArray.length; j++) {
					var tmpPillarRGSStat = pillarFarbe[i]['K' + tmpKId]['R' + myRGS.RGSArray[j].id];

					var tmpSumme = tmpPillarRGSStat.Summe;
					var tmpAnzahl = tmpPillarRGSStat.Anzahl;

					var tmpWieGut = tmpAnzahl == 0 ? -1 : (tmpSumme / (tmpAnzahl * 3));

					var tmpColor = '';
					if (tmpWieGut == -1) {
						tmpColor = '#C3C3C3';
					}
					else if (tmpWieGut < RGSErreichtMitAuflagen) {
						tmpColor = '#D9534F';
					}
					else if (tmpWieGut >= RGSErreichtMitAuflagen && tmpWieGut < RGSErreicht) {
						tmpColor = '#F0AD4D';
					}
					else {
						tmpColor = '#5CB85C';
					}

					var tmpCell = tmpRow.insertCell(tmpRow.cells.length);
					tmpCell.innerHTML = tmpWieGut == -1 ? '-' : (Math.round(tmpSumme * 10) / 10 + ' / ' + Math.round(tmpAnzahl * 3 * 10) / 10);
					tmpCell.style.backgroundColor = tmpColor;
					tmpCell.style.cursor = 'pointer';
					tmpCell.onclick = new Function('window.open("FBAuswertung.aspx?jahr=' + IJahr + '&pid=' + pillarFarbe[i].pId + '&kid=' + tmpKId + '&rgs=' + myRGS.RGSArray[j].id + '");');
				}
			}

			document.getElementById('divPillarDetailTableWrapper').appendChild(tmpTable);

			document.getElementById('divPillarDetailModalWrapper').style.display = '';
		}

		function druckenMich() {
			if (window.ActiveXObject) {
				var hkey_root = "HKEY_CURRENT_USER";
				var hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
				var hkey_key;

				var RegWsh = new ActiveXObject("WScript.Shell");
				hkey_key = "header";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
				hkey_key = "footer";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
				hkey_key = "margin_bottom";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.35433");
				hkey_key = "margin_left";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.86614");
				hkey_key = "margin_right";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.35433");
				hkey_key = "margin_top";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.35433");
				hkey_key = "Print_Background";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "yes");
				hkey_key = "Shrink_To_Fit";
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "yes");

				document.all.WebBrowser.ExecWB(8, 1);

				window.print();

				// document.all.WebBrowser.ExecWB(45, 1);

			} else if (document.implementation && document.implementation.createDocument) {
				window.print();
				window.close();
			}
		}

	</script>

	<div id="divAllWraper">
		<div id="divlogo">
			<img id="festoLogo" alt="FESTO" src="image/festoLogo.jpeg" height="21"/>
		</div>
		<div id="divheadline"></div>

		<div id="divinhaltwraper">
			<div id="divtitle"><script type="text/javascript">document.write(cockpit_HTML_Str1);</script>&nbsp;</div>

			<div id="divdescription">
				<div id="divdepartment">&nbsp;</div>
				<div id="divstandbistitle"><script type="text/javascript">document.write(cockpit_HTML_Str2);</script></div>
				<div id="divstandbisdatum">&nbsp;</div>
				<div id="divPillarTitle"><script type="text/javascript">document.write(cockpit_HTML_Str3);</script></div>
				<div id="divPillar"></div>
			</div>

			<div id="divCockpitMain">
				<div id="divCockpitWraper">
					<div id="divCockpitEFQMWrapper">
						<div id="divCockpitEFQMBefaehigerWrapper">
							<div id="divCockpitEFQMBefaehigerArrow">
								<script type="text/javascript">document.write(cockpit_HTML_Str4);</script>
							</div>
							<div id="divCockpitEFQMBefaehigerKriterienWrapper">
								<div id="divCEFQMBKCol1">
									<div id="divCockpitKriterien1">
										<div id="K1Title" class="RowBig">
											<script type="text/javascript">document.write(cockpit_HTML_Str5);</script>
										</div>
										<div id="K1RGSWraper" class="RGSWraper"></div>
									</div>
								</div>
								<div id="divCEFQMBKCol2">
									<div id="divCockpitKriterien2">
										<div id="K2Title" class="RowSmallB">
											<script type="text/javascript">document.write(cockpit_HTML_Str6);</script>
										</div>
										<div id="K2RGSWraper" class="RGSWraper"></div>
									</div>
									<div id="divCockpitKriterien5">
										<div id="K5Title" class="RowSmallB">
											<script type="text/javascript">document.write(cockpit_HTML_Str7);</script>
										</div>
										<div id="K5RGSWraper" class="RGSWraper"></div>
									</div>
									<div id="divCockpitKriterien3">
										<div id="K3Title" class="RowSmallBS">
											<script type="text/javascript">document.write(cockpit_HTML_Str8);</script>
										</div>
										<div id="K3RGSWraper" class="RGSWraper"></div>
									</div>
								</div>
								<div id="divCEFQMBKCol3">
									<div id="divCockpitKriterien4">
										<div id="K4Title" class="RowBig">
											<script type="text/javascript">document.write(cockpit_HTML_Str9);</script>
										</div>
										<div id="K4RGSWraper" class="RGSWraper"></div>
									</div>
								</div>
							</div>
						</div>
						<div id="divCockpitEFQMErgebnisWrapper">
							<div id="divCockpitEFQMErgebnisArrow">
								<script type="text/javascript">document.write(cockpit_HTML_Str10);</script>
							</div>
							<div id="divCockpitEFQMErgebnisKriterienWrapper">
								<div id="divCockpitKriterien6">
									<div id="K6Title" class="RowSmallE">
										<script type="text/javascript">document.write(cockpit_HTML_Str11);</script>
										<div id="K6TitleForNon" style="font-weight:normal; font-size:16px;">
											<script type="text/javascript">document.write(cockpit_HTML_Str12);</script>
										</div>
									</div>
									<div id="K6RGSWraper" class="RGSWraper"></div>
								</div>
								<div id="divCockpitKriterien7">
									<div id="K7Title" class="RowSmallE">
										<script type="text/javascript">document.write(cockpit_HTML_Str13);</script>
										<div id="K7TitleForNon" style="font-weight:normal; font-size:16px;">
											<script type="text/javascript">document.write(cockpit_HTML_Str14);</script>
										</div>
									</div>
									<div id="K7RGSWraper" class="RGSWraper"></div>
								</div>
								<div id="divCockpitKriterien8">
									<div id="K8Title" class="RowSmallES">
										<script type="text/javascript">document.write(cockpit_HTML_Str15);</script>
									</div>
									<div id="K8RGSWraper" class="RGSWraper"></div>
								</div>
							</div>
						</div>
					</div>
					<div id="divCockpitVBar">
						<div id="divCockpitVBarInner">
						</div>
					</div>
					<div id="divCockpitRGSErgebnis">
						<div id="divCockpitRGSErgebnisWraper">
							<div id="divCockpitRGSTitleContainer" class="divCockpitRGSContainer">
								<div class="ERGSTitle">
									&nbsp;
								</div>
								<div id="EvaErgebnisTitle" class="ERGSInhalt">
									<script type="text/javascript">document.write(cockpit_HTML_Str16);</script>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> 
			<div id="Notizen"><script type="text/javascript">document.write(cockpitNotizen);</script></div> 
		</div>     
		<div id="divfootline"></div>  
		<table id="footNote" width="100%"><tr><td id="footNoteTd1">&nbsp;</td><td id="footNoteTd2"><script type="text/javascript">document.write(cockpit_HTML_Str17);</script></td><td id="footNoteTd3"><script type="text/javascript">document.write(cockpit_HTML_Str18);</script></td></tr></table>                                                                                                                                    
	</div>

	<SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>

	<object id="WebBrowser" width="0" height="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>

	<div id="divLoadingWrapper">
		<div class="myModal-backdrop"></div>
		<div class="myModal-body">
			<div style="float:left;"><img src="image/loading.gif" alt="Please Wait..." /></div><div style="float:left; line-height:25px;">&nbsp;&nbsp;&nbsp;<script type="text/javascript">document.write(cockpit_HTML_Str19);</script></div>
		</div>
	</div>

	<div id="divPillarDetailModalWrapper" style="display:none; text-align: center;">
		<div class="myModal-backdrop" onclick="document.getElementById('divPillarDetailModalWrapper').style.display='none';"></div>
		<div id="divPillarDetailTableWrapper" class="myModal-body" style="margin-top: -213px; margin-left: -160px;">
			&nbsp;
		</div>
	</div>
</body>

</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Evaluation Cockpit</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Evaluation Cockpit
</asp:Content>