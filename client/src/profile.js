var profiles = {};

function parseProfile(lnk) {
    var mainUrl = lnk;
    var heroUrl = mainUrl + "hero/";
    var fData = fetchData(lnk);
    fData.then(function (data) {
        var bTag = pTag(data.battleTag);
        var last = data.lastHeroPlayed;
        profiles[bTag] = {};
        currentTag = bTag;
        currentProfile = profiles[bTag];
        //getHeroesData(data, heroUrl, last, bTag, loadViews);
        getHeroesData(data, heroUrl, last, bTag, itsDone);
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
            var heroId = dta.gender + "-" + dta.class  + "-" + dta.level  + "-" + dta.name + "-" + dta.id;
            dta.last = (dta.id === last) ? true   : false;
            profiles[bTag][heroId] = dta;
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
        }
    });
}
