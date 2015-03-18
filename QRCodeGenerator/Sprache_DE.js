/*==========================================================================

    Projekt: Evaluation
    Datei: Sprache_DE.js
    Sprach: Deutsch
    Verfasser: Cheng Qian
    Datum: 30.09.2014

==========================================================================*/

/*==========================================================================

    Please translate the words or sentences in '' (the red text). 
    The green text are comments and you don't need to translate them.
    
    ========================================================================
    
    For example:
    
    var index_JS_Str1 = 'Zur Admin Seite';
    --->
    var index_JS_Str1 = 'To admin page';

    ========================================================================

    And, you don't need to translate the HTML Tags,
    such as <b>, <li>, </b>, </li> and so on, and &nbsp;.

    ========================================================================

    The {%0%} is space holder, you can move it to the right place 
    in the sentence in your language.

    For example:
    var example = 'Es existiert keine Abteilung mit diesem Namen: {%0%}!';
    --->
    var example = 'Department {%0%} does not exist!';

    =========================================================================

    If you need to use the symbol ', please use \' instead!

    For example:
    
    var example = 'Es existiert keine Abteilung mit diesem Namen: {%0%}!';
    --->
    var example = 'Department {%0%} doesn\'t exist!';

    =========================================================================
    
    If you have any technical problem, please contact me!
    
    Email: chqi@de.festo.com

===========================================================================*/


// Month
var monthname = new Array(12);
monthname[0] = 'Januar';
monthname[1] = 'Februar';
monthname[2] = 'März';
monthname[3] = 'April';
monthname[4] = 'Mai';
monthname[5] = 'Juni';
monthname[6] = 'Juli';
monthname[7] = 'August';
monthname[8] = 'September';
monthname[9] = 'Oktober';
monthname[10] = 'November';
monthname[11] = 'Dezember';



var punktKommentar = new Array();

punktKommentar.push('0 - keine Nachweise');
punktKommentar.push('1 - einzelne Nachweise vorhanden in weniger als der Hälfte der relevanten Bereiche');
punktKommentar.push('2 - Nachweise in mehr als der Hälfte der relevanten Bereiche vorhanden');
punktKommentar.push('3 - Nachweise in allen relevanten Bereichen vorhanden');
punktKommentar.push('4 - Best Practice Vorschlag, Bedarf der Zustimmung durch MISI');




/* =================================================
Start: Evaluation.js
==================================================*/

// JS

var EJS_JS_Str1 = 'Es ist keine Abteilung mit dem eingegebenen Namen vorhanden!';
var EJS_JS_Str2 = 'Es wurden noch keine Abteilungen eingepflegt!';
var EJS_JS_Str3 = EJS_JS_Str2;
var EJS_JS_Str4 = 'Es wurden noch keine Abteilungen eingepflegt! Bitte benutzen Sie die Hauptseite!';
var EJS_JS_Str5 = EJS_JS_Str2;
var EJS_JS_Str6 = EJS_JS_Str4;
var EJS_JS_Str7 = 'Es gibt kein Pillar mit eingegebener ID!';
var EJS_JS_Str8 = 'Pillar wurde noch nicht erstellt!';
var EJS_JS_Str9 = 'Kriterium wurde noch nicht erstellt!';
var EJS_JS_Str10 = 'Keine RGS vorhanden!';
var EJS_JS_Str11 = 'Keine Rolle vorhanden!';
var EJS_JS_Str12 = 'Keine Frage in diesem Fragebogen vorhanden!';
var EJS_JS_Str13 = 'Es wurde keine Rolle zu dieser Frage definiert!';
var EJS_JS_Str14 = 'Ganz neue Fragebogen!';
var EJS_JS_Str15 = EJS_JS_Str14;
var EJS_JS_Str16 = EJS_JS_Str12;
var EJS_JS_Str17 = EJS_JS_Str13;
var EJS_JS_Str18 = EJS_JS_Str14;
var EJS_JS_Str19 = EJS_JS_Str12;
var EJS_JS_Str20 = EJS_JS_Str13;
var EJS_JS_Str21 = 'Für diese Rolle existiert keine Frage in diesem Pillar!';
var EJS_JS_Str22 = EJS_JS_Str14;
var EJS_JS_Str23 = 'Die Frage wurde noch nicht beantwortet!';
var EJS_JS_Str24 = 'Es ist noch keine Statistik vorhanden!';
var EJS_JS_Str25 = EJS_JS_Str24;
var EJS_JS_Str26 = EJS_JS_Str24;
var EJS_JS_Str27 = 'Statistik Fehler(Mehr Abteilungen als angefordert)!';
var EJS_JS_Str28 = 'Es existiert noch keine Statistik für Ergebnis KPI!';
var EJS_JS_Str29 = 'Es existiert kein EStep!';
var EJS_JS_Str30 = 'Es existiert noch kein EPlan!';
var EJS_JS_Str31 = 'Es existiert keine Frage auf Pillarebene!';
var EJS_JS_Str32 = 'Nicht verfügbar';

/* =================================================
End: Evaluation.js
==================================================*/



/* =================================================
Start: index.aspx
==================================================*/

// JS
var index_JS_Str1 = 'Zur Admin Seite';
var index_JS_Str2 = 'Bitte wählen Sie Rolle...';
var index_JS_Str3 = 'Bitte wählen Sie einen Pillar!';
var index_JS_Str4 = 'Alle';
var index_JS_Str5 = index_JS_Str4;
var index_JS_Str6 = index_JS_Str4;
var index_JS_Str7 = 'Alle (ohne WL, LZL)';
var index_JS_Str8 =  'Pillarebene';

// HTML
var index_HTML_Str1 = 'FVP Evaluation Tool (Rohrbach)';
var index_HTML_Str2 = 'Jahr:';
var index_HTML_Str3 = 'Auswertung';
var index_HTML_Str4 = 'Abteilung:';
var index_HTML_Str5 = 'Cockpit';
var index_HTML_Str6 = 'Übersicht';
var index_HTML_Str7 = 'Pillar:';
var index_HTML_Str9 = 'Kommentar';
var index_HTML_Str10 = 'Evaluationsplanung(Organisation):';
var index_HTML_Str11 = 'Anzeigen';
var index_HTML_Str12 = 'Fragebogen';
var index_HTML_Str13 = 'Optional:';
var index_HTML_Str14 = 'RGS:';
var index_HTML_Str16 = 'Rolle:';
var index_HTML_Str19 = index_HTML_Str11;
var index_HTML_Str20 = 'Werksebene Ergebnis KPI:';
var index_HTML_Str21 = index_HTML_Str11;
var index_HTML_Str22 = 'Einmaliger Fragebogen an:&nbsp;';
var index_HTML_Str23 = index_HTML_Str11;
var index_HTML_Str24 = 'Evaluation';
var index_HTML_Str25 = '';
var index_HTML_Str26 = '1';
var index_HTML_Str27 = index_HTML_Str5;
var index_HTML_Str28 = '(Bitte wählen Sie Querformat zum Drucken aus!)';
var index_HTML_Str29 = 'Drucken';
var index_HTML_Str30 = 'Schließen';
var index_HTML_Str31 = index_HTML_Str6;
var index_HTML_Str32 = index_HTML_Str29;
var index_HTML_Str33 = index_HTML_Str30;
var index_HTML_Str34 = 'Evaluationsplan';
var index_HTML_Str35 = index_HTML_Str29;
var index_HTML_Str36 = index_HTML_Str30;
var index_HTML_Str37 = index_HTML_Str9;
var index_HTML_Str38 = index_HTML_Str12;
var index_HTML_Str39 = 'Loading...';
var index_HTML_Str40 = 'Einmaliger Fragebogen Pillarebene:';
var index_HTML_Str41 = index_HTML_Str11;

// Other
var indexNotizen = '<u>Hinweis</u>:<br />Benötigen Sie Unterstützung oder wollen Sie Probleme melden?<br /><b>Kontakt: </b>Heike Hartinger (HTI), Tel. 6960, Mail: <a href="mailto:hti@de.festo.com">hti@de.festo.com</a><br /><b>Technische Probleme an: </b>Cheng Qian (CHQI), Tel. Lync, Mail: <a href="mailto:chqi@de.festo.com">chqi@de.festo.com</a>';

/* =================================================
End: index.aspx
==================================================*/




/* =================================================
Start: cockpit.aspx
==================================================*/

// JS
var cockpit_JS_Str1 = 'Bitte benutzen Sie die Hauptseite!';
var cockpit_JS_Str2 = 'Der angefordete Pillar existiert nicht! Bitte benutzen Sie die Hauptseite!';
var cockpit_JS_Str3 = 'Es existiert kein angefordetes Kriterium oder keine RGS! Bitte benutzen Sie die Hauptseite!';
var cockpit_JS_Str4 = 'RGS';
var cockpit_JS_Str5 = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
var cockpit_JS_Str6 = 'von&nbsp;&nbsp;&nbsp;';
var cockpit_JS_Str7 = '(*)';
var cockpit_JS_Str8 = cockpit_JS_Str4;
var cockpit_JS_Str9 = 'von';
var cockpit_JS_Str10 = 'Alle';

// HTML
var cockpit_HTML_Str1 = 'Evaluation Cockpit';
var cockpit_HTML_Str2 = 'Stand bis:';
var cockpit_HTML_Str3 = 'Pillar:';
var cockpit_HTML_Str4 = 'Befähiger';
var cockpit_HTML_Str5 = 'Führung';
var cockpit_HTML_Str6 = 'Mitarbeiter';
var cockpit_HTML_Str7 = 'Strategie';
var cockpit_HTML_Str8 = 'Partnerschaften \& Kommunikation';
var cockpit_HTML_Str9 = 'Prozesse';
var cockpit_HTML_Str10 = 'Ergebnisse';
var cockpit_HTML_Str11 = 'Ergebnis KPI';
var cockpit_HTML_Str12 = '(Nur auf Werksebene)';
var cockpit_HTML_Str13 = 'Prozess KPI';
var cockpit_HTML_Str14 = '(Nur auf Werksebene)';
var cockpit_HTML_Str15 = 'Fähigkeitsniveau / Qualifizierung';
var cockpit_HTML_Str16 = 'Evaluationsergebnis';
var cockpit_HTML_Str17 = '';
var cockpit_HTML_Str18 = '1';
var cockpit_HTML_Str19 = index_HTML_Str39;

// Other
var cockpitNotizen = '<u>Hinweis</u>:<br />Das Symbol ' + cockpit_JS_Str7 + ' in Ergebnis KPI bedeutet Ergebnis von dieser RGS wurde von obiger übernommen, da bisher nicht erfasst!';

/* =================================================
End: cockpit.aspx
==================================================*/




/* =================================================
Start: uebersicht.aspx
==================================================*/

// JS
var uebersicht_JS_Str1 = cockpit_JS_Str1;
var uebersicht_JS_Str2 = cockpit_HTML_Str3;
var uebersicht_JS_Str3 = cockpit_JS_Str10;
var uebersicht_JS_Str4 = cockpit_JS_Str2;
var uebersicht_JS_Str5 = cockpit_JS_Str3;
var uebersicht_JS_Str6 = cockpit_JS_Str4;
var uebersicht_JS_Str7 = 'Optionen';
var uebersicht_JS_Str8 = cockpit_JS_Str4;
var uebersicht_JS_Str9 = cockpit_JS_Str9;
var uebersicht_JS_Str10 = 'Zum Cockpit';
var uebersicht_JS_Str11 = 'Zum Fragebogen';
var uebersicht_JS_Str12 = '{%0%} evaluiert in: ';

// HTML
var uebersicht_HTML_Str1 = 'Evaluation';
var uebersicht_HTML_Str2 = index_HTML_Str39;

/* =================================================
End: uebersicht.aspx
==================================================*/




/* =================================================
Start: FrageWahl.aspx
==================================================*/

// JS
var FrageWahl_JS_Str1 = 'Vorlage';
var FrageWahl_JS_Str2 = cockpit_JS_Str1;
var FrageWahl_JS_Str3 = FrageWahl_JS_Str1;
var FrageWahl_JS_Str4 = cockpit_HTML_Str3;
var FrageWahl_JS_Str5 = FrageWahl_JS_Str1;
var FrageWahl_JS_Str6 = 'Werksebene Ergebnis KPI';
var FrageWahl_JS_Str7 = cockpit_JS_Str10;
var FrageWahl_JS_Str8 = 'Zu den Kommentaren';
var FrageWahl_JS_Str9 = 'Frage';
var FrageWahl_JS_Str10 = 'Stichwort';
var FrageWahl_JS_Str11 = 'Nachweis';
var FrageWahl_JS_Str12 = 'Kennzahl';
var FrageWahl_JS_Str13 = 'Ziel';
var FrageWahl_JS_Str14 = '';
var FrageWahl_JS_Str15 = 'Frage / Kennzahl';
var FrageWahl_JS_Str16 = 'Stichwort / Ziel';
var FrageWahl_JS_Str17 = 'Nachweis';

// HTML
var FrageWahl_HTML_Str1 = uebersicht_HTML_Str1;
var FrageWahl_HTML_Str2 = 'Um Kommentare anzuzeigen, bitte auf die Sprechblasen klicken!';
var FrageWahl_HTML_Str3 = 'Nr.';
var FrageWahl_HTML_Str4 = 'Frage an?';
var FrageWahl_HTML_Str5 = FrageWahl_JS_Str9;
var FrageWahl_HTML_Str6 = cockpit_JS_Str4;
var FrageWahl_HTML_Str7 = FrageWahl_JS_Str10;
var FrageWahl_HTML_Str8 = FrageWahl_JS_Str11;
var FrageWahl_HTML_Str9 = 'Option';
var FrageWahl_HTML_Str10 = index_HTML_Str39;

/* =================================================
End: FrageWahl.aspx
==================================================*/




/* =================================================
Start: Kommentar.aspx
==================================================*/

// JS
var Kommentar_JS_Str1 = cockpit_JS_Str1;
var Kommentar_JS_Str2 = index_HTML_Str29;

// HTML
var Kommentar_HTML_Str1 = uebersicht_HTML_Str1;
var Kommentar_HTML_Str2 = FrageWahl_HTML_Str3;
var Kommentar_HTML_Str3 = FrageWahl_JS_Str9;
var Kommentar_HTML_Str4 = 'Frage an';
var Kommentar_HTML_Str5 = cockpit_JS_Str4;
var Kommentar_HTML_Str6 = FrageWahl_JS_Str10;
var Kommentar_HTML_Str7 = FrageWahl_JS_Str11;
var Kommentar_HTML_Str8 = 'Jahr';
var Kommentar_HTML_Str9 = 'Pillar';
var Kommentar_HTML_Str10 = 'Kriterium';
var Kommentar_HTML_Str11 = 'Abteilung';
var Kommentar_HTML_Str12 = 'Punkte';
var Kommentar_HTML_Str13 = 'Kommentar';
var Kommentar_HTML_Str14 = index_HTML_Str39;

/* =================================================
End: Kommentar.aspx
==================================================*/




/* =================================================
Start: KommentarDruck.aspx
==================================================*/

// JS
var KommentarDruck_JS_Str1 = cockpit_JS_Str1;

// HTML
var KommentarDruck_HTML_Str1 = 'FVP Evaluation Kommentar';
var KommentarDruck_HTML_Str2 = Kommentar_HTML_Str8;
var KommentarDruck_HTML_Str3 = FrageWahl_HTML_Str3;
var KommentarDruck_HTML_Str4 = Kommentar_HTML_Str9;
var KommentarDruck_HTML_Str5 = cockpit_JS_Str4;
var KommentarDruck_HTML_Str6 = Kommentar_HTML_Str10;
var KommentarDruck_HTML_Str7 = Kommentar_HTML_Str4;
var KommentarDruck_HTML_Str8 = FrageWahl_JS_Str9;
var KommentarDruck_HTML_Str9 = FrageWahl_JS_Str10;
var KommentarDruck_HTML_Str10 = FrageWahl_JS_Str11;
var KommentarDruck_HTML_Str11 = 'Punkte Beschreibung:';
var KommentarDruck_HTML_Str12 = Kommentar_HTML_Str11;
var KommentarDruck_HTML_Str13 = Kommentar_HTML_Str12;
var KommentarDruck_HTML_Str14 = Kommentar_HTML_Str13;
var KommentarDruck_HTML_Str15 = index_HTML_Str39;

/* =================================================
End: KommentarDruck.aspx
==================================================*/




/* =================================================
Start: EPlan.aspx
==================================================*/

// JS
var EPlan_JS_Str1 = 'Führung';
var EPlan_JS_Str2 = 'STAR';
var EPlan_JS_Str3 = 'Qualität';
var EPlan_JS_Str4 = 'E&T';
var EPlan_JS_Str5 = 'A&K';
var EPlan_JS_Str6 = 'TPM';
var EPlan_JS_Str7 = 'PSC';
var EPlan_JS_Str8 = 'FI';
var EPlan_JS_Str9 = 'BP';
var EPlan_JS_Str10 = 'Sicherheit';
var EPlan_JS_Str11 = 'E&E';
var EPlan_JS_Str12 = cockpit_JS_Str1;
var EPlan_JS_Str13 = 'Evaluationsplanung (Organisation)';
var EPlan_JS_Str14 = 'Hinweis:';

// HTML
var EPlan_HTML_Str1 = uebersicht_HTML_Str1;
var EPlan_HTML_Str2 = 'Werk Rohrbach';
var EPlan_HTML_Str3 = index_HTML_Str39;

/* =================================================
End: EPlan.aspx
==================================================*/




/* =================================================
Start: Fragebogen.aspx
==================================================*/

// JS
var Fragebogen_JS_Str1 = cockpit_JS_Str1;
var Fragebogen_JS_Str2 = 'Filter:';
var Fragebogen_JS_Str3 = 'Rolle';
var Fragebogen_JS_Str4 = 'RGS';
var Fragebogen_JS_Str5 = ', ';
var Fragebogen_JS_Str6 = 'Pillar:';
var Fragebogen_JS_Str7 = 'Werksebene Ergebnis KPI';
var Fragebogen_JS_Str8 = 'Es existiert keine Abteilung mit diesem Namen: {%0%}! Bitte benutzen Sie die Hauptseite!';
var Fragebogen_JS_Str9 = 'Ausgeblendete Fragen anzeigen';
var Fragebogen_JS_Str10 = 'Ausblenden';
var Fragebogen_JS_Str11 = 'Einblenden';
var Fragebogen_JS_Str12 = 'Alle';
var Fragebogen_JS_Str13 = 'RGS';
var Fragebogen_JS_Str14 = 'Ausgeblendete Fragen verbergen';
var Fragebogen_JS_Str15 = 'Frage';
var Fragebogen_JS_Str16 = 'Stichwort';
var Fragebogen_JS_Str17 = 'Nachweis';
var Fragebogen_JS_Str18 = 'Kennzahl';
var Fragebogen_JS_Str19 = 'Ziel';
var Fragebogen_JS_Str20 = 'Aktuell';
var Fragebogen_JS_Str21 = 'Frage / Kennzahl';
var Fragebogen_JS_Str22 = 'Stichwort / Ziel';
var Fragebogen_JS_Str23 = 'Nachweis / Aktuell';
var Fragebogen_JS_Str24 = 'Erfolgreich gespeichert!';
var Fragebogen_JS_Str25 = 'Möchten Sie diese Evaluation ausblenden?';
var Fragebogen_JS_Str26 = 'Ausblenden abgebrochen!';
var Fragebogen_JS_Str27 = 'Erfolgreich ausgeblendet!';
var Fragebogen_JS_Str28 = 'Möchten Sie die Änderungen speichern?';
var Fragebogen_JS_Str29 = Fragebogen_JS_Str28;
var Fragebogen_JS_Str30 = 'Erfolgreich auf 0 gesetzt!';

// HTML
var Fragebogen_HTML_Str1 = uebersicht_HTML_Str1;
var Fragebogen_HTML_Str2 = 'Speichern';
var Fragebogen_HTML_Str3 = 'Drucken';
var Fragebogen_HTML_Str4 = 'Neu laden';
var Fragebogen_HTML_Str5 = 'Keine Evaluation';
var Fragebogen_HTML_Str6 = 'Nr.';
var Fragebogen_HTML_Str7 = 'Frage an?';
var Fragebogen_HTML_Str8 = 'Punkte';
var Fragebogen_HTML_Str9 = 'RGS';
var Fragebogen_HTML_Str10 = 'Kommentar';
var Fragebogen_HTML_Str11 = index_HTML_Str39;

/* =================================================
End: Fragebogen.aspx
==================================================*/




/* =================================================
Start: FragebogenDruck.aspx
==================================================*/

// JS
var FragebogenDruck_JS_Str1 = cockpit_JS_Str1;
var FragebogenDruck_JS_Str2 = Fragebogen_JS_Str12;
var FragebogenDruck_JS_Str3 = 'Alle';
var FragebogenDruck_JS_Str4 = Fragebogen_JS_Str6;
var FragebogenDruck_JS_Str5 = 'Typ:';
var FragebogenDruck_JS_Str6 = Fragebogen_JS_Str7;
var FragebogenDruck_JS_Str7 = Fragebogen_JS_Str8;
var FragebogenDruck_JS_Str8 = Fragebogen_JS_Str9;
var FragebogenDruck_JS_Str9 = FragebogenDruck_JS_Str2;
var FragebogenDruck_JS_Str10 = Fragebogen_HTML_Str9;
var FragebogenDruck_JS_Str11 = Fragebogen_JS_Str14;
var FragebogenDruck_JS_Str12 = Fragebogen_JS_Str21;
var FragebogenDruck_JS_Str13 = Fragebogen_JS_Str22;
var FragebogenDruck_JS_Str14 = Fragebogen_JS_Str23;

// HTML
var FragebogenDruck_HTML_Str1 = 'FVP Reifegrad Evaluation';
var FragebogenDruck_HTML_Str2 = 'Informationen:';
var FragebogenDruck_HTML_Str3 = FragebogenDruck_JS_Str4;
var FragebogenDruck_HTML_Str4 = 'Datum:';
var FragebogenDruck_HTML_Str5 = 'Abteilung:';
var FragebogenDruck_HTML_Str6 = 'RGS:';
var FragebogenDruck_HTML_Str7 = 'Rolle:';
var FragebogenDruck_HTML_Str8 = 'Statistik:';
var FragebogenDruck_HTML_Str9 = 'Punkte Beschreibung:';
var FragebogenDruck_HTML_Str10 = Fragebogen_HTML_Str6;
var FragebogenDruck_HTML_Str11 = Fragebogen_HTML_Str7;
var FragebogenDruck_HTML_Str12 = Fragebogen_HTML_Str8;
var FragebogenDruck_HTML_Str13 = Fragebogen_HTML_Str9;
var FragebogenDruck_HTML_Str14 = Fragebogen_HTML_Str10;
var FragebogenDruck_HTML_Str15 = index_HTML_Str39;

/* =================================================
End: FragebogenDruck.aspx
==================================================*/




/* =================================================
Start: FBEKPI.aspx
==================================================*/

// JS
var FBEKPI_JS_Str1 = cockpit_JS_Str1;
var FBEKPI_JS_Str2 = Fragebogen_JS_Str2;
var FBEKPI_JS_Str3 = Fragebogen_JS_Str3;
var FBEKPI_JS_Str4 = Fragebogen_JS_Str4;
var FBEKPI_JS_Str5 = Fragebogen_JS_Str5;
var FBEKPI_JS_Str6 = Fragebogen_JS_Str6;
var FBEKPI_JS_Str7 = Fragebogen_JS_Str7;
var FBEKPI_JS_Str8 = Fragebogen_JS_Str9;
var FBEKPI_JS_Str9 = Fragebogen_JS_Str10;
var FBEKPI_JS_Str10 = Fragebogen_JS_Str11;
var FBEKPI_JS_Str11 = Fragebogen_JS_Str12;
var FBEKPI_JS_Str12 = Fragebogen_JS_Str13;
var FBEKPI_JS_Str13 = Fragebogen_JS_Str14;
var FBEKPI_JS_Str14 = Fragebogen_JS_Str15;
var FBEKPI_JS_Str15 = Fragebogen_JS_Str16;
var FBEKPI_JS_Str16 = Fragebogen_JS_Str17;
var FBEKPI_JS_Str17 = Fragebogen_JS_Str18;
var FBEKPI_JS_Str18 = Fragebogen_JS_Str19;
var FBEKPI_JS_Str19 = Fragebogen_JS_Str20;
var FBEKPI_JS_Str20 = Fragebogen_JS_Str21;
var FBEKPI_JS_Str21 = Fragebogen_JS_Str22;
var FBEKPI_JS_Str22 = Fragebogen_JS_Str23;
var FBEKPI_JS_Str23 = Fragebogen_JS_Str24;
var FBEKPI_JS_Str24 = Fragebogen_JS_Str25;
var FBEKPI_JS_Str25 = Fragebogen_JS_Str26;
var FBEKPI_JS_Str26 = Fragebogen_JS_Str27;
var FBEKPI_JS_Str27 = Fragebogen_JS_Str28;
var FBEKPI_JS_Str28 = Fragebogen_JS_Str28;

// HTML
var FBEKPI_HTML_Str1 = uebersicht_HTML_Str1;
var FBEKPI_HTML_Str2 = Fragebogen_HTML_Str2;
var FBEKPI_HTML_Str3 = Fragebogen_HTML_Str3;
var FBEKPI_HTML_Str4 = Fragebogen_HTML_Str4;
var FBEKPI_HTML_Str5 = Fragebogen_HTML_Str5;
var FBEKPI_HTML_Str6 = Fragebogen_HTML_Str6;
var FBEKPI_HTML_Str7 = Fragebogen_HTML_Str7;
var FBEKPI_HTML_Str8 = Fragebogen_HTML_Str8;
var FBEKPI_HTML_Str9 = Fragebogen_HTML_Str9;
var FBEKPI_HTML_Str10 = Fragebogen_HTML_Str10;
var FBEKPI_HTML_Str11 = index_HTML_Str39;

/* =================================================
End: FBEKPI.aspx
==================================================*/




/* =================================================
Start: FBEKPIDruck.aspx
==================================================*/

// JS
var FBEKPIDruck_JS_Str1 = cockpit_JS_Str1;
var FBEKPIDruck_JS_Str2 = FBEKPI_JS_Str11;
var FBEKPIDruck_JS_Str3 = FragebogenDruck_JS_Str3;
var FBEKPIDruck_JS_Str4 = FBEKPI_JS_Str6;
var FBEKPIDruck_JS_Str5 = FragebogenDruck_JS_Str5;
var FBEKPIDruck_JS_Str6 = FBEKPI_JS_Str7;
var FBEKPIDruck_JS_Str7 = FBEKPI_JS_Str8;
var FBEKPIDruck_JS_Str8 = FBEKPIDruck_JS_Str2;
var FBEKPIDruck_JS_Str9 = FBEKPI_HTML_Str9;
var FBEKPIDruck_JS_Str10 = FBEKPI_JS_Str13;
var FBEKPIDruck_JS_Str11 = FBEKPI_JS_Str17;
var FBEKPIDruck_JS_Str12 = FBEKPI_JS_Str18;
var FBEKPIDruck_JS_Str13 = FBEKPI_JS_Str19;

// HTML
var FBEKPIDruck_HTML_Str1 = FragebogenDruck_HTML_Str1;
var FBEKPIDruck_HTML_Str2 = FragebogenDruck_HTML_Str2;
var FBEKPIDruck_HTML_Str3 = FBEKPIDruck_JS_Str4;
var FBEKPIDruck_HTML_Str4 = FragebogenDruck_HTML_Str4;
var FBEKPIDruck_HTML_Str5 = FragebogenDruck_HTML_Str5;
var FBEKPIDruck_HTML_Str6 = FragebogenDruck_HTML_Str6;
var FBEKPIDruck_HTML_Str7 = FragebogenDruck_HTML_Str7;
var FBEKPIDruck_HTML_Str8 = FragebogenDruck_HTML_Str8;
var FBEKPIDruck_HTML_Str9 = FragebogenDruck_HTML_Str9;
var FBEKPIDruck_HTML_Str10 = FBEKPI_HTML_Str6;
var FBEKPIDruck_HTML_Str11 = FBEKPI_HTML_Str7;
var FBEKPIDruck_HTML_Str12 = FBEKPI_HTML_Str8;
var FBEKPIDruck_HTML_Str13 = FBEKPI_HTML_Str9;
var FBEKPIDruck_HTML_Str14 = FBEKPI_HTML_Str10;
var FBEKPIDruck_HTML_Str15 = index_HTML_Str39;

/* =================================================
End: FBEKPIDruck.aspx
==================================================*/




/* =================================================
Start: FBFuerWL.aspx
==================================================*/

// JS
var FBFuerWL_JS_Str1 = cockpit_JS_Str1;
var FBFuerWL_JS_Str2 = Fragebogen_JS_Str2;
var FBFuerWL_JS_Str3 = Fragebogen_JS_Str4;
var FBFuerWL_JS_Str4 = Fragebogen_JS_Str6;
var FBFuerWL_JS_Str5 = Fragebogen_JS_Str7;
var FBFuerWL_JS_Str6 = Fragebogen_JS_Str8;
var FBFuerWL_JS_Str7 = Fragebogen_JS_Str9;
var FBFuerWL_JS_Str8 = 'Die Abteilung {%0%} stimmt wahrscheinlich nicht mit der Rolle {%1%} überein!';
var FBFuerWL_JS_Str9 = Fragebogen_JS_Str10;
var FBFuerWL_JS_Str10 = Fragebogen_JS_Str11;
var FBFuerWL_JS_Str11 = Fragebogen_JS_Str12;
var FBFuerWL_JS_Str12 = Fragebogen_JS_Str13;
var FBFuerWL_JS_Str13 = Fragebogen_JS_Str14;
var FBFuerWL_JS_Str14 = FBFuerWL_JS_Str7;
var FBFuerWL_JS_Str15 = Fragebogen_JS_Str15;
var FBFuerWL_JS_Str16 = Fragebogen_JS_Str16;
var FBFuerWL_JS_Str17 = Fragebogen_JS_Str17;
var FBFuerWL_JS_Str18 = Fragebogen_JS_Str18;
var FBFuerWL_JS_Str19 = Fragebogen_JS_Str19;
var FBFuerWL_JS_Str20 = Fragebogen_JS_Str20;
var FBFuerWL_JS_Str21 = Fragebogen_JS_Str21;
var FBFuerWL_JS_Str22 = Fragebogen_JS_Str22;
var FBFuerWL_JS_Str23 = Fragebogen_JS_Str23;
var FBFuerWL_JS_Str24 = Fragebogen_JS_Str24;
var FBFuerWL_JS_Str25 = Fragebogen_JS_Str28;
var FBFuerWL_JS_Str26 = Fragebogen_JS_Str11;
var FBFuerWL_JS_Str27 = Fragebogen_JS_Str10;

// HTML
var FBFuerWL_HTML_Str1 = uebersicht_HTML_Str1;
var FBFuerWL_HTML_Str2 = Fragebogen_HTML_Str2;
var FBFuerWL_HTML_Str3 = Fragebogen_HTML_Str3;
var FBFuerWL_HTML_Str4 = Fragebogen_HTML_Str4;
var FBFuerWL_HTML_Str5 = Fragebogen_HTML_Str6;
var FBFuerWL_HTML_Str6 = Fragebogen_HTML_Str7;
var FBFuerWL_HTML_Str7 = Fragebogen_HTML_Str8;
var FBFuerWL_HTML_Str8 = Fragebogen_HTML_Str9;
var FBFuerWL_HTML_Str9 = Fragebogen_HTML_Str10;
var FBFuerWL_HTML_Str10 = index_HTML_Str39;;

/* =================================================
End: FBFuerWL.aspx
==================================================*/




/* =================================================
Start: FBFuerWLDruck.aspx
==================================================*/

// JS
var FBFuerWLDruck_JS_Str1 = cockpit_JS_Str1;
var FBFuerWLDruck_JS_Str2 = FragebogenDruck_JS_Str3;
var FBFuerWLDruck_JS_Str3 = FragebogenDruck_JS_Str4;
var FBFuerWLDruck_JS_Str4 = FragebogenDruck_JS_Str5;
var FBFuerWLDruck_JS_Str5 = FragebogenDruck_JS_Str6;
var FBFuerWLDruck_JS_Str6 = FragebogenDruck_JS_Str7;
var FBFuerWLDruck_JS_Str7 = FragebogenDruck_JS_Str8;
var FBFuerWLDruck_JS_Str8 = FBFuerWLDruck_JS_Str2;
var FBFuerWLDruck_JS_Str9 = FragebogenDruck_JS_Str10;
var FBFuerWLDruck_JS_Str10 = FBFuerWL_JS_Str13;
var FBFuerWLDruck_JS_Str11 = FBFuerWL_JS_Str21;
var FBFuerWLDruck_JS_Str12 = FBFuerWL_JS_Str22;
var FBFuerWLDruck_JS_Str13 = FBFuerWL_JS_Str23;
var FBFuerWLDruck_JS_Str14 = 'Pillarebene';

// HTML
var FBFuerWLDruck_HTML_Str1 = FragebogenDruck_HTML_Str1;
var FBFuerWLDruck_HTML_Str2 = FragebogenDruck_HTML_Str2;
var FBFuerWLDruck_HTML_Str3 = FBFuerWLDruck_JS_Str3;
var FBFuerWLDruck_HTML_Str4 = FragebogenDruck_HTML_Str4;
var FBFuerWLDruck_HTML_Str5 = FragebogenDruck_HTML_Str5;
var FBFuerWLDruck_HTML_Str6 = FragebogenDruck_HTML_Str6;
var FBFuerWLDruck_HTML_Str7 = FragebogenDruck_HTML_Str7;
var FBFuerWLDruck_HTML_Str8 = FragebogenDruck_HTML_Str8;
var FBFuerWLDruck_HTML_Str9 = FragebogenDruck_HTML_Str9;
var FBFuerWLDruck_HTML_Str10 = FBFuerWL_HTML_Str5;
var FBFuerWLDruck_HTML_Str11 = FBFuerWL_HTML_Str6;
var FBFuerWLDruck_HTML_Str12 = FBFuerWL_HTML_Str7;
var FBFuerWLDruck_HTML_Str13 = FBFuerWL_HTML_Str8;
var FBFuerWLDruck_HTML_Str14 = FBFuerWL_HTML_Str9;
var FBFuerWLDruck_HTML_Str15 = index_HTML_Str39;

/* =================================================
End: FBFuerWLDruck.aspx
==================================================*/




/* =================================================
Start: admin.aspx
==================================================*/

// JS
var admin_JS_Str1 = 'Zur Haupt Seite';
var admin_JS_Str2 = '';
var admin_JS_Str3 = '';

// HTML
var admin_HTML_Str1 = uebersicht_HTML_Str1;
var admin_HTML_Str2 = 'Abteilung';
var admin_HTML_Str3 = 'Rolle';
var admin_HTML_Str4 = 'Fragebogen';
var admin_HTML_Str5 = 'Allgemein';
var admin_HTML_Str6 = 'Berechtigung';
var admin_HTML_Str7 = 'Verwaltung Evaluation';
var admin_HTML_Str8 = 'Hier werden entsprechende Berechtigungsseiten von SharePoint angezeigt!';
var admin_HTML_Str9 = index_HTML_Str39;

/* =================================================
End: admin.aspx
==================================================*/




/* =================================================
Start: strukturVerwaltung.aspx
==================================================*/

// JS
var strukturVerwaltung_JS_Str1 = 'Speichern';
var strukturVerwaltung_JS_Str2 = 'Abbrechen';
var strukturVerwaltung_JS_Str3 = 'Nichts geändert!';
var strukturVerwaltung_JS_Str4 = 'Bitte verwenden Sie bei "Name der Abteilung" kein Leerzeichen!';
var strukturVerwaltung_JS_Str5 = 'Abteilung {%0%} existiert schon!';
var strukturVerwaltung_JS_Str6 = 'Erfolgreich angepasst!';
var strukturVerwaltung_JS_Str7 = 'Anpassen';
var strukturVerwaltung_JS_Str8 = 'Löschen';
var strukturVerwaltung_JS_Str9 = 'Möchten Sie {%0%} löschen?(Alle zugehörigen Abteilungen, Fragebogen werden auch gelöscht!)';
var strukturVerwaltung_JS_Str10 = 'Abteilung wurde nicht gelöscht!';
var strukturVerwaltung_JS_Str11 = 'Erfolgreich gelöscht!';
var strukturVerwaltung_JS_Str12 = 'Bitte wählen...';
var strukturVerwaltung_JS_Str13 = 'Bereich muss gewählt werden!';
var strukturVerwaltung_JS_Str14 = 'Erfolgreich angelegt!';

// HTML
var strukturVerwaltung_HTML_Str1 = 'Neu';
var strukturVerwaltung_HTML_Str2 = 'Abteilung';
var strukturVerwaltung_HTML_Str3 = 'Bereich';
var strukturVerwaltung_HTML_Str4 = 'Ebene';
var strukturVerwaltung_HTML_Str5 = 'Optionen';
var strukturVerwaltung_HTML_Str6 = 'Hinweise:';
var strukturVerwaltung_HTML_Str7 = '<li>Klicken Sie um entsprechende Änderungen vorzunehmen!</li><li>Wählen Sie <b>Neu</b> um eine neue Abteilungen anzulegen!</li><li>Wählen Sie <span class=\"glyphicon glyphicon-pencil\"></span> um eine bestehende Abteilung anzupassen!</li>';
var strukturVerwaltung_HTML_Str8 = index_HTML_Str39;

/* =================================================
End: strukturVerwaltung.aspx
==================================================*/




/* =================================================
Start: rolle.aspx
==================================================*/

// JS
var rolle_JS_Str1 = 'Jede';
var rolle_JS_Str2 = 'Werk';
var rolle_JS_Str3 = 'LZ';
var rolle_JS_Str4 = strukturVerwaltung_JS_Str7;
var rolle_JS_Str5 = strukturVerwaltung_JS_Str8;
var rolle_JS_Str6 = strukturVerwaltung_JS_Str1;
var rolle_JS_Str7 = strukturVerwaltung_JS_Str2;
var rolle_JS_Str8 = strukturVerwaltung_JS_Str3;
var rolle_JS_Str9 = 'Bitte verwenden bei "Name" kein Leerzeichen!';
var rolle_JS_Str10 = 'Rolle {%0%} existiert schon!';
var rolle_JS_Str11 = '"Name" der Rolle noch nicht ausgefüllt!';
var rolle_JS_Str12 = strukturVerwaltung_JS_Str6;
var rolle_JS_Str13 = 'Möchten Sie {%0%} löschen?';
var rolle_JS_Str14 = 'Rolle {%0%} wurde nicht gelöscht!';
var rolle_JS_Str15 = strukturVerwaltung_JS_Str11;
var rolle_JS_Str16 = strukturVerwaltung_JS_Str14;
var rolle_JS_Str17 = Kommentar_HTML_Str9;

// HTML
var rolle_HTML_Str1 = strukturVerwaltung_HTML_Str1;
var rolle_HTML_Str2 = 'Abk.';
var rolle_HTML_Str3 = 'Vollständiger Name';
var rolle_HTML_Str4 = 'Ebene';
var rolle_HTML_Str5 = 'Beschreibung';
var rolle_HTML_Str6 = 'Optionen';
var rolle_HTML_Str7 = strukturVerwaltung_HTML_Str6;
var rolle_HTML_Str8 = '<li>Klicken Sie entsprechend um Änderungen vorzunehmen!</li><li>Wählen Sie <b>Neu</b> um neue Rollen anzulegen!</li><li>Wählen Sie <span class=\"glyphicon glyphicon-pencil\"></span> um bestehende Rollen anzupassen!</li><li><b>Abk.</b> ist die Abkürzung der Rolle!</li><li><b>Ebene</b> ist die Stufe, in der die Rolle den Fragebogen beantwortet!</li>';
var rolle_HTML_Str9 = index_HTML_Str39;

/* =================================================
End: rolle.aspx
==================================================*/




/* =================================================
Start: FBVerwaltung.aspx
==================================================*/

// JS
var FBVerwaltung_JS_Str1 = 'Ergebnis KPI';
var FBVerwaltung_JS_Str2 = 'Bitte wählen...';
var FBVerwaltung_JS_Str3 = 'Bitte Pillar eingeben!';
var FBVerwaltung_JS_Str4 = 'Achtung!';
var FBVerwaltung_JS_Str5 = 'Es gibt noch keine Frage in dieser Fragebogen Vorlage!';
var FBVerwaltung_JS_Str6 = 'Nach oben';
var FBVerwaltung_JS_Str7 = 'Nach unten';
var FBVerwaltung_JS_Str8 = 'Alle';
var FBVerwaltung_JS_Str9 = strukturVerwaltung_JS_Str7;
var FBVerwaltung_JS_Str10 = strukturVerwaltung_JS_Str8;
var FBVerwaltung_JS_Str11 = 'Frage anlegen';
var FBVerwaltung_JS_Str12 = 'Frage anpassen';
var FBVerwaltung_JS_Str13 = ': ';
var FBVerwaltung_JS_Str14 = 'Anlegen';
var FBVerwaltung_JS_Str15 = 'Anpassen';
var FBVerwaltung_JS_Str16 = 'Rolle*';
var FBVerwaltung_JS_Str17 = 'Bitte wählen Sie Rolle...';
var FBVerwaltung_JS_Str18 = 'Frage muss nicht leer sein!';
var FBVerwaltung_JS_Str19 = 'Mindestens eine Rolle muss ausgewählt werden!';
var FBVerwaltung_JS_Str20 = strukturVerwaltung_JS_Str6;
var FBVerwaltung_JS_Str21 = strukturVerwaltung_JS_Str14;
var FBVerwaltung_JS_Str22 = 'Erfolgreich gespeichert!';
var FBVerwaltung_JS_Str23 = 'Möchten Sie die Frage: Nr. {%0%} löschen?';
var FBVerwaltung_JS_Str24 = 'Die Frage wurde nicht gelöscht!';
var FBVerwaltung_JS_Str25 = strukturVerwaltung_JS_Str11;
var FBVerwaltung_JS_Str26 = 'Bereits in erster Zeile!';
var FBVerwaltung_JS_Str27 = 'Erfolgreich verschoben! Bitte speichern!';
var FBVerwaltung_JS_Str28 = 'Bereits in letzter Zeile!';
var FBVerwaltung_JS_Str29 = Fragebogen_JS_Str15;
var FBVerwaltung_JS_Str30 = Fragebogen_JS_Str16;
var FBVerwaltung_JS_Str31 = Fragebogen_JS_Str17;
var FBVerwaltung_JS_Str32 = Fragebogen_JS_Str18;
var FBVerwaltung_JS_Str33 = Fragebogen_JS_Str19;
var FBVerwaltung_JS_Str34 = Fragebogen_JS_Str20;
var FBVerwaltung_JS_Str35 = Fragebogen_JS_Str21;
var FBVerwaltung_JS_Str36 = Fragebogen_JS_Str22;
var FBVerwaltung_JS_Str37 = Fragebogen_JS_Str23;
var FBVerwaltung_JS_Str38 = 'Drucken';

// HTML
var FBVerwaltung_HTML_Str1 = 'Vorlage:&nbsp;&nbsp;&nbsp;&nbsp;Jahr:&nbsp;';
var FBVerwaltung_HTML_Str2 = 'Pillar:';
var FBVerwaltung_HTML_Str3 = 'Anzeigen';
var FBVerwaltung_HTML_Str4 = 'Neu';
var FBVerwaltung_HTML_Str5 = 'Organisation';
var FBVerwaltung_HTML_Str6 = 'Speichern';
var FBVerwaltung_HTML_Str7 = Fragebogen_HTML_Str6;
var FBVerwaltung_HTML_Str8 = 'Rolle';
var FBVerwaltung_HTML_Str9 = FBVerwaltung_JS_Str29;
var FBVerwaltung_HTML_Str10 = Fragebogen_HTML_Str9;
var FBVerwaltung_HTML_Str11 = FBVerwaltung_JS_Str30;
var FBVerwaltung_HTML_Str12 = FBVerwaltung_JS_Str31;
var FBVerwaltung_HTML_Str13 = 'Optionen';
var FBVerwaltung_HTML_Str14 = strukturVerwaltung_HTML_Str6;
var FBVerwaltung_HTML_Str15 = '<li>Klicken Sie entsprechend um Änderungen vorzunehmen!</li><li>Wählen Sie <b>Neu</b> um neue Fragen anzulegen!</li><li>Wählen Sie <span class=\"glyphicon glyphicon-pencil\"></span> um bestehende Fragen anzupassen!</li>';
var FBVerwaltung_HTML_Str16 = 'Kriterium';
var FBVerwaltung_HTML_Str17 = 'Leeren';
var FBVerwaltung_HTML_Str18 = 'Abbrechen';
var FBVerwaltung_HTML_Str19 = index_HTML_Str39;

/* =================================================
End: FBVerwaltung.aspx
==================================================*/




/* =================================================
Start: FragePoolDruck.aspx
==================================================*/

// JS
var FragePoolDruck_JS_Str1 = 'Vorlage';
var FragePoolDruck_JS_Str2 = cockpit_JS_Str1;
var FragePoolDruck_JS_Str3 = Fragebogen_JS_Str12;
var FragePoolDruck_JS_Str4 = FragebogenDruck_JS_Str3;
var FragePoolDruck_JS_Str5 = FragebogenDruck_JS_Str4;
var FragePoolDruck_JS_Str6 = FragebogenDruck_JS_Str5;
var FragePoolDruck_JS_Str7 = FragebogenDruck_JS_Str6;
var FragePoolDruck_JS_Str8 = Fragebogen_JS_Str13;
var FragePoolDruck_JS_Str9 = FragePoolDruck_JS_Str3;
var FragePoolDruck_JS_Str10 = Fragebogen_JS_Str21;
var FragePoolDruck_JS_Str11 = Fragebogen_JS_Str22;
var FragePoolDruck_JS_Str12 = Fragebogen_JS_Str17;

// HTML
var FragePoolDruck_HTML_Str1 = FragebogenDruck_HTML_Str1;
var FragePoolDruck_HTML_Str2 = FragebogenDruck_HTML_Str2;
var FragePoolDruck_HTML_Str3 = FragebogenDruck_HTML_Str3;
var FragePoolDruck_HTML_Str4 = FragebogenDruck_HTML_Str4;
var FragePoolDruck_HTML_Str5 = FragebogenDruck_HTML_Str5;
var FragePoolDruck_HTML_Str6 = FragebogenDruck_HTML_Str6;
var FragePoolDruck_HTML_Str7 = FragebogenDruck_HTML_Str7;
var FragePoolDruck_HTML_Str8 = 'Max Punkt:';
var FragePoolDruck_HTML_Str9 = FragebogenDruck_HTML_Str9;
var FragePoolDruck_HTML_Str10 = FragebogenDruck_HTML_Str10;
var FragePoolDruck_HTML_Str11 = FragebogenDruck_HTML_Str11;
var FragePoolDruck_HTML_Str12 = FragebogenDruck_HTML_Str13;
var FragePoolDruck_HTML_Str13 = FragePoolDruck_JS_Str10;
var FragePoolDruck_HTML_Str14 = FragePoolDruck_JS_Str11;
var FragePoolDruck_HTML_Str15 = FragePoolDruck_JS_Str12;
var FragePoolDruck_HTML_Str16 = index_HTML_Str39;

/* =================================================
End: FragePoolDruck.aspx
==================================================*/




/* =================================================
Start: statistik.aspx
==================================================*/

// JS
var statistik_JS_Str1 = 'Keine Änderungen!';
var statistik_JS_Str2 = strukturVerwaltung_JS_Str6;
var statistik_JS_Str3 = 'Nur Zahlen eintragen!';

// HTML
var statistik_HTML_Str1 = 'Speichern';
var statistik_HTML_Str2 = 'Kriterium';
var statistik_HTML_Str3 = 'Gewicht(%)';
var statistik_HTML_Str4 = 'Verwaltungsfunktionen:';
var statistik_HTML_Str5 = 'Besondere Aufmerksamkeit:';
var statistik_HTML_Str6 = 'Anzeigen';
var statistik_HTML_Str7 = 'Export alle Cockpits:';
var statistik_HTML_Str8 = 'Export';
var statistik_HTML_Str9 = 'Export alle Rohdaten:';
var statistik_HTML_Str10 = statistik_HTML_Str8;
var statistik_HTML_Str11 = 'Rechnungen erneuern:';
var statistik_HTML_Str12 = 'Ausführen';
var statistik_HTML_Str13 = strukturVerwaltung_HTML_Str6;
var statistik_HTML_Str14 = '<li><b>Achtung!</b> Klicken Sie <b>Speichern</b> um Änderungen anzunehmen!</li><li><b>Besondere Aufmerksamkeiten</b> sind welche besonders guten Abteilungen mit welchen Pillars oder dagegen!</li><li><b>Cockpit Export</b> ermöglicht, alle Cockpit auf ein Klick herunterzuladen!</li><li><b>Roh Daten Export</b> gibt Ihnen die Möglichkeiten, alle Evaluationsergebnis weiter zu evaluieren!</li><li>Klicken Sie <b>Rechnen erneuen</b> um alle Fragebogen neu hochzuzählen!</li>';
var statistik_HTML_Str15 = index_HTML_Str39;

/* =================================================
End: statistik.aspx
==================================================*/



/* =================================================
Start: EPlanVerwaltung.aspx
==================================================*/

// JS
var EPlanVerwaltung_JS_Str1 = 'Bitte wählen...';
var EPlanVerwaltung_JS_Str2 = 'Bitte Pillar eingeben!';
var EPlanVerwaltung_JS_Str3 = 'Bitte Abteilungen wählen!';
var EPlanVerwaltung_JS_Str4 = 'Erfolgreich gespeichert!';

// HTML
var EPlanVerwaltung_HTML_Str1 = 'Jahr:&nbsp;';
var EPlanVerwaltung_HTML_Str2 = 'Pillar:';
var EPlanVerwaltung_HTML_Str3 = 'Anzeigen';
var EPlanVerwaltung_HTML_Str4 = strukturVerwaltung_HTML_Str6;
var EPlanVerwaltung_HTML_Str5 = '<li>...</li>';
var EPlanVerwaltung_HTML_Str6 = index_HTML_Str39;
var EPlanVerwaltung_HTML_Str7 = 'Typ:';
var EPlanVerwaltung_HTML_Str8 = 'Abteilungen:';
var EPlanVerwaltung_HTML_Str9 = 'Speichern';

/* =================================================
End: EPlanVerwaltung.aspx
==================================================*/
