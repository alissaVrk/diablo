
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

    var deferred  = [];

    for (var i in heroes){

        deferred .push(getHeroCall(curr.urls.hero + heroes[i].id));
    }

    $.when.apply($, deferred ).then(function(args){
        getItems(curr.heroes, callback);
    });
}

function getHeroCall(url){

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

    var deferred  = [];

    for(var h in heroes){

        var hero = heroes[h];

        for(var i in hero.items){
            deferred .push(getItemCall(hero.items, i));
        }
    }

    $.when.apply($, deferred ).then(function(args){
        curr.heroes = heroes;
        callback(curr);
        delete curr;
    });
}

function getItemCall(items, key){
// ToolTip
//    $.ajax({
//        url:curr.urls.tooltip + items[key].tooltipParams,
//        dataType:"jsonp",
//        data:{ format:"jsonp" }
//    });

    $.ajax({
        url: curr.urls.data + items[key].tooltipParams,
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            items[key] = data;

        }
    });

}

// ToolTip

function getItemTip(d){

    // identify item by class-slot of html responce;

    //class="item-slot"
    //var htm = $(d.tooltipHtml);
    //var match = $(d.tooltipHtml).find("li.item-slot").html();
    //console.log("bn key: " + d.params.key + " bn match: " + match);

}
