var profiles = {}, config = {};
    config.icon = "http://eu.media.blizzard.com/d3/icons/";
    config.api  = "http://eu.battle.net/api/d3/";

function getJson (lnk) {
    return $.ajax({ type: "GET", dataType: "jsonp", url: lnk})
}

function parseProfile (lnk, battleTag) {
    profiles[battleTag] = {};
    getJson(lnk).then(function (dta) {
        var last = dta.lastHeroPlayed;
        for (var i in dta.heroes){
            getJson(lnk+"hero/"+dta.heroes[i].id ).then(function (data) {
                data.gender = ( data.gender==0 ) ? "male" : "female";
                data.last = (data.id == last) ? true : false;
                data.items = parseItems (data.items);
                profiles[battleTag][data.name]=data ;
            });
        }
    }).done(function(){
            console.log(profiles);
        })
}

function  parseItems (items) {
    var newItems = {};
    for (var i in items){
        (function(i) {
            getJson(config.api+"data/"+items[i].tooltipParams).then(function (data) {
                newItems[i] =  data;
            })
        })(i);
    }
    return newItems;
};

$(document).ready(function() {
    init ();
    $("#go").on("click", function(){
        init ();
    })
});

function init () {
    var bName = $("#bName").val(), bTag = $("#bTag").val(), battleTag = bName+"-"+bTag, bLnk = config.api+"profile/"+battleTag+"/";
    parseProfile (bLnk, battleTag);
}

















































