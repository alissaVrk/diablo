var d3 = {}, curr  = {};

d3.profiles = {};

d3.init = function(region, src) { //KingKongor#2672

    curr.name = src.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
    curr.id   = src.match(/[0-9]/g).toString().replace(/,/g, "");
    curr.tag  = curr.name + "#" + curr.id;
    curr.urls = makeUrl(region, curr.name, curr.id)

    getData(curr.urls.profile, profileReady);
}

function profileReady(profile) {

    var prf = {};
        prf.heroes = {};
        prf.size = 0
        prf.name = curr.name
        prf.id   = curr.id
        prf.tag  = curr.tag;
        prf.urls = curr.urls;
            prf.zz   = _.omit(profile, ["battleTag", "heroes"]);

    _.each(profile.heroes, function(hero){
        prf.size ++
        hero.lnk = curr.urls.hero + hero.id
        prf.heroes["hero-" + prf.size] = hero;
    });

    d3.profiles[prf.name] = prf;
    d3.render.profile(prf.tag, prf.name, "nav ul");
}

function heroReady(data){

    //TODO add cleaning function to clean all previous stats

    $("#doll li").removeClass().empty();

    d3.profiles[curr.name].items = data.items
    d3.profiles[curr.name].skills = data.skills
    d3.profiles[curr.name].stats = data.stats

    renderHeroItems(data.items);

    $("#stats").empty();

    renderHeroStats(data.stats);
}


