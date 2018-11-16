/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //DANGER solo per android, decommentare!
        //checkConnection();
        /* DANGER: solo per browser, dopo togliere!*/
        getdatigrezzi();
        getdatiiqa();
    },


};

app.initialize();

/*///////////////inizio utilities//////////////*/

function display_results(contenitore, messaggio) {
    $(contenitore).text(messaggio);
};

/*per network info*/
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {

        setTimeout(function () {
            noconnessione();
        }, 9000);
        //alert('Non sei connesso ad internet, connettiti ad una rete per procedere.');
        return false;

    } else {
        //display_results("h1", "ok");
        getdatiiqa();
        getdatigrezzi();
        return true;
    }
}



var iqa = 0;

function getdatiiqa() {
    var createCORSRequest = function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Most browsers.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // IE8 & IE9
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };

    //var dataarpa = 20181010

    /*ogni volta setto la data di oggi*/

    var today = new Date();
    var oggi = today.getDate();
    oggi = oggi.toString();
    var mese = today.getMonth() + 1;
    var annon = today.getYear();
    var annok = annon.toString();
    var mesek = mese.toString();

    if (oggi.length == 1) {
        oggi = '0' + oggi;
    }
    if (mesek.length == 1) {
        mesek = '0' + mesek;
    }
    // data per la query alle API arpa per IQA
    var dataarpa = "20" + annok.slice(1) + mesek + oggi;

    // data per umani
    var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]

    display_results(".datatop h1 span#day", today.getDate());
    display_results(".datatop h1 span#month", mesi[today.getMonth()]);
    display_results(".datatop h1 span#year", "20" + annok.slice(1));


    var url = 'https://apps.arpae.it/REST/qa_modello/' + dataarpa + '?projection={"dati.istat_037006":1}';
    //var urlC="https://www.arpae.it/qualita-aria/bollettino-qa/json"

    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        var responseText = xhr.responseText;

        setTimeout(function () {
            connesso();
        }, 9000);
        console.log(responseText);
        // process the response.
        var obj = jQuery.parseJSON(responseText);
        iqa = obj.dati.istat_037006.iqa;
        console.log(iqa);

        stampaaggettivoiqa();
    };

    xhr.onerror = function () {
        //display_results("h3", 'There was an error!');
        console.log('There was an error!');
    };


    xhr.send();
};

var entity_table = {
    // 34: "&quot;",     // Quotation mark. Not required
    38: "&amp;", // Ampersand. Applied before everything else in the application
    60: "&lt;", // Less-than sign
    62: "&gt;", // Greater-than sign
    // 63: "&#63;",      // Question mark
    // 111: "&#111;",        // Latin small letter o
    160: "&nbsp;", // Non-breaking space
    161: "&iexcl;", // Inverted exclamation mark
    162: "&cent;", // Cent sign
    163: "&pound;", // Pound sign
    164: "&curren;", // Currency sign
    165: "&yen;", // Yen sign
    166: "&brvbar;", // Broken vertical bar
    167: "&sect;", // Section sign
    168: "&uml;", // Diaeresis
    169: "&copy;", // Copyright sign
    170: "&ordf;", // Feminine ordinal indicator
    171: "&laquo;", // Left-pointing double angle quotation mark
    172: "&not;", // Not sign
    173: "&shy;", // Soft hyphen
    174: "&reg;", // Registered sign
    175: "&macr;", // Macron
    176: "&deg;", // Degree sign
    177: "&plusmn;", // Plus-minus sign
    178: "&sup2;", // Superscript two
    179: "&sup3;", // Superscript three
    180: "&acute;", // Acute accent
    181: "&micro;", // Micro sign
    182: "&para;", // Pilcrow sign
    183: "&middot;", // Middle dot
    184: "&cedil;", // Cedilla
    185: "&sup1;", // Superscript one
    186: "&ordm;", // Masculine ordinal indicator
    187: "&raquo;", // Right-pointing double angle quotation mark
    188: "&frac14;", // Vulgar fraction one-quarter
    189: "&frac12;", // Vulgar fraction one-half
    190: "&frac34;", // Vulgar fraction three-quarters
    191: "&iquest;", // Inverted question mark
    192: "&Agrave;", // A with grave
    193: "&Aacute;", // A with acute
    194: "&Acirc;", // A with circumflex
    195: "&Atilde;", // A with tilde
    196: "&Auml;", // A with diaeresis
    197: "&Aring;", // A with ring above
    198: "&AElig;", // AE
    199: "&Ccedil;", // C with cedilla
    200: "&Egrave;", // E with grave
    201: "&Eacute;", // E with acute
    202: "&Ecirc;", // E with circumflex
    203: "&Euml;", // E with diaeresis
    204: "&Igrave;", // I with grave
    205: "&Iacute;", // I with acute
    206: "&Icirc;", // I with circumflex
    207: "&Iuml;", // I with diaeresis
    208: "&ETH;", // Eth
    209: "&Ntilde;", // N with tilde
    210: "&Ograve;", // O with grave
    211: "&Oacute;", // O with acute
    212: "&Ocirc;", // O with circumflex
    213: "&Otilde;", // O with tilde
    214: "&Ouml;", // O with diaeresis
    215: "&times;", // Multiplication sign
    216: "&Oslash;", // O with stroke
    217: "&Ugrave;", // U with grave
    218: "&Uacute;", // U with acute
    219: "&Ucirc;", // U with circumflex
    220: "&Uuml;", // U with diaeresis
    221: "&Yacute;", // Y with acute
    222: "&THORN;", // Thorn
    223: "&szlig;", // Sharp s. Also known as ess-zed
    224: "&agrave;", // a with grave
    225: "&aacute;", // a with acute
    226: "&acirc;", // a with circumflex
    227: "&atilde;", // a with tilde
    228: "&auml;", // a with diaeresis
    229: "&aring;", // a with ring above
    230: "&aelig;", // ae. Also known as ligature ae
    231: "&ccedil;", // c with cedilla
    232: "&egrave;", // e with grave
    233: "&eacute;", // e with acute
    234: "&ecirc;", // e with circumflex
    235: "&euml;", // e with diaeresis
    236: "&igrave;", // i with grave
    237: "&iacute;", // i with acute
    238: "&icirc;", // i with circumflex
    239: "&iuml;", // i with diaeresis
    240: "&eth;", // eth
    241: "&ntilde;", // n with tilde
    242: "&ograve;", // o with grave
    243: "&oacute;", // o with acute
    244: "&ocirc;", // o with circumflex
    245: "&otilde;", // o with tilde
    246: "&ouml;", // o with diaeresis
    247: "&divide;", // Division sign
    248: "&oslash;", // o with stroke. Also known as o with slash
    249: "&ugrave;", // u with grave
    250: "&uacute;", // u with acute
    251: "&ucirc;", // u with circumflex
    252: "&uuml;", // u with diaeresis
    253: "&yacute;", // y with acute
    254: "&thorn;", // thorn
    255: "&yuml;", // y with diaeresis
    264: "&#264;", // Latin capital letter C with circumflex
    265: "&#265;", // Latin small letter c with circumflex
    338: "&OElig;", // Latin capital ligature OE
    339: "&oelig;", // Latin small ligature oe
    352: "&Scaron;", // Latin capital letter S with caron
    353: "&scaron;", // Latin small letter s with caron
    372: "&#372;", // Latin capital letter W with circumflex
    373: "&#373;", // Latin small letter w with circumflex
    374: "&#374;", // Latin capital letter Y with circumflex
    375: "&#375;", // Latin small letter y with circumflex
    376: "&Yuml;", // Latin capital letter Y with diaeresis
    402: "&fnof;", // Latin small f with hook, function, florin
    710: "&circ;", // Modifier letter circumflex accent
    732: "&tilde;", // Small tilde
    913: "&Alpha;", // Alpha
    914: "&Beta;", // Beta
    915: "&Gamma;", // Gamma
    916: "&Delta;", // Delta
    917: "&Epsilon;", // Epsilon
    918: "&Zeta;", // Zeta
    919: "&Eta;", // Eta
    920: "&Theta;", // Theta
    921: "&Iota;", // Iota
    922: "&Kappa;", // Kappa
    923: "&Lambda;", // Lambda
    924: "&Mu;", // Mu
    925: "&Nu;", // Nu
    926: "&Xi;", // Xi
    927: "&Omicron;", // Omicron
    928: "&Pi;", // Pi
    929: "&Rho;", // Rho
    931: "&Sigma;", // Sigma
    932: "&Tau;", // Tau
    933: "&Upsilon;", // Upsilon
    934: "&Phi;", // Phi
    935: "&Chi;", // Chi
    936: "&Psi;", // Psi
    937: "&Omega;", // Omega
    945: "&alpha;", // alpha
    946: "&beta;", // beta
    947: "&gamma;", // gamma
    948: "&delta;", // delta
    949: "&epsilon;", // epsilon
    950: "&zeta;", // zeta
    951: "&eta;", // eta
    952: "&theta;", // theta
    953: "&iota;", // iota
    954: "&kappa;", // kappa
    955: "&lambda;", // lambda
    956: "&mu;", // mu
    957: "&nu;", // nu
    958: "&xi;", // xi
    959: "&omicron;", // omicron
    960: "&pi;", // pi
    961: "&rho;", // rho
    962: "&sigmaf;", // sigmaf
    963: "&sigma;", // sigma
    964: "&tau;", // tau
    965: "&upsilon;", // upsilon
    966: "&phi;", // phi
    967: "&chi;", // chi
    968: "&psi;", // psi
    969: "&omega;", // omega
    977: "&thetasym;", // Theta symbol
    978: "&upsih;", // Greek upsilon with hook symbol
    982: "&piv;", // Pi symbol
    8194: "&ensp;", // En space
    8195: "&emsp;", // Em space
    8201: "&thinsp;", // Thin space
    8204: "&zwnj;", // Zero width non-joiner
    8205: "&zwj;", // Zero width joiner
    8206: "&lrm;", // Left-to-right mark
    8207: "&rlm;", // Right-to-left mark
    8211: "&ndash;", // En dash
    8212: "&mdash;", // Em dash
    8216: "&lsquo;", // Left single quotation mark
    8217: "&rsquo;", // Right single quotation mark
    8218: "&sbquo;", // Single low-9 quotation mark
    8220: "&ldquo;", // Left double quotation mark
    8221: "&rdquo;", // Right double quotation mark
    8222: "&bdquo;", // Double low-9 quotation mark
    8224: "&dagger;", // Dagger
    8225: "&Dagger;", // Double dagger
    8226: "&bull;", // Bullet
    8230: "&hellip;", // Horizontal ellipsis
    8240: "&permil;", // Per mille sign
    8242: "&prime;", // Prime
    8243: "&Prime;", // Double Prime
    8249: "&lsaquo;", // Single left-pointing angle quotation
    8250: "&rsaquo;", // Single right-pointing angle quotation
    8254: "&oline;", // Overline
    8260: "&frasl;", // Fraction Slash
    8364: "&euro;", // Euro sign
    8472: "&weierp;", // Script capital
    8465: "&image;", // Blackletter capital I
    8476: "&real;", // Blackletter capital R
    8482: "&trade;", // Trade mark sign
    8501: "&alefsym;", // Alef symbol
    8592: "&larr;", // Leftward arrow
    8593: "&uarr;", // Upward arrow
    8594: "&rarr;", // Rightward arrow
    8595: "&darr;", // Downward arrow
    8596: "&harr;", // Left right arrow
    8629: "&crarr;", // Downward arrow with corner leftward. Also known as carriage return
    8656: "&lArr;", // Leftward double arrow. ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
    8657: "&uArr;", // Upward double arrow
    8658: "&rArr;", // Rightward double arrow. ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ? rArr can be used for 'implies' as ISOtech suggests
    8659: "&dArr;", // Downward double arrow
    8660: "&hArr;", // Left-right double arrow
    // Mathematical Operators
    8704: "&forall;", // For all
    8706: "&part;", // Partial differential
    8707: "&exist;", // There exists
    8709: "&empty;", // Empty set. Also known as null set and diameter
    8711: "&nabla;", // Nabla. Also known as backward difference
    8712: "&isin;", // Element of
    8713: "&notin;", // Not an element of
    8715: "&ni;", // Contains as member
    8719: "&prod;", // N-ary product. Also known as product sign. Prod is not the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
    8721: "&sum;", // N-ary summation. Sum is not the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
    8722: "&minus;", // Minus sign
    8727: "&lowast;", // Asterisk operator
    8729: "&#8729;", // Bullet operator
    8730: "&radic;", // Square root. Also known as radical sign
    8733: "&prop;", // Proportional to
    8734: "&infin;", // Infinity
    8736: "&ang;", // Angle
    8743: "&and;", // Logical and. Also known as wedge
    8744: "&or;", // Logical or. Also known as vee
    8745: "&cap;", // Intersection. Also known as cap
    8746: "&cup;", // Union. Also known as cup
    8747: "&int;", // Integral
    8756: "&there4;", // Therefore
    8764: "&sim;", // tilde operator. Also known as varies with and similar to. The tilde operator is not the same character as the tilde, U+007E, although the same glyph might be used to represent both
    8773: "&cong;", // Approximately equal to
    8776: "&asymp;", // Almost equal to. Also known as asymptotic to
    8800: "&ne;", // Not equal to
    8801: "&equiv;", // Identical to
    8804: "&le;", // Less-than or equal to
    8805: "&ge;", // Greater-than or equal to
    8834: "&sub;", // Subset of
    8835: "&sup;", // Superset of. Note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included.
    8836: "&nsub;", // Not a subset of
    8838: "&sube;", // Subset of or equal to
    8839: "&supe;", // Superset of or equal to
    8853: "&oplus;", // Circled plus. Also known as direct sum
    8855: "&otimes;", // Circled times. Also known as vector product
    8869: "&perp;", // Up tack. Also known as orthogonal to and perpendicular
    8901: "&sdot;", // Dot operator. The dot operator is not the same character as U+00B7 middle dot
    // Miscellaneous Technical
    8968: "&lceil;", // Left ceiling. Also known as an APL upstile
    8969: "&rceil;", // Right ceiling
    8970: "&lfloor;", // left floor. Also known as APL downstile
    8971: "&rfloor;", // Right floor
    9001: "&lang;", // Left-pointing angle bracket. Also known as bra. Lang is not the same character as U+003C 'less than'or U+2039 'single left-pointing angle quotation mark'
    9002: "&rang;", // Right-pointing angle bracket. Also known as ket. Rang is not the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
    // Geometric Shapes
    9642: "&#9642;", // Black small square
    9643: "&#9643;", // White small square
    9674: "&loz;", // Lozenge
    // Miscellaneous Symbols
    9702: "&#9702;", // White bullet
    9824: "&spades;", // Black (filled) spade suit
    9827: "&clubs;", // Black (filled) club suit. Also known as shamrock
    9829: "&hearts;", // Black (filled) heart suit. Also known as shamrock
    9830: "&diams;" // Black (filled) diamond suit
};


function changebackground(bck, color) {
    $(bck).css("background-color", color);
};


function entityToHtml(string) {
    for (var i in entity_table) {
        if (i != 38) {
            string = string.replace(new RegExp(entity_table[i], "g"), String.fromCharCode(i));
        }
    }

    string = string.replace(new RegExp("&#(x?)(\\d+);", "g"), function (match, p1, p2, string) {
        return String.fromCharCode(((p1 == 'x') ? parseInt(p2, 16) : p2));
    });

    string = string.replace(new RegExp(entity_table[38], "g"), String.fromCharCode(38));
    return string;
}
/*///////////////fine utilities//////////////*/

// arriva dal check connection plugin per android
function noconnessione() {
    $("div.block.rainbow ").css("background-color", "#E1E1E1");
    $("div.block.rainbow ").css("animation", "none");
    $("#connesso").addClass("hide");
    $("#noconnesso").removeClass("hide");
    display_results("h1", "Errore");
}

// arriva dal aver finito di stampare l'iqa
function connesso() {
    $("div.block.rainbow ").css("min-height", "auto");
    $("div.block.rainbow ").css("animation", "none");
    $("#connesso").removeClass("hide");
    $("#tabellainquinanti").removeClass("hide");
}

//var colori per gratio, per calcolare valore del gradiente di sfondo
var ratio = "";
var baseratio = 0;
var colorebasso = "";
var colorealto = "";

// scala iqa https://www.arpae.it/dettaglio_generale.asp?id=938&idlivello=134&disab_redirautom_mob=1

function stampaaggettivoiqa() {
    switch (true) {
        case (iqa < 50):
            display_results("#aggettivoiqa", "basso");
            //basso
            scrivifrase("basso");
            colorebasso = "00E676";
            colorealto = "FFEA00";
            baseratio = 0;
            break;
        case (50 <= iqa <= 99):
            display_results("#aggettivoiqa", "moderato");
            //moderato
            scrivifrase("moderato");
            colorebasso = "FFEA00";
            colorealto = "FFC600";
            baseratio = 50;
            break;
        case (100 <= iqa <= 149):
            display_results("#aggettivoiqa", "medio");
            //medio
            scrivifrase("medio");
            colorebasso = "FFC600";
            colorealto = "FF5722";
            baseratio = 100;
            break;
        case (150 <= iqa <= 199):
            display_results("#aggettivoiqa", "alto");
            //alto
            scrivifrase("alto");
            colorebasso = "FF5722";
            colorealto = "9E005D";
            baseratio = 150;
            break;
        case (iqa >= 200):
            display_results("#aggettivoiqa", "molto_alto");
            //molto alto
            changebackground("div.block.rainbow", "#9E005D");
            scrivifrase("molto_alto");
            //
            break;
        default:
            console.log("iqa nd");
            break;
    };
    calcolagradiente();
    frasedelgiorno();
}

/* test frasi online */
// https://www.joomla.it/articoli-della-community.feed?type=rss
function frasedelgiorno() {
    $.get("http://www.fondazioneinnovazioneurbana.it/bologna/rss/aria-rss?format=feed&type=rss", function (data) {
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);

            console.log("------------------------");
            console.log("title      : " + el.find("title").text());
            console.log("giorno     : " + el.find("pubDate").text());
            console.log("description: " + el.find("description").text());
        });
        console.log(data);
    });
};
/* test frasi offline http://api.jquery.com/jquery.ajax/  */

var nbuona = 0;
var arraybuona = [];
var indicearraybuona = 0;

var naccettabile = 0;
var arrayaccettabile = [];
var indicearrayaccettabile = 0;

var nmediocre = 0;
var arraymediocre = [];
var indicearraymediocre = 0;

var nscadente = 0;
var arrayscadente = [];
var indicearrayscadente = 0;

var npessima = 0;
var arraypessima = [];
var indicearraypessima = 0;

function scrivifrase(argomento) {
    $.ajax({
        'async': true,
        'global': false,
        'url': "frasi/" + argomento + ".json",
        'dataType': "json",
        'success': function (data) {
            //console.log(data.resources.length);
            //console.log(data.resources);
            frasi = $(data.resources);
            //console.log(frasi[2].name);

            if (localStorage.getItem(argomento)) {
                // console.log("esiste");
                var compara = 0;
                compara = parseInt(localStorage.getItem(argomento)) - 1;
                if (data.resources.length != localStorage.getItem(argomento)) {
                    console.log("fineciclo1");
                    localStorage.clear();
                    scrivifrase(argomento);
                } else {
                    var dovesono = 0;
                    var dovevado = [];
                    var andiamo = 0;

                    dovesono = localStorage.getItem("mioindice" + argomento);
                    dovesono = parseInt(dovesono) + 1;
                    dovevado = localStorage.getItem("sequenza" + argomento);
                    dovevado = dovevado.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                    var compara = 0;
                    compara = parseInt(localStorage.getItem(argomento) - 1);
                    //console.log(compara);
                    //console.log(dovesono);
                    //console.log(dovesono + " array " + dovevado);
                    andiamo = dovevado[dovesono];
                    //console.log(andiamo);
                    localStorage.setItem("mioindice" + argomento, dovesono);
                    //scrivo
                    display_results("#fraseiqa", frasi[andiamo].name);
                    display_results("#sottofraseiqa", frasi[andiamo].content);
                    if (dovesono == compara) {
                        console.log("fineciclo2");
                        localStorage.clear();
                        scrivifrase(argomento);
                    }

                }

            } else {
                //console.log("non esiste");
                // scrivo le 3 cose che mi servono: lunghezza, sequenza, mioindice

                frasi = $(data.resources);
                localStorage.setItem(argomento, data.resources.length);

                var N = [];
                N = Array.apply(null, {
                    length: data.resources.length
                }).map(Number.call, Number);
                console.log(N);
                arr = shuffle(N);
                console.log(arr);

                localStorage.setItem("sequenza" + argomento, arr);
                localStorage.setItem("mioindice" + argomento, 0);
                //scrivo
                display_results("#fraseiqa", frasi[0].name);
                display_results("#sottofraseiqa", frasi[0].content);
            };
        }
    });

};

function arrayordinato(numero) {
    // array ordinato
    Array.apply(null, {
        length: numero
    }).map(Number.call, Number)
}



// https://bost.ocks.org/mike/shuffle/

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// secondo repo arpa: dati grezzi centraline
/*  
dalla 29 alla 25, pm10, no2, benzene, pm25  
https://apps.arpae.it/qualita-aria/bollettino-qa-provinciale/bo
*/

var datigrezzi = ""
var stazioni = [29, 30, 31, 32, 33, 34, 35];
var inquinantilist = ["pm10", "no2", "benzene", "pm25"]
var pm10 = [];
var no2 = [];
var benzene = [];
var pm25 = [];
var iqapm10;

function stampainquinanti() {
    //  datigrezzi[29].pm10
    for (i = 0; i < stazioni.length; i++) {
        var stazionep = stazioni[i];
        var datogpm10 = datigrezzi[stazionep];
        //for (i = 0; i < inquinantilist.length; i++) {
        //var inquinante = inquinantilist[i];
        console.log(stazionep);
        //console.log(datogpm10);
        //console.log(inquinante);
        datogpm10 = datogpm10.pm10;
        datogpm10 = datogpm10.trim();
        if (datogpm10 == "n.d.") {} else {
            pm10.push(datogpm10);
        };

    }
    console.log(pm10);
    var maggiorinq = Math.max.apply(null, pm10);
    console.log(maggiorinq);
    iqapm10 = (maggiorinq / 50) * 100;
    console.log(iqapm10);
    iqapm10 = Math.trunc(iqapm10);
    stampaiqapm10();
};

function stampaiqapm10() {
    display_results("#pm10 .tinq > span", iqapm10);
    stampacoloreiqainquinante(iqapm10);
    console.log("iqa pm10 "+iqapm10);
};

function stampacoloreiqainquinante(inquinante) {
     console.log("iqa inquinante "+inquinante);
    switch (true) {
        case (inquinante < 50):
            calcolagradienteinquinante(inquinante, 0, "00E676", "FFEA00");
            break;
        case (50 <= inquinante <= 99):
            calcolagradienteinquinante(inquinante, 50, "FFEA00", "FFC600");
            break;
        case (100 <= inquinante <= 149):
            calcolagradienteinquinante(inquinante, 100, "FFC600", "FF5722");
            break;
        case (150 <= inquinante <= 199):
            calcolagradienteinquinante(inquinante, 150, "FF5722", "9E005D");
            break;
        case (inquinante >= 200):

            //
            break;
        default:
            console.log("inquinanteiqa nd");
            break;
    };
}

function calcolagradienteinquinante(inq, baseratioq, colorq1, colorq2) {
    // console.log(ratio);
    var ratioq = 0;
    console.log("baseinq " + baseratioq);
    console.log("inq " + inq);
    console.log("col1inq " + colorq1);
    console.log("col2inq " + colorq2);

    ratioq = [(inq - baseratioq) * 2] / 10;
    ratioq = Math.floor(ratioq);
    //numero con solo una cifra decimale
    ratioq = Math.round(ratioq * 10) / 100;
    var hex = function (x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(colorq1.substring(0, 2), 16) * ratioq + parseInt(colorq2.substring(0, 2), 16) * (1 - ratioq));
    var g = Math.ceil(parseInt(colorq1.substring(2, 4), 16) * ratioq + parseInt(colorq2.substring(2, 4), 16) * (1 - ratioq));
    var b = Math.ceil(parseInt(colorq1.substring(4, 6), 16) * ratioq + parseInt(colorq2.substring(4, 6), 16) * (1 - ratioq));

    var middle = hex(r) + hex(g) + hex(b);

    var nsu500 = 0;

    nsu500 = (inq * 100) / 500;
    nsu500 = Math.trunc(nsu500);
    console.log("nsu500 " + nsu500);
    //(x:100=inq:500) (inq*100)/500

    console.log("inq rgb(" + r + "," + g + "," + b + ")");
    $("#barpm10 .barrain ").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    $("#barpm10 .barrain ").css("width", nsu500 + "%");
    //$("div.block.rainbow ").css("animation", "none");
};








function getdatigrezzi() {
    console.log("dati grezzi");
    //   var dati;
    var url = "https://www.arpae.it/qualita-aria/bollettino-qa/json";

    $.ajax({
        dataType: "json",
        url: url,
        //  data: data,
        type: "GET",
        success: function (a) {
            datigrezzi = a;
            console.log(a, 1);
            stampainquinanti(pm10);
        },
        error: function (b) {
            console.log(b, 2);

        }
    });


};

function calcolagradiente() {


    //numero intero
    iqa = Math.trunc(iqa);
    // console.log(ratio);
    var color1 = colorealto;
    var color2 = colorebasso;
    ratio = [(iqa - baseratio) * 2] / 10;
    ratio = Math.floor(ratio);
    //numero con solo una cifra decimale
    ratio = Math.round(ratio * 10) / 100;
    var hex = function (x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
    var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
    var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

    var middle = hex(r) + hex(g) + hex(b);

    console.log("rgb(" + r + "," + g + "," + b + ")");
    $("div.block.rainbow ").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    //$("div.block.rainbow ").css("animation", "none");
};

///////////////share plugin ///////////////////

function shareMeNow(message, subject, files, url) {
    // this is the complete list of currently supported params you can pass to the plugin (all optional) 
    var options = {
        message: message ? entityToHtml(message) : '', // not supported on some apps (Facebook, Instagram) 
        subject: subject ? entityToHtml(subject) : 'Share this:', // fi. for email 
        files: "", // o NO, an array of filenames either locally or remotely 
        url: url || 'http://fondazioneinnovazioneurbana.it/labaria/',
    };

    var onSuccess = function (result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true 
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false) 
    };

    var onError = function (msg) {
        console.log("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

$('#shareiqa').click(function () {
    console.log("bottone_share");
    shareMeNow("Che Aria è", "Lab Aria", "../ariademo.png", "http://www.fondazioneinnovazioneurbana.it/progetto/laboratorioaria");

});
$('#altri').click(function () {
    $('#tuttidati').toggleClass("hide")
});


function bottonipreferenze(){
$('#portos').click(function () {
    //   var dati;
    var url = "http://www.fondazioneinnovazioneurbana.it/index.php?option=com_content&view=article&id=1840&Itemid=1107&lang=it";

    $.ajax({
        dataType: "html",
        url: url,
        //  data: data,
        type: "GET",
        success: function (a) {
            console.log(a, 1);
             console.log("bene");
        },
        error: function (b) {
            console.log(b, 2);
        }
    });
});
};