var d3 = {};


d3.base = {}
    d3.base.host    = "battle.net/";
    d3.base.api     = d3.base.host + "api/d3/";
    d3.base.media   = "media.blizzard.com/";

    d3.base.regions = { us: "us", eu: "eu", kr: "kr", tw: "tw" };

d3.defaultHeroes = {};

    d3.defaultHeroes.bb = { region: "us", name: "alkaizer", id: "1727" };
    d3.defaultHeroes.dh = { region: "eu", name: "ingek",    id: "2353" };
    d3.defaultHeroes.mk = { region: "eu", name: "muggz",    id: "2796" };
    d3.defaultHeroes.wd = { region: "us", name: "fish",     id: "1477" };
    d3.defaultHeroes.wz = { region: "us", name: "faye",     id: "1737" };
    d3.defaultHeroes.me = { region: "eu", name: "chapaev",  id: "2139" };


d3.current = {};
d3.profiles = {}




function setCurrent() {

    d3.current["region"] = $("#sel").val()
    d3.current["name"]   = $("#battleName").val()
    d3.current["id"]     = $("#battleCode").val()
    d3.current["tag"]    = d3.current.name + "-" + d3.current.id;

    d3.current.urls = {};
        d3.current.urls["profile"] = "http://" + d3.current.region + "." + d3.base.api + "profile/" + d3.current.tag + "/";
        d3.current.urls["hero"]    = "http://" + d3.current.region + "." + d3.base.api + "profile/" + d3.current.tag + "/hero/";
        d3.current.urls["data"]    = "http://" + d3.current.region + "." + d3.base.api + "data/";
        d3.current.urls["tooltip"] = "http://" + d3.current.region + "." + d3.base.host + "d3/en/tooltip/";

    d3.current["url"]    = "http://" + d3.current.region + "." + d3.base.api + "profile/" + d3.current.tag + "/";

    parseProfile();

}

function dummy(hero)  {

    $("#sel").val(d3.defaultHeroes[hero].region);
    $("#battleName").val(d3.defaultHeroes[hero].name);
    $("#battleCode").val(d3.defaultHeroes[hero].id);

    setCurrent();
}

