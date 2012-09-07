
function weGood() {
    console.log("olololo")
}
function parseProfile() {
    console.log("1 - 1")
    var fData = fetchData(d3.current.url);
    fData.then(function (data) {
        //d3.current.last = data.lastHeroPlayed;
        d3.profiles[d3.current.tag] = {};
        console.log("1 - 2")
        getHeroesData(data, weGood);
        console.log("1 - 3")
    });
}


function getHeroesData(data, callback) {
    var getHeroCalls = [];
    console.log("2 - 1")
    for (var i in data.heroes){
        getHeroCalls.push(getHeroCall(d3.current.url + "hero/" + data.heroes[i].id));
    }
    console.log("2 - 2")
    $.when.apply($, getHeroCalls).then(function(args){
        console.log("2 - 3")
        getExtendedItems(d3.profiles[d3.current.tag], callback);
        console.log("2 - 4")
    });
}

function getHeroCall(url){
    console.log("3 - 1")
    return $.ajax({
        url: url, type:"GET", dataType: "jsonp",
        success: function(dta){
            console.log("3 -2")
            dta.gender = (dta.gender === 0 ) ? "male" : "female";
            var heroId = dta.gender + "-" + dta.class  + "-" + dta.level  + "-" + dta.id;
            dta.last = (dta.id === d3.current.last) ? true : false;
            d3.profiles[d3.current.tag][heroId] = dta;
            console.log("3 - 3")
        }
    });
}

function getExtendedItems(heroes, callback){
    var getItemsCalls = [];
    console.log("4 - 1a")
    for(var heroName in heroes){
        var hero = heroes[heroName];
        console.log("4 - 2a")
        for(var itemName in hero.items){
            console.log("4 - 3a")
            getItemsCalls.push(getItemCall(hero.items, itemName));
            console.log("4 - 3b")
        }
        console.log("4 - 2b")
    }
    console.log("4 - 1b")
    $.when.apply($, getItemsCalls).then(function(args){
        console.log("5 - 1a")
        callback(heroes);
        console.log("5 - 1b")
    });
}

function getItemCall(items, key){
    return $.ajax({
        url: d3.base.api + "data/" + items[key].tooltipParams,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            items[key] = data;
        }
    });
}



function init(rg, nm, id){

    d3.current.region = rg;
    d3.current.name   = nm;
    d3.current.id     = id;

    d3.current.tag = d3.current.name + "-" + d3.current.id;
    d3.current.url = "http://" + d3.current.region + "." + d3.base.host + d3.base.api + "profile/" + d3.current.tag + "/";

}


$(document).ready(function () {

    for (var i in d3.base.regions) {
        $("#sel").append($("<option>").attr("value", i).text(d3.base.regions[i]));
    }

    dummy("me");

    $("#go").on('click', function() {

        var rg  = $("#sel").val()
            ,nm = $("#battleName").val()
            ,id   = $("#battleCode").val()
            ,lnk = "http://" + rg + "." + d3.base.host + d3.base.api + "profile/" + nm + "-" + id + "/";

        init(rg, nm, id);
        parseProfile();

    });

});