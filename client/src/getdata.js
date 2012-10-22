
var curr = {};

function getCareer(tmp) {

    var req = $.ajax({ url: tmp.urls.main, type: "GET", dataType: "jsonp" });

    req.then(function (data) {

        curr = tmp;
        curr.heroes = {};
        curr.res = data;

        getHeroes(data.heroes, babyGotBack);

    });
}


function getHeroes(heroes, callback) {

    var getHeroCalls = [];


    for (var i in heroes){

        var url = curr.urls.hero + heroes[i].id

        getHeroCalls.push(getHeroCall(url, heroes[i].id));

    }
    $.when.apply($, getHeroCalls).then(function(args){
        getItems(curr.heroes, callback);
    });
}

function getHeroCall(url, id){

    return $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            curr.heroes["hero-" + data.id] =  data;
        }
    });
}

function getItems(heroes, callback){

    var getItemsCalls = [];

    for(var h in heroes){

        var hero = heroes[h];

        for(var i in hero.items){

            getItemsCalls.push(getItemCall(hero.items, i));

        }
    }

    $.when.apply($, getItemsCalls).then(function(args){

        curr.heroes = heroes;
        callback(curr);
        delete curr;
    });
}

function getItemCall(items, key){
    return $.ajax({
        url: curr.urls.data + items[key].tooltipParams,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            items[key] = data;
        }
    });
}
