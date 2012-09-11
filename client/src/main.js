var d3 = {
    base : {
        templates : "client/html/",
        host      : "battle.net/",
        api       : "api/d3/",
        media     : "media.blizzard.com/",
        regions   : { us: "us", eu: "eu", kr: "kr", tw: "tw" }
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
    obj.region = $("#sel").val();
    obj.name   = $("#battleName").val();
    obj.id     = $("#battleCode").val();
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

    $(".overlay").fadeIn();
    $(".overlay p").text("loading profile");

    getProfile(d3.current.urls.profile, d3.profileReady);
};

d3.profileReady = function(profile) {

    d3.current.last = profile.lastHeroPlayed;
    d3.profiles[d3.current.tag] = profile;

    $(".overlay p").text("loading heroes");

    getHeroes(d3.profiles[d3.current.tag].heroes, d3.current.urls.profile + "hero/", d3.babyGotBack);

}

d3.babyGotBack = function(heroes) {

    d3.profiles[d3.current.tag].heroes = heroes;

    var heroTrigger = $("<li>").attr("id",  d3.current.tag).text(d3.current.tag).appendTo("nav ul");

    heroTrigger.on('click', function() {
        cl($(this).attr("id"))
        renderHeroes($(this).attr("id"));

    });

    renderHeroes(d3.current.tag);

}