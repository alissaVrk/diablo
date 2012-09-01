var profiles = {}, config = {};
    config.icon = "http://eu.media.blizzard.com/d3/icons/";
    config.api  = "http://eu.battle.net/api/d3/";
    config.ui =  {};
        config.ui.inp =  $("#battleTag");
        config.ui.btn =  $("#go");
    config.bTag = "";
    config.dummy = "Djz-2157";

function init () {
    var l = config.api+"profile/"+config.dummy+"/";
    config.bTag = config.dummy;
    parseProfile (l)
}

function getJson (lnk) {
    return $.ajax({ type: "GET", dataType: "jsonp", url: lnk})
}

function parseProfile (lnk) {

    profiles[config.bTag] = {};

    getJson(lnk).then(function (dta) {

        var last = dta.lastHeroPlayed;

        for (var i in dta.heroes){

            var mm = getJson(lnk+"hero/"+dta.heroes[i].id );

            mm.then(function (data) {

                data.gender = ( data.gender==0 ) ? "male" : "female";
                data.last = (data.id == last) ? true : false;
                data.items = parseItems (data.items);
                //TODO in case of same name for all heroes in profile
                profiles[config.bTag][data.name]=data ;

                renderHero(data);
            });

        }
    })

}


function renderHero (hero) {

    var li = document.createElement("li");
    li.innerHTML = "<h3>"+hero.name+"</h3><span>"+hero.level+"</span>";
    document.getElementById("heroes").appendChild(li);
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

    init();

    config.ui.btn.on("click", function(){

        if (config.ui.inp.val() == "") {
            alert("nono")
        } else {
            var b = config.ui.inp.val().replace("#", "-");
            var l = config.api+"profile/"+ b+"/";
            config.bTag = b;
            parseProfile (l)

        }
    })
});

















































