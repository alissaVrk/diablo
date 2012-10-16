var d3 = {

    base : {
        templates : "eu.battle.net/d3/en/tooltip/item-data/CJ_m0PAFEgcIBBWM9MgVHSmWQGAdjyb-qx2crKCYHXsCZJ8iCwgAFbb-AQAYJiAWMAk45wNAAEgFUAxg5wM?classIcon=monk&gender=male",
        host      : "battle.net/",
        api       : "api/d3/",
        media     : "media.blizzard.com/",
        regions   : { us: "us", eu: "eu", kr: "kr", tw: "tw" }
    },
    images: {
        portraits: {
            big: "http://eu.battle.net/d3/static/images/profile/career-portraits.jpg",
            small: "http://eu.battle.net/d3/static/images/profile/hero/hero-nav-portraits.jpg",
            tiny: "http://eu.media.blizzard.com/d3/icons/portraits/21/demonhunter_female.png"
        }
    },
    sel: {
        form:    "form",
        nav:     "nav",
        heroes:  "#showitem",
        doll:    "#showitem",
        stats:   "#showitem",
        skills:  "#showitem",

        tTip:    "#showitem",

        bName:   "#battleName",
        bCode:   "#battleCode",
        bRegion: "#sel"
    },

    profiles : {},
    current  : {}
};

function makeUrl(region, lang, tag) {

    var host = "http://" + region + "." + d3.base.host;
    var urls = {};
    urls.host    = host;
    urls.profile = host + d3.base.api + "profile/" + tag + "/";
    urls.data    = host + d3.base.api + "data/";
    urls.tooltip = host + "d3/" + lang + "/tooltip/";
    urls.media   = "http://" + region + "." + d3.base.media + "d3/icons/";

    return urls;
}

function getInputs() {

    var obj = {};

    //TODO: add some validation

    obj.region = $(d3.sel.bRegion).val();
    obj.name   = $(d3.sel.bName).val();
    obj.id     = $(d3.sel.bCode).val();

    return obj;
}


d3.init = function() {

    var inp = getInputs();

    d3.current.name   = inp.name;
    d3.current.id     = inp.id;
    d3.current.tag    = inp.name + "-" + inp.id;
    d3.current.region = inp.region;
    d3.current.lang   = "en";
    d3.current.urls   = makeUrl(d3.current.region, d3.current.lang, d3.current.tag);

    getProfile(d3.current.urls.profile, d3.profileReady);
};

d3.profileReady = function(profile) {

    d3.current.last = profile.lastHeroPlayed;
    d3.profiles[d3.current.tag] = profile;

    getHeroes(d3.profiles[d3.current.tag].heroes, d3.current.urls.profile + "hero/", d3.babyGotBack);
}

d3.babyGotBack = function(heroes) {

    d3.profiles[d3.current.tag].heroes = heroes;

    var heroTrigger = $("<li>").attr("id",  d3.current.tag).text(d3.current.tag).appendTo("nav ul");

    heroTrigger.on('click', function() {
        renderAllHeroes($(this).attr("id"));
    });

    //........ render first time

    renderAllHeroes(d3.current.tag);
}