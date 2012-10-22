var d3 = {}
var Career = Backbone.Model.extend({
    defaults: {
        battleTag : "",
        region    : "",
        name      : "",
        id        : ""
    }

});

function valCareer(reg, btag){

    var tmp = {}

    tmp.name = btag.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
    tmp.id   = btag.match(/[0-9]/g).toString().replace(/,/g, "");
    tmp.region   = reg;
    tmp.urls = makeUrl(reg, tmp.name, tmp.id);

    getCareer(tmp, babyGotBack);

}


function babyGotBack(data){

    var career = new Career({
        battleTag : data.res.battleTag,
        region    : data.region,
        name      : data.name,
        id        : data.id
    });


    career.set({

        heroes : data.heroes,
        last   : _.find(data.heroes, function(hero){hero.id == data.res.lastHeroPlayed })

    });

}



















