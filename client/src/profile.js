var profiles = {}, config;

config = {
    icon: "http://eu.media.blizzard.com/d3/icons/",
    api: "http://eu.battle.net/api/d3/",
    ui: { inp: "#battleTag", btn: "#go" },
    dummy: "Jargon-2813",
    init : function () {
        var b = $(config.ui.inp).val().replace("#", "-");
        var lnk = config.api + "profile/" + b + "/";
        config.bTag = b;
        parseProfile(lnk);
    }
};

$(document).ready(function () {
    parseProfile(config.api+"profile/"+config.dummy+"/");
    $(config.ui.btn).on("click", function () {
        ($(config.ui.inp).val() === "")? alert("nono") : config.init();
    });
});

function fetchData(url) {
    return $.ajax({ url: url, type: "GET", dataType: "jsonp" });
}
function pTag(str) {
    return str.replace("#", "-");
}

function parseProfile(lnk) {
    var mainUrl = lnk;
    var heroUrl = mainUrl + "hero/";
    var fData = fetchData(lnk);
    fData.then(function (data) {
        var bTag = pTag(data.battleTag);
        var last = data.lastHeroPlayed;
        profiles[bTag] = {};
        getHeroesData(data, heroUrl, last, bTag, loadViews);
    });
}


function getHeroesData(data, heroUrl, last, bTag, callback) {
    var getHeroCalls = [];
    for (var i in data.heroes){
        getHeroCalls.push(getHeroCall(heroUrl+data.heroes[i].id, last, bTag));
    }
    $.when.apply($, getHeroCalls).then(function(args){
        getExtendedItems(profiles[bTag], callback);
    });
}

function getHeroCall(url, last, bTag){
    return $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function(dta){
            dta.gender = (dta.gender === 0 ) ? "male" : "female";
            dta.last = (dta.id === last) ? true : false;
            profiles[bTag][dta.name] = dta;
            //newItems(dta, bTag);
        }
    });
}

function getExtendedItems(heroes, callback){
    var getItemsCalls = [];
    for(var heroName in heroes){
        var hero = heroes[heroName];
        for(var itemName in hero.items){
            getItemsCalls.push(getItemCall(hero.items, itemName));
        }
    }
    $.when.apply($, getItemsCalls).then(function(args){
        callback(heroes);
    });
}

function getItemCall(items, key){
    return $.ajax({
        url: config.api + "data/" + items[key].tooltipParams,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            items[key] = data;
            //ko.applyBindings(new GearViewModel(profiles[bTag][dta.name]));
        }
    });
}


//var GearViewModel = function(hero) {
//    this.bracers     =  ko.observable(hero.items.bracers     );
//    this.feet        =  ko.observable(hero.items.feet        );
//    this.hands       =  ko.observable(hero.items.hands       );
//    this.head        =  ko.observable(hero.items.head        );
//    this.leftFinger  =  ko.observable(hero.items.leftFinger  );
//    this.legs        =  ko.observable(hero.items.legs        );
//    this.mainHand    =  ko.observable(hero.items.mainHand    );
//    this.neck        =  ko.observable(hero.items.neck        );
//    this.offHand     =  ko.observable(hero.items.offHand     );
//    this.rightFinger =  ko.observable(hero.items.rightFinger );
//    this.shoulders   =  ko.observable(hero.items.shoulders   );
//    this.torso       =  ko.observable(hero.items.torso       );
//    this.waist       =  ko.observable(hero.items.waist       );
//
//
//};



//ko.applyBindings(new GearViewModel(profiles["hero"+i]));






















































