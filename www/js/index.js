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
        checkConnection();
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
           // noconnessione();
        }, 9000);
        //alert('Non sei connesso ad internet, connettiti ad una rete per procedere.');
        return false

    } else {
        //display_results("h1", "ok");
        return true
    }
}
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
var mese = today.getMonth() + 1;
var annon = today.getYear();
var annok = annon.toString();
// data per la query alle API arpa per IQA
var dataarpa = "20" + annok.slice(1) + mese.toString() + today.getDate();

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
    display_results("h3", responseText);
             setTimeout(function () {
            connesso();
        }, 9000);
    console.log(responseText);
    // process the response.
};

xhr.onerror = function () {
    //display_results("h3", 'There was an error!');
    console.log('There was an error!');
};


xhr.send();



/*///////////////fine utilities//////////////*/

function noconnessione() {
    $("div.block.rainbow ").css("background-color", "grey")
    $("#noconnesso").removeClass("hide");
    display_results("h1", "Errore");
}

function connesso() {
    $("div.block.rainbow ").css("background-color", "#00E676")
    $("#connesso").removeClass("hide");
}
