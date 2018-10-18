Applicazione per il laboratorio partecipato di Bologna sulla qualità dell'aria.

Primi obiettivi:
A-sapere giornalmente l'IQA
B-avere una frase di approfondimento ogni giorno
C-sapere delle stazioni di fondo il valore peggiore degli inquinanti

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

##Raggiungere il primo risultato A:

1- avere lo splashscreen ed una app che si avvia
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html

2- accedere al network.
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html

3- adattare la Policy sulle risorse:
Stappata:
 <meta http-equiv="Content-Security-Policy" content="default-src * 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

4- scrivere la richiesta CORS
https://www.test-cors.org/#?client_method=GET&client_credentials=false&client_postdata=%0A&server_url=https%3A%2F%2Fapps.arpae.it%2FREST%2Fqa_modello%2F20181016&server_enable=true&server_status=200&server_credentials=false&server_tabs=remote&client_headers=%0A
https://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request

5- avere la data di oggi da mettere nella richiesta REST

Verificato che lato server le API ci premettono di avere il dato, passiamo alla grafica, che i contenuti anche se grezzi, ci sono!

::::::::::: git tag v01.00
commit 35c41b4491a360d2f1ec439e30bb5c6943cdc0c5
_______________________________________________________

###Da qui in poi si passa in grafica con Framework7;

template di partenza: single
https://github.com/framework7io/framework7-template-single-view

- aggiungere anche la piattaforma browser di cordova in modo da debuggare più rapidamente

- unire l'index attuale con il template

git tag v01.01
commit deaa132b7619c139d42e490281449affa755fe93

- impostare la data odierna in cima

- fatta una paginetta informazioni

- creare la schermata colorata mentre fa il check della connessione *questo è da disattivare nella versione webapp*

- schermata in caso non abbia una connessione *questo è da disattivare nella versione webapp*

- schermata in caso abbia una connessione e dia quindi il risultato 

git tag v01.02

##Raggiungere il risultato B:

