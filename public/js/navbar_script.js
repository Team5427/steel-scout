$(window).on('load', function() {
    loadNavbar();
});

function loadNavbar(){
    var nav = document.getElementById("navbar");
    while (nav.firstChild) {
        nav.removeChild(table.firstChild);
    }



    var steel = document.createElement("a");
    steel.href = "pit_scouting_manage.html";
    steel.innerHTML = "Steel-Scout";

    var pitscoutref = document.createElement("a");
    pitscoutref.href = "pit_scouting_manage.html";
    pitscoutref.innerHTML = "Pit Scout";

    var scoutref = document.createElement("a");
    scoutref.href = "scouting_manage.html";
    scoutref.innerHTML = "Scout"

    var competitionsref = document.createElement("a");
    competitionsref.href = "manage_competitions.html";
    competitionsref.innerHTML = "Competitions";

    var seasonsref = document.createElement("a");
    seasonsref.href = "manage_seasons.html";
    seasonsref.innerHTML = "Seasons";

    var teamsref = document.createElement("a");
    teamsref.href = "manage_teams.html";
    teamsref.innerHTML = "Teams";


    var scoutersref = document.createElement("a");
    scoutersref.href = "manage_scouters.html";
    scoutersref.innerHTML = "Scouters";

    var rankingsref = document.createElement("a");
    rankingsref.innerHTML = "Rankings"
    rankingsref.href = "manage_rankings.html";

    nav.appendChild(steel);
    nav.appendChild(pitscoutref);
    nav.appendChild(scoutref)
    nav.appendChild(competitionsref)
    nav.appendChild(seasonsref);
    nav.appendChild(teamsref);
    nav.appendChild(scoutersref)
    nav.appendChild(rankingsref);
}