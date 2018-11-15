# Applicazione per il laboratorio partecipato di Bologna sulla qualità dell'aria.

Primi obiettivi:

A-sapere giornalmente l'IQA

B-avere una frase di approfondimento ogni giorno

C-sapere dalle stazioni di fondo il valore peggiore degli inquinanti

Sviluppo:

Applicazione ibrida per web, android ed ios.

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

Per buildare l'app bisogna avere gli SDK appropiati e il .bash_profile adatto.

    $cordova platforms add browser
    $cordova platforms add android
    $cordova platforms add ios

Poi

    $cordova run browser
    $cordova run android
    $cordova run ios

Al momento della pubblicazione è necessario pacchettizzarla non in debug e firmarla per caricarla nei rispettivi store.


# Tappe della sviluppo

## Raggiungere il primo risultato A:

1- avere lo splashscreen ed una app che si avvia
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html

2- accedere al network.
Doc plugin: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html

3- adattare la Policy sulle risorse:
    <meta http-equiv="Content-Security-Policy" content="default-src * 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

4- scrivere la richiesta CORS

https://www.test-cors.org/#?client_method=GET&client_credentials=false&server_url=https%3A%2F%2Fapps.arpae.it%2FREST%2Fqa_modello%2F20181018%3Fprojection%3D%7B%22dati.istat_037006%22%3A1%7D&server_enable=true&server_status=200&server_credentials=false&server_tabs=remote


https://www.test-cors.org/#?client_method=GET&client_credentials=false&client_postdata=%0A&server_url=https%3A%2F%2Fapps.arpae.it%2FREST%2Fqa_modello%2F20181016&server_enable=true&server_status=200&server_credentials=false&server_tabs=remote&client_headers=%0A
https://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request

5- avere la data di oggi da mettere nella richiesta REST

Verificato che lato server le API ci premettono di avere il dato, passiamo alla grafica, che i contenuti anche se grezzi, ci sono!

::::::::::: git tag v01.00
commit 35c41b4491a360d2f1ec439e30bb5c6943cdc0c5
_______________________________________________________

### Da qui in poi si passa in grafica con Framework7;

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
commit feecb36414ac49b1ef36a2edaa760f9bdecf0677

- pulire la risposta json dell'IQA

- crearsi una scala ed avere il feedback utente: colore ed aggettivo.
riferimento: https://www.arpae.it/dettaglio_generale.asp?id=938&idlivello=134&disab_redirautom_mob=1

- segnaposto per frase e sotto frase

git tag v01.03
commit 8dc5dc6e5708b8398a49f600394117983136141f

## Raggiungere il risultato B:

Abbiamo un foglio di calcolo in cui ci hanno passato le frasi divise nei 5 aggettivi dell'IQA.
Le frasi online sono feed RSS ed hanno: data, titolo e contenuto (con fonte). 
Le frasi offline sono JSON ed hanno: titolo e contenuto (con fonte) e in localstorage le 5 liste degli indici delle frasi già usate (a raggiungimento della lunghezza massima si azzerano).
Il nostro script deve: guardare se in un feed RSS c'è la frase di oggi. Se si scriverla.
Se no andare nelle liste di frasi in locale e darne una della tipologia giusta e senza riperterle finchè le ha finite.

git commit
commit 0260b524261818c3c32945d4b572ec81759797da

## Raggiungere il risultato C:

Test di CORS lato server: https://www.test-cors.org/#?client_method=GET&client_credentials=false&server_url=https%3A%2F%2Fwww.arpae.it%2Fqualita-aria%2Fbollettino-qa%2Fjson&server_enable=true&server_status=200&server_credentials=false&server_tabs=remote

Intanto grafica C delle tabelle degli inquinanti
Gli istogrammi orizzontali sono in css, senza librerie grafiche aggiunte.

git tag v01.04
commit 8e412b861e40be76a80620c7d4949ba49017756f


## Sviluppo logica delle frasi del giorno:

Aggiungo 5 file json, uno per aggettivo.
mi segno un indice a cui sono ed un array con la sequenza che seguo e la lunghezza dell'oggetto delle frasi.
quindi di ognuna alla prima occorrenza mi segno in local storage queste tre cose suddette.
poi in ordine controllo: 
se la lunghezza dell'oggetto delle frasi è uguale a prima; 
se sì apposto, sennò cancello quello che mi son segnata e riprendo la funzione da capo;
quindi mi leggo a che punto sono, in base al punto in cui sono arrivata nell'array scrivo la frase successiva e mi segno di nuovo l'indice in cui sono.


## Sviluppo delle diverse aree già illustrate:

* lettura dati grezzi commit 1496aaeab437125b715e536c7cce20fc7cb4b8c6

* colore preso da un gradiente tra i due stadi della scala di valori dell'IQA

* pagina crediti commit e15d2cbc4ce938dcee5755e6563f288bccdc8f5b

* scrittura dei dati grezzi degli inquinanti delle stazioni ( ID dalla 29 alla 35 ) e resa grafica 

* condivisione sui social dell'immagine della frase

* frasi per uno specifico giorno da RSS

* mettere degli hook per dividere il deploy android da browser e IOS 



* frasi da fonti online


