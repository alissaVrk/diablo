function getProfile() {

    $.ajax({ url:d3.current.url, type:"GET", dataType: "jsonp" }).done(function (data) {

        d3.current["last"] = data.lastHeroPlayed;
        d3.profiles[d3.current.tag] = data;

        getHeroes();

    });
}


function getHeroes() {

    var deferreds = [];

    var heroes = d3.profiles[d3.current.tag].heroes;

    $(heroes).each(function(i) {

        var req = $.ajax({ url:d3.current.urls.hero + heroes[i].id, type:"GET", dataType: "jsonp" })
        deferreds.push(req);
        req.done(function(data){
            d3.profiles[d3.current.tag].heroes[i] = data;
            getItems(d3.profiles[d3.current.tag].heroes[i]);
            console.log("hero?");
        })

    })

    $.when.apply($, deferreds).then(function(data){

        console.log("heroes done?");

    });

}

function getItems(hero) {

    var deferreds = [];



    $(hero.items).each(function(i) {
        console.log($(hero.items)[i]);
       
        var req = $.ajax({ url:d3.current.urls.data + $(hero.items)[i].tooltipParams, type:"GET", dataType: "jsonp" })
        deferreds.push(req);
        req.done(function(data){
            hero.items[i] = data;
            console.log("item?");
        })

    })

    $.when.apply($, deferreds).then(function(data){

        console.log("items done?");

    });

}


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

    getProfile();

}

function dummy(hero)  {

    $("#sel").val(d3.defaultHeroes[hero].region);
    $("#battleName").val(d3.defaultHeroes[hero].name);
    $("#battleCode").val(d3.defaultHeroes[hero].id);

    setCurrent();
}

$(document).ready(function () {

    for (var i in d3.base.regions) {
        $("#sel").append($("<option>").attr("value", i).text(d3.base.regions[i]));
    }

    dummy("bb");

    $("#go").on('click', function(e) {

        e.preventDefault();
        setCurrent();

    });

    $(".heroes li").live('click', function() {

        var d = $(this).data("d3");
        console.log(d);

    });

});