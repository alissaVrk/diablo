var profiles = {}, config;
config = {
    icon: "http://eu.media.blizzard.com/d3/icons/",
    api: "http://eu.battle.net/api/d3/",
    ui: { inp: "#battleTag", btn: "#go" },
    dummy: "Jargon-2813",
    init : function () { var b = $(config.ui.inp).val().replace("#", "-"), lnk = config.api + "profile/" + b + "/";
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
    var mainUrl = lnk, heroUrl = mainUrl + "hero/", fData = fetchData(lnk);
    fData.then(function (data) {
        var bTag = pTag(data.battleTag), last = data.lastHeroPlayed;
        profiles[bTag] = {};
        newHeros(data, heroUrl, last, bTag);
    })
}

function newHeros(data, heroUrl, last, bTag) {
    for (var i in data.heroes){
        var fHeroes = fetchData(heroUrl+data.heroes[i].id);
        fHeroes.then(function(dta){
            dta.gender = (dta.gender === 0 ) ? "male" : "female";
            dta.last = (dta.id === last) ? true : false;
            profiles[bTag][dta.name] = dta;
            newItems(dta, bTag)
        })
    };
}

function newItems(dta, bTag) {
    for(var i in dta.items){
        var fItems = fetchData(config.api+"data/"+dta.items[i].tooltipParams);
        (function (i) {
            fItems.then(function(d){
                profiles[bTag][dta.name].items[i] = d;
                ko.applyBindings(new GearViewModel(profiles[bTag][dta.name]));
            })
        })(i);
    }
}


var GearViewModel = function(hero) {


    this.bracers     =  ko.observable(hero.items.bracers     );
    this.feet        =  ko.observable(hero.items.feet        );
    this.hands       =  ko.observable(hero.items.hands       );
    this.head        =  ko.observable(hero.items.head        );
    this.leftFinger  =  ko.observable(hero.items.leftFinger  );
    this.legs        =  ko.observable(hero.items.legs        );
    this.mainHand    =  ko.observable(hero.items.mainHand    );
    this.neck        =  ko.observable(hero.items.neck        );
    this.offHand     =  ko.observable(hero.items.offHand     );
    this.rightFinger =  ko.observable(hero.items.rightFinger );
    this.shoulders   =  ko.observable(hero.items.shoulders   );
    this.torso       =  ko.observable(hero.items.torso       );
    this.waist       =  ko.observable(hero.items.waist       );


};



//ko.applyBindings(new GearViewModel(profiles["hero"+i]));






















































