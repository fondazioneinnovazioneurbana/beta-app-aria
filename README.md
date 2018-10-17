Applicazione per il laboratorio partecipato di Bologna sulla qualità dell'aria.

Primi obiettivi:
A-sapere giornalmente l'IQA
B-sapere le stazioni di fondo il valore peggiore
C-avere una frase di approfondimento ogni giorno


Sviluppo:
Applicazione ibrida per android ed ios.

    $cordova create appAria it.fondazioneinnovazioneurbana.apparia appAria

Plugin installati:

    $cordova plugin add cordova-plugin-splashscreen
    $cordova plugin add cordova-plugin-network-information

Tutto il progetto web è in www. Dentro a www usare "bower install", che scaricherà le dipendenze.
"dependencies": {
    "framework7": "^2.0.7",
    "normalize.css": "^8.0.0",
    "jquery": "^3.3.1"
  }

Raggiungere il primo risultato A:

1- avere lo splashscreen ed una app che si avvia
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html

2- accedere al network.
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html

3- avere il toaster che ti avverte in caso il tuo network non funzionasse.

3- adattare la Policy sulle risorse:
Stappata:
 <meta http-equiv="Content-Security-Policy" content="default-src * 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

4- scrivere la richiesta CORS

5- esporre il dato

Raggiungere il risultato B:

