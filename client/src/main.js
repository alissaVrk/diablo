var d3 = {}

function initCareer(reg, btag){

    var tmp = {}

    tmp.name = btag.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
    tmp.id   = btag.match(/[0-9]/g).toString().replace(/,/g, "");
    tmp.region   = reg;
    tmp.urls = makeUrl(reg, tmp.name, tmp.id);


    getCareer(tmp, babyGotBack);
}

function babyGotBack(data){

    var bTag = data.res.battleTag;

    var career = {
        battleTag : bTag,
        region    : data.region,
        name      : data.name,
        id        : data.id,
        heroes    : data.heroes,
        last      : data.heroes["hero-" + data.res.lastHeroPlayed],
        urls      : data.urls,
        rest      : data.res
    };

    d3[bTag] = career;
    console.log(d3);
}



















