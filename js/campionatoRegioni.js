
//        CAMPIONATO.gironi = JSON.parse(stgironi);   

/*
    https://api.chess.com/pub/club/team-toscana
    https://api.chess.com/pub/club/i-lumbard
    https://api.chess.com/pub/club/team-piemonte
    https://api.chess.com/pub/club/team-veneto
    https://api.chess.com/pub/club/team-sicilia
    https://api.chess.com/pub/club/udine-e-fvg
    https://api.chess.com/pub/club/team-trentino-sudtirol
    https://api.chess.com/pub/club/lazio
    https://api.chess.com/pub/club/team-emilia-romagna
    https://api.chess.com/pub/club/team-basilicata
    https://api.chess.com/pub/club/team-calabria
    https://www.chess.com/club/team-napoli-campania
    https://www.chess.com/club/team-liguria	
    https://www.chess.com/club/team-marche
    https://www.chess.com/club/team-puglia
    https://www.chess.com/club/sardegna

*/
var calcolaClassificaRun = false;
var classificaTeams = [];

var albo = [];
albo[3]={"stagione":"2025","primo":"team-calabria", "secondo":"team-emilia-romagna", "terzo": "team-piemonte"};
//albo[3]={"stagione":"2024","primo":"team-calabria", "secondo":"udine-e-fvg", "terzo": "team-emilia-romagna"};
albo[4]={"stagione":"2023","primo":"team-emilia-romagna", "secondo":"team-veneto", "terzo": "team-calabria"};
albo[5]={"stagione":"2022","primo":"team-emilia-romagna", "secondo":"team-calabria", "terzo": "team-marche"};
albo[6]={"stagione":"2021","primo":"team-emilia-romagna", "secondo":"team-piemonte", "terzo": "team-trentino-sudtirol"};
albo[7]={"stagione":"2020","primo":"team-emilia-romagna", "secondo":"team-trentino-sudtirol", "terzo": "team-toscana"};
//albo[8]={"stagione":"2018-2019","primo":"udine-e-fvg", "secondo":"team-emilia-romagna", "terzo": "team-toscana"};
//albo[9]={"stagione":"2016-2017","primo":"udine-e-fvg,team-emilia-romagna", "secondo":"", "terzo": "i-lumbard"};
albo[10]={"stagione":"2014-2015","primo":"i-lumbard", "secondo":"team-toscana", "terzo": "team-sicilia"};
albo[11]={"stagione":"2014","primo":"i-lumbard", "secondo":"", "terzo": ""};

var teams = [];
    teams['team-toscana']={"name":"Team Toscana", "icon":"https://images.chesscomfiles.com/uploads/v1/group/6814.6e1f2b90.50x50o.652227079b62.gif","url":"https://www.chess.com/club/team-toscana","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['i-lumbard']={"name":"I LUMBARD", "icon":"https://images.chesscomfiles.com/uploads/v1/group/16056.48d4e7ff.50x50o.18061584d1fd.jpg","url":"https://www.chess.com/club/i-lumbard","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-piemonte']={"name":"Team Piemonte", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27066.4baa88c6.50x50o.558e34ad0072.gif","url":"https://www.chess.com/club/team-piemonte","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-veneto']={"name":"Team Veneto", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27074.54dee974.50x50o.01648245b9bb.gif","url":"https://www.chess.com/club/team-veneto","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-sicilia']={"name":"Team Sicilia", "icon":"https://images.chesscomfiles.com/uploads/v1/group/5514.8438307c.50x50o.885a60f455da.png","url":"https://www.chess.com/club/team-sicilia","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-trentino-sudtirol']={"name":"Team Trentino-Südtirol", "icon":"https://images.chesscomfiles.com/uploads/v1/group/75676.7a5fc7bb.50x50o.a003bcd4acad.png","url":"https://www.chess.com/club/team-trentino-sudtirol","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-napoli-campania']={"name":"Team Napoli-Campania", "icon":"https://images.chesscomfiles.com/uploads/v1/group/20674.920ec37d.50x50o.0ac20c68644c.jpeg","url":"https://www.chess.com/club/team-napoli-campania","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['lazio']={"name":"Lazio", "icon":"https://images.chesscomfiles.com/uploads/v1/group/79686.ccc20114.50x50o.3f48ffa1aab6.jpeg","url":"https://www.chess.com/club/lazio","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-emilia-romagna']={"name":"Team Emilia-Romagna", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27062.0a0a9729.160x160o.5d684d35f646.jpg","url":"https://www.chess.com/club/team-emilia-romagna","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-basilicata']={"name":"Team Basilicata", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27048.6209b951.50x50o.d3f2039045fd.gif","url":"https://www.chess.com/club/team-basilicata","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-calabria']={"name":"Team Calabria", "icon":"https://images.chesscomfiles.com/uploads/v1/group/4648.71d067f8.50x50o.0334e256f9c2.jpeg","url":"https://www.chess.com/club/team-calabria","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-liguria']={"name":"Team Liguria", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27068.a7031ab4.160x160o.9619e6f20283.gif","url":"https://www.chess.com/club/team-liguria","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-marche']={"name":"Team Marche", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27056.489162c6.160x160o.bb2e9cce5651.gif","url":"https://www.chess.com/club/team-marche","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['team-puglia']={"name":"Team Puglia", "icon":"https://images.chesscomfiles.com/uploads/v1/group/27046.9e649aac.160x160o.bd46233987f2.gif","url":"https://www.chess.com/club/team-puglia","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
    teams['sardegna']={"name":"Sardegna", "icon":"https://images.chesscomfiles.com/uploads/v1/group/183678.37e691e6.160x160o.23a2ef1aab7e.png","url":"https://www.chess.com/club/sardegna","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};
//Solo per Albo
    teams['udine-e-fvg']={"name":"Udine e FVG", "icon":"https://images.chesscomfiles.com/uploads/v1/group/41872.ca4f33d5.50x50o.04a7832adeab.jpeg","url":"https://www.chess.com/club/udine-e-fvg","puntiTotali":0,"puntiSpareggio":0, "posizione":0,  "puntiConclusi":0, "teamVinte" : [], "teamPatte" : [], "albo1":0, "albo2":0, "albo3":0, "puntiAlbo":0, "posizioneAlbo":0};




function elabora() {
        //Carico i dati di tutti i match
    for (var i in matchs) {
        caricaMatch(i, matchs[i].id);
    };
}

function caricaMatch(index, url)
{
    debugger;
    if (url != 'https://api.chess.com/pub/match/')
    {
        //Leggo i dati 
        $.getJSON(url,function(data){

            //leggo team
            var team1 = data.teams.team1.url.substr(27, data.teams.team1.url.length-27);
            var team2 = data.teams.team2.url.substr(27, data.teams.team2.url.length-27);
            //Aggiorno partite
            matchs[index].url = data.url;
            matchs[index].team1 = team1;
            matchs[index].team2 = team2;

            if (data.status != 'registration') 
            {
                matchs[index].iscritti1 = 0;   //Serve per partite in partenza
                matchs[index].iscritti2 = 0;   //Serve per partite in partenza

                matchs[index].boards = data.boards;
                matchs[index].score1 = data.teams.team1.score;
                matchs[index].score2 = data.teams.team2.score;
                if (data.teams.team1.score > data.teams.team2.score) 
                {
                    matchs[index].punti1 ++;
                    teams[team1].teamVinte.push(team2);
                    teams[team1].puntiTotali ++;
                }    
                if (data.teams.team1.score < data.teams.team2.score) 
                {
                    matchs[index].punti2 ++;
                    teams[team2].teamVinte.push(team1);
                    teams[team2].puntiTotali ++;
                }        
                if (data.teams.team1.score == data.teams.team2.score) {
                    matchs[index].punti1 += 0.5;   
                    matchs[index].punti2 += 0.5;
                    teams[team1].teamPatte.push(team2);
                    teams[team2].teamPatte.push(team1);
                    teams[team1].puntiTotali += 0.5;
                    teams[team2].puntiTotali += 0.5;
                } 

                //Se terminata anche matematicamente
                if (matchs[index].boards * 2 == matchs[index].score1 + matchs[index].score2 || matchs[index].boards < matchs[index].score1 || matchs[index].boards < matchs[index].score2)
                {
                    matchs[index].concluso = true;   //Per colore in tabella
                    //Aggiorno punti solo conclusi
                    teams[team1].puntiConclusi += matchs[index].punti1;  
                    teams[team2].puntiConclusi += matchs[index].punti2;
                }
                //Controllo giocatori
                var username1 = '';
                var username2 = '';
                var risultato = '';
                for (var i in data.teams.team1.players) {
                    username1 = data.teams.team1.players[i].username;
                    username2 = data.teams.team2.players[i].username;
                    //Se partita terminata calcolo punteggio
                    //I GIOCATORI NON SONO ABBINATI. Con questi dati non posso 
                    //  calcolare tie-break
                    risultato = data.teams.team1.players[i].played_as_white;
                    setPunti(username1, risultato);
                    risultato = data.teams.team1.players[i].played_as_black;
                    setPunti(username1, risultato);
                    risultato = data.teams.team2.players[i].played_as_white;
                    setPunti(username2, risultato);
                    risultato = data.teams.team2.players[i].played_as_black;
                    setPunti(username2, risultato);
                }
            } else {
                //Partita in partenza salva giocatori iscritti
                matchs[index].iscritti1 = data.teams.team1.players.length;
                matchs[index].iscritti2 = data.teams.team2.players.length;
                //Usati se iniziata
                matchs[index].boards = 0;
                matchs[index].punti1 = 0;
                matchs[index].punti2 = 0;
                matchs[index].score1 = 0;
                matchs[index].score2 = 0 ;
                matchs[index].concluso = false;

            }

            //Se ho caricato tutti i dati calcolo la classifica
            matchs[index].daCaricare = false;
            for (var i in matchs) {
                if (matchs[i].daCaricare) {
                    return;
                }
            }
        
            //controllo di non aver già lanciato fase sucessiva
            if (calcolaClassificaRun)
                return;  
                calcolaClassificaRun = true;

            //Calcolo la classifica dei team
            calcolaClassifica();
      
        }).error(function(jqXhr, textStatus, error) {
            //è andato in errore ricarico i dati
            //Se responseJSON non è valorizzato solo se il record esiste    
            if (! jqXhr.responseJSON)
            {
                console.log('ERRORE ricarico dati: ' + this.url);
                var index = 0;
                    for (var i in matchs) {
                        if (matchs[i].url = this.url)
                            index = i;
                    };
                    caricaMatch(index, this.url);    
                } else {
                    console.log('ERRORE Match non valida. ' + this.url);
                    console.log('ERRORE Match non valida. ' + this.url);
                    console.log('ERRORE Match non valida. ' + this.url);
                    console.log('ERRORE Match non valida. ' + this.url);
                }
              
            });
    } else {
            //Se ho caricato tutti i dati calcolo la classifica
            matchs[index].daCaricare = false;
            for (var i in matchs) {
                if (matchs[i].daCaricare) {
                    return;
                }
            }
        
            //controllo di non aver già lanciato fase sucessiva
            if (calcolaClassificaRun)
                return;  
                calcolaClassificaRun = true;

            //Calcolo la classifica dei team
           calcolaClassifica();
    }
};

//calcolo classifica team
function calcolaClassifica()
{
    //calcolo punti spareggio
    for (var nameTeam in teams)
    {
        for (var i in teams[nameTeam].teamVinte)
            teams[nameTeam].puntiSpareggio += teams[teams[nameTeam].teamVinte[i]].puntiTotali;
        for (var i in teams[nameTeam].teamPatte)
            teams[nameTeam].puntiSpareggio += teams[teams[nameTeam].teamPatte[i]].puntiTotali / 2;
    }

    //Imposto posizione e salvo
    var gruppo = '';
    var max = -1;
    var maxSpareggio = 0;
    var posizione = 0;
    var oldMax = -1;
    var oldSpareggio = -1;
    var nPareggi = 0;
    var puntiClassifica = 0;
    while (max > -100)
    {
        max = -200;
        maxSpareggio = -1;
        for (var i in teams)
        {
            //Scelgo i punti (da conclusi oi in corso)
            puntiClassifica = teams[i].puntiTotali;

            if ((teams[i].posizione == 0) && (puntiClassifica > max || (puntiClassifica == max) && teams[i].puntiSpareggio > maxSpareggio)) {
                gruppo = i;
                max = puntiClassifica;
                maxSpareggio = teams[i].puntiSpareggio;
            }
        }
        if (max > -100) 
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
            teams[gruppo].posizione = posizione;
            //Aggiungo il team nella posizione corretta
            classificaTeams.push(gruppo);
        }
    }

    //Stampo la classifica
    var url  = '';
    var stile = '';
    var stileTD = '';
    var gruppoAvversario = '';
    var risultato = '';
    var boards = '';
    var score1 = 0;
    var score2 = 0;
    var iscritti1 = 0;
    var iscritti2 = 0;
    var partitaConclusa = false;
    //Riga con nomi teams    
    var stRiga = '<tr class="classifica-nameTeam">' +
            '<td style="background-color:gray;"></td><td style="background-color:gray;"></td><td style="background-color:gray;">' + 
            //'</td><td style="background-color:gray;">'+
            '</td><td style="background-color:gray;"></td></td><td style="background-color:gray;"></td></td><td style="background-color:gray;"></td>' +
            '<td class="classifica-col1SEP"></td>'; 
    for (var i in classificaTeams)         
        stRiga += '<td class="classifica-nameTeam"> <a style="color:black;text-decoration: none;font-weight: normal;" href="' + teams[classificaTeams[i]].url + '" target=”_blank”> ' + teams[classificaTeams[i]].name + '</a></td>';
    stRiga += '</tr>'
    $("#classifica").append(stRiga);
    //Riga con Icone    
    stRiga = '<tr class="classifica-icon">' +
            '<td class="classifica-icon" style="background-color:#E2E2FF;">Pos.</td> <td style="background-color:#E2E2FF;">Team</td><td style="background-color:#E2E2FF;"></td>'+
            '<td class="classifica-icon">Punti</td>' +
            '<td class="classifica-icon">Tie Break</td>'+
            '<td class="classifica-icon">Punti dai match conclusi</td>' +
            '<td class="classifica-col1SEP"></td>'; 
    for (var i in classificaTeams)         
        stRiga += '<td  class="classifica-icon">  <img class="classifica-avatar" src="' + teams[classificaTeams[i]].icon + '">';
    stRiga += '</tr>'
    $("#classifica").append(stRiga);
    //Riga team
    for (var i in classificaTeams)         
    {
        gruppo = classificaTeams[i];
        stRiga = '<tr class="classifica-risultati">' +
            '<td class="classifica-risultati">' + teams[gruppo].posizione + '</td>' +
            '<td class="classifica-risultati" style="border: 0px;"> <a style="color:black;text-decoration: none;font-weight: normal;" href="' + teams[classificaTeams[i]].url + '" target=”_blank”> ' + teams[classificaTeams[i]].name + '</a></td>' +
            '<td class="classifica-risultati" style="border: 0px;"> <img class="classifica-avatar" src="' + teams[classificaTeams[i]].icon + '"></td>' +
            '<td class="classifica-risultati">' + teams[gruppo].puntiTotali + '</td>' + 
            '<td class="classifica-risultati">' + teams[gruppo].puntiSpareggio + '</td>' +
            '<td class="classifica-risultati">' + teams[gruppo].puntiConclusi + '</td>' +  
            '<td class="classifica-col1SEP" style="border: 0px;"></td>'; 
        for (var ii in classificaTeams)         
        {
            gruppoAvversario  = classificaTeams[ii];
            stile = '';
            stileTD = '';
            risultato = '';
            partitaConclusa = false;
            if  (gruppo == gruppoAvversario)
            {
                url = '';
                stile = 'background-color:#b3b3b3;';
            } else {
                //Ricerco partita
                boards = 0;
                url = '';
                for (var partita in matchs)         
                {
                    //team da stampare sulla riga è team1
                    if (matchs[partita].team1 == gruppo && matchs[partita].team2 == gruppoAvversario)
                    {
                        url = matchs[partita].url;
                        boards = matchs[partita].boards;
                        score1 = matchs[partita].score1;
                        score2 = matchs[partita].score2;
                        iscritti1 = matchs[partita].iscritti1;
                        iscritti2 = matchs[partita].iscritti2;
                        partitaConclusa = matchs[partita].concluso;
                    } 
                    //team da stampare sulla riga è team2
                    if (matchs[partita].team2 == gruppo && matchs[partita].team1 == gruppoAvversario)
                    {
                        url = matchs[partita].url;
                        boards = matchs[partita].boards;
                        score1 = matchs[partita].score2;
                        score2 = matchs[partita].score1;
                        iscritti1 = matchs[partita].iscritti2;
                        iscritti2 = matchs[partita].iscritti1;
                        partitaConclusa = matchs[partita].concluso;
                    }
                }

                //Se la partita esiste
                if (boards > 0)
                {
                    //Se terminata
                    if (partitaConclusa)
                    {
                        //Pareggio
                        if (score1 == score2)
                        {
                            risultato = '0.5 - 0.5 <BR> (' + score1 + ' - ' + score2 + ')';
                            stileTD = 'style="background-color:#84b2ed;border: 1px solid black;"';   //PAREGGIO
                            stile = 'color:black;font-weight: bold;';
                        } 
                        //Vinto team 1
                        if (score1 > score2)
                        {
                            risultato = '1 - 0 <BR> (' + score1 + ' - ' + score2 + ')';
                            stileTD = 'style="background-color:#4bc74b;border: 1px solid black;"'; //VINTO
                            stile = 'color:black;font-weight: bold;';
                        } 
                        //Vinto team 2
                        if (score1 < score2)
                        {
                            risultato = '0 - 1 <BR> (' + score1 + ' - ' + score2 + ')';
                            stileTD = 'style="background-color:#f75959;border: 1px solid black;"';  //PERSO
                            stile = 'color:black;font-weight: bold;';
                        } 
                    } else {
                        //Match da terminare
                        risultato = score1 + ' - ' + score2 + '<BR> ('+ (score1+score2) + '/' + (boards*2) + ')';
                        //Pareggio
                        if (score1 == score2)
                            stile = 'color:blue;';
                        //Vinto team 1
                        if (score1 > score2)
                            stile = 'color:green;';
                        //Vinto team 2
                        if (score1 < score2)
                            stile = 'color:red;';
                        stileTD = 'style="border: 1px solid black;"';  //PERSO
                    }
                } else {
                    //Partita non ancora iniziata
                    risultato = '(' + iscritti1 + ' - ' + iscritti2 + ')';
                    stileTD = 'style="border: 1px solid black;"';  
                    stile = 'color:black';

                }
            }
                    

            //Scrivo valori calcolati nella cella
            if (url == '')   //stessa squadra
                stRiga += '<td class="classifica-risultati" style="' + stile + '"> </td>'
            else
               stRiga += '<td ' + stileTD + '> <a style="text-decoration: none;font-weight: normal;' + stile + ' " href="' + url +'" target=”_blank”>' + risultato + '</a></td>';
        }
        stRiga += '</tr>'
        $("#classifica").append(stRiga);
    }

    //Calcolo e stampo medagliere
    stampaMedagliere();
}

//calcola e stampa Medagliere
function stampaMedagliere()
{
    //Calcolo punteggi
    for (var index in albo) {
        //Calcolo punti
        let myArray = albo[index].primo.split(",");        
        if (myArray.length > 0)
        {
            teams[myArray[0]].puntiAlbo += 10000;
            teams[myArray[0]].albo1 ++;
        }
        if (myArray.length > 1)
        {
            teams[myArray[1]].puntiAlbo += 10000;
            teams[myArray[1]].albo1 ++;
        }
        if (albo[index].secondo != '')
        {
            teams[albo[index].secondo].puntiAlbo += 100;
            teams[albo[index].secondo].albo2 ++;
        }
        if (albo[index].terzo != '')
        {
            teams[albo[index].terzo].puntiAlbo += 1;
            teams[albo[index].terzo].albo3 ++;
        }
    }

    //Imposto posizione e stampo
    var team = '';
    var max = 0;
    var posizione = 0;
    var nPareggi = 0;
    var oldMax = 0;
    var riga = "";
    while (max > -1)
    {
        max = -1;
        for (var i in teams)
        {
            if ((teams[i].posizioneAlbo == 0) && (teams[i].puntiAlbo > max) && (teams[i].puntiAlbo > 0)) {
                team = i;
                max = teams[i].puntiAlbo;
            }
        }
        if (max > -1) 
        {
            if (oldMax == max)
            {
                nPareggi++;
            } else {
                posizione++;
                posizione += nPareggi;
                nPareggi = 0;
                oldMax = max;
            }    
           teams[team].posizioneAlbo = posizione;

           //Stampo il giocatore
           riga = '<tr class="riga">' +   
                '<td class="classifica-col1">#'  + teams[team].posizioneAlbo + '</td> ' + 
                '<td class="classifica-col2"> <table><tbody><tr> <td> <img class="classifica-avatar" src="' + teams[team].icon + '">    </td>' +
                '<td width="7px"></td>'+
                '<td><div>            <a class="username" href="' + teams[team].url + '" target="”_blank”">' + teams[team].name + '</a>        </div>         </td>    </tr>'+
                    '</tbody></table> </td> ' +
                '<td class="classifica-colCenter">' + teams[team].albo1 + '</td> <td class="classifica-colCenter">' + teams[team].albo2 + '</td>  <td class="classifica-colCenter">' + teams[team].albo3 + '</td>'+
           '</tr>';
   
           $("#medagliere").append(riga)
    }
   
 }

    //calcola e stampa albo d'oro
    stampaAlboOro();
}

//calcola e stampa albo d'oro
function stampaAlboOro()
{
    var riga = '';
    for (var index in albo) {
        riga = '<tr class="riga">   <td class="classifica-colCenter">'  + albo[index].stagione + '</td>';
        
        let myArray = albo[index].primo.split(",");

        riga += '<td class="classifica-col2"> <table><tbody><tr> <td> <img class="classifica-avatar" src="' + teams[myArray[0]].icon + '">    </td>' +
        '<td width="7px"></td>'+
        '<td><div>            <a class="username" href="' + teams[myArray[0]].url + '" target="”_blank”">' + teams[myArray[0]].name + '</a>        </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
       
        if(albo[index].secondo!='') 
        {
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td> <img class="classifica-avatar" src="' + teams[albo[index].secondo].icon + '">    </td>' +
            '<td width="7px"></td>'+
            '<td><div>            <a class="username" href="' + teams[albo[index].secondo].url + '" target="”_blank”">' + teams[albo[index].secondo].name + '</a>        </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
        } else {
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td>     </td>' +
            '<td width="7px"></td>'+
            '<td><div>                   </div>         </td>    </tr>'+
            '</tbody></table> </td> ';

        }
                
        if(albo[index].terzo!='') 
        {
            riga += '<td class="classifica-col2"> <table><tbody><tr> <td> <img class="classifica-avatar" src="' + teams[albo[index].terzo].icon + '">    </td>' +
            '<td width="7px"></td>'+
            '<td><div>            <a class="username" href="' + teams[albo[index].terzo].url + '" target="”_blank”">' + teams[albo[index].terzo].name + '</a>        </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
        } else {
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td>     </td>' +
            '<td width="7px"></td>'+
            '<td><div>                    </div>         </td>    </tr>'+
            '</tbody></table> </td> ';

        }

        riga += '</tr>';
        //Stampo
        $("#alboOro").append(riga)

            console.log ('myArray.length: ' + myArray.length);
        if(myArray.length > 1)   //Primo pari merito
        {
            console.log ('-------- entrato');
            riga = '<tr class="riga">   <td class="classifica-colCenter"></td>';
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td> <img class="classifica-avatar" src="' + teams[myArray[1]].icon + '">    </td>' +
            '<td width="7px"></td>'+
            '<td><div>            <a class="username" href="' + teams[myArray[1]].url + '" target="”_blank”">' + teams[myArray[1]].name + '</a>        </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td>     </td>' +
            '<td width="7px"></td>'+
            '<td><div>                    </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
            riga +=         '<td class="classifica-col2"> <table><tbody><tr> <td>     </td>' +
            '<td width="7px"></td>'+
            '<td><div>                    </div>         </td>    </tr>'+
            '</tbody></table> </td> ';
            riga += '</tr>';
            console.log (riga)
            //Stampo
            $("#alboOro").append(riga)
        }
    }


    //Ricerco elo e stampo classifica giocatori
    getAvatar();
}

    