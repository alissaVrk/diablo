var iconUrl = "http://eu.media.blizzard.com/d3/icons/items/large/";
var testUrl = "http://eu.battle.net/d3/en/";


var config      = {};
    config.host = "http://eu.battle.net/"                   ;
    config.icon = "http://eu.media.blizzard.com/d3/icons/"  ;
    config.api  = "http://eu.battle.net/api/d3/"            ;
    config.test = "http://eu.battle.net/d3/en/"             ;


var currentProfile = {};

function getData (url) {
    return $.ajax ({ type: "GET", dataType: "jsonp",  url: url });
}

function fetch (url, back) {

    var request = $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp"
    });

    request.done(function(data) {
        var d = data;
    });

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });



}

function hGender (gr) {
    var g = parseInt(gr, 10);
    if (g === 0 )
    { g = "male"; }
    else {  g = "female"; }
    return g;
}

function renderHero(data) {

    $("#gear li").html("");

    var items = data.items,
        gdr = hGender(data.gender);

    for (var i in items) {

        var ic  = items[i].icon,
            tp  = items[i].tooltipParams,
            a   = document.createElement("a"),
            img = document.createElement("img");

        a.href = testUrl+tp;
        a.setAttribute("data-d3tooltip", tp);
        img.src = iconUrl+ic+".png";
        a.appendChild(img);

        document.getElementById(i).appendChild(a);
    }
}

function renderProfile ( currentProfile ) {

    var frag   = document.createDocumentFragment();
    var arr   = [];
    for (var i in currentProfile.heroes){

        var curr = currentProfile.heroes[i];

        curr.gender = hGender(curr.gender );

        var li        = document.createElement("li");
        li.id        = curr.id;
        li.className = curr.class+"-"+curr.gender;
        li.innerHTML = "<h3>"+curr.name+"</h3><span>"+curr.level+"</span>";

        getData(config.profile+"/hero/"+curr.id).then(function (data){
            data.items = renderItems ( data.items);
            arr.push(data);
        });

        frag.appendChild(li);

    }

    currentProfile.heroes = arr;
    console.log(currentProfile);
    document.getElementById("heroes").appendChild(frag);
}



function renderItems ( items ) {

    var obj = {};
    for (var i in items){
        getData(config.api+"/data/"+items[i].tooltipParams).then(function (data){
            obj[i] = data;
        });
    }
    console.log(obj);
    return obj;
}


$(document).ready(function() {

    $("#go").on("click", function() {

        config.bTag = $("#bName").val()+"-"+$("#bTag").val();
        config.profile = config.api+"/profile/"+config.bTag+"/";

        getData(config.profile).then(function (data){
            currentProfile = data;
            renderProfile(currentProfile);
        });

    });
});













































