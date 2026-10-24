//  Gestione giocatori
//
//         la funziona di stampa classifica deve essere riportata nel js che lo lancia

var getEloRun = false;
var calcolaClassificaGiocatoriRun = false;

var giocatori = [];

//
//  Coda di richieste verso chess.com: poche chiamate in parallelo, retry con
//  attesa crescente e numero massimo di tentativi (evita 429 e loop infiniti).
//  NB: quando chess.com risponde con un errore (429, 5xx) senza header CORS il
//  browser segnala "blocked by CORS policy": in realtà è un problema di rate limit.
//
var coda = [];
var inCorso = 0;
var MAX_PARALLELE = 8;
var MAX_TENTATIVI = 5;

function accoda(url, ok, fail) {
    coda.push({ url: url, ok: ok, fail: fail, t: 0 });
    avanza();
}

function avanza() {
    while (inCorso < MAX_PARALLELE && coda.length) {
        inCorso++;
        esegui(coda.shift());
    }
}

function esegui(job) {
    $.getJSON(job.url)
        .done(function (d) {
            try { job.ok(d); } catch (e) { console.error('Errore elaborando ' + job.url, e); }
        })
        .fail(function (jqXhr) {
            job.t++;
            //404 = utente/match inesistente: inutile riprovare
            if (job.t < MAX_TENTATIVI && !(jqXhr && jqXhr.status == 404)) {
                //Probabile rate limit: riduco il parallelismo
                MAX_PARALLELE = Math.max(2, MAX_PARALLELE - 1);
                setTimeout(function () { coda.push(job); avanza(); }, 1000 * job.t);
            } else {
                try { if (job.fail) job.fail(); } catch (e) { console.error('Errore su ' + job.url, e); }
            }
        })
        .always(function () { inCorso--; avanza(); });
}

//Percentuale di avanzamento (match caricati sul totale) nella label "Attendere..."
function aggiornaProgresso() {
    var totale = 0, fatti = 0;
    for (var i in matchs) {
        totale++;
        if (!matchs[i].daCaricare) fatti++;
    }
    var pct = totale ? Math.floor(fatti * 100 / totale) : 100;
    $('#giocatori-elaborazione h1').text('Attendere, estrazione dati in corso: ' + pct + '%');
}

function sel(prefisso, username) {
    return $('[id="' + prefisso + username + '"]');
}

//Cache nel browser (localStorage), con scadenza
function cacheGet(chiave, ttlMs) {
    try {
        var v = JSON.parse(localStorage.getItem(chiave));
        if (v && (Date.now() - v.t) < ttlMs) return v.d;
    } catch (e) {}
    return null;
}
function cacheSet(chiave, dato) {
    try { localStorage.setItem(chiave, JSON.stringify({ t: Date.now(), d: dato })); } catch (e) {}
}

var TTL_PROFILO = 7 * 24 * 3600 * 1000;   //avatar/nome: 7 giorni
var TTL_ELO = 6 * 3600 * 1000;            //ELO: 6 ore

function applicaProfilo(username, p) {
    giocatori[username].avatar = p.avatar;
    giocatori[username].url = p.url;
    giocatori[username].displayName = p.displayName;
    sel('av-', username).attr('src', p.avatar);
    sel('nm-', username).attr('href', p.url).text(' ' + p.displayName);
}

function applicaElo(username, elo) {
    giocatori[username].elo = elo;
    sel('elo-', username).text(elo);
}

var dettagliRichiesti = {};

//Carica avatar ed ELO di un singolo giocatore (una volta sola)
function caricaDettagli(username) {
    if (dettagliRichiesti[username] || !giocatori[username]) return;
    dettagliRichiesti[username] = true;

    var p = cacheGet('cis-p-' + username, TTL_PROFILO);
    if (p) {
        applicaProfilo(username, p);
    } else {
        accoda('https://api.chess.com/pub/player/' + username,
            function (d) {
                var prof = {
                    avatar: d.avatar ? d.avatar : "img/pedone.png",
                    url: d.url,
                    displayName: d.url.substr(29)
                };
                cacheSet('cis-p-' + username, prof);
                applicaProfilo(username, prof);
            });
    }

    var e = cacheGet('cis-e-' + username, TTL_ELO);
    if (e !== null) {
        applicaElo(username, e);
    } else {
        accoda('https://api.chess.com/pub/player/' + username + '/stats',
            function (d) {
                var elo = (d.chess_daily && d.chess_daily.last) ? d.chess_daily.last.rating : 1200;
                cacheSet('cis-e-' + username, elo);
                applicaElo(username, elo);
            },
            function () { applicaElo(username, 'n/d'); });
    }
}

//Chiamata alla fine della pagina: stampa SUBITO la classifica (i punti sono già noti)
//e carica avatar ed ELO solo per le righe visibili (o vicine allo schermo).
function getAvatar() {
    //Valori provvisori
    for (var username in giocatori) {
        giocatori[username].avatar = "img/pedone.png";
        giocatori[username].url = 'https://www.chess.com/member/' + username;
        giocatori[username].displayName = username;
        giocatori[username].elo = '...';
    }

    calcolaClassificaGiocatoriRun = true;
    calcolaClassificaGiocatori();
    $('#giocatori-elaborazione').hide();

    var righe = $('#giocatori tr[data-user]');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    obs.unobserve(en.target);
                    caricaDettagli($(en.target).attr('data-user'));
                }
            });
        }, { rootMargin: '400px' });
        righe.each(function () { obs.observe(this); });
    } else {
        //Browser vecchio: carico tutto
        righe.each(function () { caricaDettagli($(this).attr('data-user')); });
    }
}

function creaGiocatore(apiUsername) {
    //Uso apiUsername perchè così posso inviare sia username che displayname
    var username = apiUsername.toLowerCase()
    giocatori[username] = {};
    giocatori[username].username = username;
    giocatori[username].url = '';
    giocatori[username].displayName = '';
    //lo assegno quando lo trovo giocatori[username].avatar = '';
    //lo assegno quando lo trovo giocatori[username].elo = 0;
    giocatori[username].punti = 0;
    giocatori[username].puntiSpareggio = 0;
    giocatori[username].posizione = 0;
    giocatori[username].vinte = 0;
    giocatori[username].perse = 0;
    giocatori[username].patte = 0;
    giocatori[username].userVinte = [];
    giocatori[username].userPatte = [];
}

function setPunti(username, risultato)
{
    //Se non esiste lo creo
    if (! giocatori[username]) {
        creaGiocatore(username);
    }

    //Se risultato non definito la partita non è finita
    if (! risultato)
        return;

    //aggiorno punteggio
    if ( risultato == 'win') {
        giocatori[username].punti ++;
        giocatori[username].vinte ++;
        //???????? NON POSSO CALCOLARE TIE-BREK
        //giocatori[username].userVinte.push(username2);
    } else {
        if ((risultato == 'agreed') || (risultato == 'repetition')  || (risultato == 'timevsinsufficient') || 
        (risultato == '50move') || (risultato == 'insufficient') || (risultato == 'stalemate')  ){
                giocatori[username].punti += 0.5;
                giocatori[username].patte ++;
                //???????? NON POSSO CALCOLARE TIE-BREK
                //giocatori[username].userPatte.push(username2);
            } else {
                giocatori[username].perse ++;
            }
    }
}

function calcolaClassificaGiocatori()
{
    //calcolo punti spareggio
    /*   Non Usato
    for (var username in giocatori)
    {
        for (var i in giocatori[username].userVinte)
            giocatori[username].puntiSpareggio += giocatori[giocatori[username].userVinte[i]].punti;
        for (var i in giocatori[username].userpatte)
            giocatori[username].puntiSpareggio += giocatori[giocatori[username].userPatte[i]].punti / 2;
    }
    */

    //Imposto posizione e salvo
    var username = '';
    var max = 0;
    var maxSpareggio = 0;
    var posizione = 0;
    var nPareggi = 0;
    var oldMax = 0;
    var oldSpareggio = 0;
    while (max > -1)
    {
        max = -1;
        maxSpareggio = -1;
        for (var i in giocatori)
        {
            if ((giocatori[i].posizione == 0) && (giocatori[i].punti > max || (giocatori[i].punti == max) && giocatori[i].puntiSpareggio > maxSpareggio)) {
                username = i;
                max = giocatori[i].punti;
                maxSpareggio = giocatori[i].puntiSpareggio;
            }
        }
        if (max > -1) 
        {
            if (oldMax == max && oldSpareggio == maxSpareggio )
            {
                nPareggi++;
            } else {
                posizione++;
                posizione += nPareggi;
                nPareggi = 0;
                oldMax = max;
                oldSpareggio = maxSpareggio;
            }    
           giocatori[username].posizione = posizione;
           //Stampo il giocatore
           stampaGiocatore(username);
        }
    }
   
 }
 
function stampaGiocatore(username)
{
    //stampo riga    
    $("#giocatori").append('<tr class="classifica-giocatori" data-user="' + username + '">' +
        '<td class="classifica-col1">' + giocatori[username].posizione + '</td>' +  
        '<td class="giocatori-col1SEP"></td>' + 
        '<td class="classifica-col2">' +
        '    <table><tr>' +
        '        <td>' +
        '        <img class="classifica-avatar" id="av-' + username + '" src="' + giocatori[username].avatar + '">' +
        '    </td>' +
        '    <td width=7px></td>' +
        '    <td><div>' +
        '            <a class="username" id="nm-' + username + '" href="' + giocatori[username].url + '" target=”_blank”> ' + giocatori[username].displayName + '</a>' +
        '        </div> <div>  (<span id="elo-' + username + '">' + giocatori[username].elo + '</span>) </div>' +
        '        </td>' +    
        '    </tr></table>' +
        '</td>' +
        '<td class="classifica-col3">' + giocatori[username].punti +'</td>' +
       // '<td class="classifica-col3">' + giocatori[username].puntiSpareggio +'</td>' +
        '<td class="classifica-col4"> <span class="game-win">' +  giocatori[username].vinte + ' W</span> /'+
        '<span class="game-lost">' +  giocatori[username].perse + ' L</span> /' +
        '<span class="game-draw">' +  giocatori[username].patte + ' D</span>' +
        '</td>' +
        '</tr>'
    );
}