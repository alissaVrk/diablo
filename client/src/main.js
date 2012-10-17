d3.init = function() {

    var inp = getInputs();

    d3.current.name   = inp.name;
    d3.current.id     = inp.id;
    d3.current.tag    = inp.name + "-" + inp.id;
    d3.current.urls   = makeUrl(inp.region, d3.current.tag);

    getData(d3.current.urls.profile, profileReady);
};

function profileReady(profile) {

    var bt = new String (profile.battleTag);

    var prf = {};
        prf.heroes = {};
        prf.size = 0
        prf.name = bt.replace(/[\W\d]/gi, "");
        prf.tag = bt;
        prf.zz = _.omit(profile, ["battleTag", "heroes"]);

    _.each(profile.heroes, function(hero){
        prf.size ++
        hero.lnk = d3.current.urls.profile + "hero/" + hero.id
        prf.heroes["hero-" + prf.size] = hero;
    });

    d3.profiles[prf.name] = prf;
    renderProfile(prf);

}

function heroReady(data){

    $("#doll li").removeClass().empty();

    //TODO add cleaning function to clean all previous stats

    renderHeroProps(data.items, renderItem);
    renderHeroProps(data.stats, renderStat);
    renderHeroProps(data.skills, renderSkill);

}