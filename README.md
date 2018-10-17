Applicazione per il laboratorio partecipato di Bologna sulla qualità dell'aria.

Primi obiettivi:
1-sapere giornalmente l'IQA
2-sapere le stazioni di fondo il valore peggiore
3-avere una frase di approfondimento ogni giorno


Sviluppo:
Applicazione ibrida per android ed ios.

    $cordova create appAria it.fondazioneinnovazioneurbana.apparia appAria

Plugin installati:

    $cordova plugin add cordova-plugin-splashscreen
    $cordova plugin add cordova-plugin-network-information

Tutto il progetto web è in www. Dentro a www usare "bower install", che scaricherà le dipendenze.

!! Policy sulle risorse:
Stappata:    
 <meta http-equiv="Content-Security-Policy" content="default-src * 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

