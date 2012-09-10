var d3 = {};

d3.base = {}
    d3.templates = "client/html/";
    d3.base.host    = "battle.net/";
    d3.base.api     = "api/d3/";
    d3.base.media   = "media.blizzard.com/";
    d3.base.regions = { us: "us", eu: "eu", kr: "kr", tw: "tw" };

d3.profiles = {};
d3.current = {};

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
}

d3.profileReady = function(profile) {

    var url = d3.current.urls.profile + "hero/";

    d3.profiles[d3.current.tag] = profile;
    $(".overlay p").text("loading heroes");
    getHeroes(d3.profiles[d3.current.tag].heroes, url, d3.babyGotBack);

}

d3.babyGotBack = function(heroes) {

    d3.profiles[d3.current.tag].heroes = heroes;

    var div = $("<div>")
        .attr("id", d3.current.tag)
        .addClass("profile")
        .appendTo("#container")
        .load(d3.templates + "profileTemplate.html", function() {
                renderHeroes(d3.current.tag);
        });

}