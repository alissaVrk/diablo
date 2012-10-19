d3.render = {

    html : {
        career : "nav ul",
        heroes : ".heroes",
        items  : "#doll",
        skills : "#skills",
        stats  : "#stats"
    },

    profile : function(prf, target){

        var li = $("<li>")
            .data(prf)
                .attr("id",  prf.name)
                    .text(prf.name)
                        .appendTo($(d3.render.html.career));

        d3.render.heroes();
    },

    heroes : function() {

        var prf = $(d3.render.html.career + " li:last").data();

        var ul  = $("<ul>");

        _.each(prf.heroes, function(hero){


            var cls  = hero.class + " " + defineGender(hero.gender) + " " + hero.hardcore;

            var htm  = wrap("h3", hero.name) + wrap("label", hero.level) + wrap("label", hero.paragonLevel) + wrap("h4", hero.class);

            var li   = $("<li>").data(hero).addClass(cls).html(wrap("div", htm)).attr("style", setBg(hero.class, hero.gender));

            li.appendTo(ul);


        });

        ul.appendTo(d3.render.html.heroes);

        $(d3.render.html.heroes + " h3").text(prf.name);

        d3.render.hero();
    },

    hero : function(){


        $(".heroes ul li").each(function() {

            console.log(data);


            var req =  $.ajax({
                    url: $(this).data.lnk,
                    type:"GET",
                    dataType:"jsonp",
                    cache: true, global:false, timeout:5000,

                    error: function() { console.log("error"); }

                });



            

        });

    }

};




/*
function renderHeroes(tag) {

    var heroes = d3.profiles[tag].heroes;

    $(".heroes > ul").remove();
    $(".heroes h3").text(tag);
    $("#doll li").removeClass().empty();

    var ul = $("<ul>").attr("id", tag);

    _.each(heroes, function(hero){

        ul.append(renderHero(hero));
    });

    ul.appendTo(".heroes");

    $(".heroes li:first a").click();
}

function renderHero(hero){

    alert("caller is " + arguments.callee.caller.toString());

    var cls  = hero.class + " " + defineGender(hero.gender)
    var htm  = wrap("h3", hero.name) + wrap("label", hero.level) + wrap("label", hero.paragonLevel) + wrap("h4", hero.class)

    var a    = $("<a>").attr("href", hero.lnk).html( wrap("div", htm))
    var li   = $("<li>").addClass(cls).append(a);

    hero.hardcore ? li.addClass("hardcore") : null; setBg(li);



    var data = getData(hero.lnk, heroReady);


    function heroReady(data){

        console.log(data);

        d3.profiles[curr.name][hero].items = data.items
        d3.profiles[curr.name][hero].skills = data.skills
        d3.profiles[curr.name][hero].stats = data.stats

    }

    a.on("click", function(e){


       e.preventDefault();

       var url = $(this).attr("href");

        alert("caller is " + arguments.callee.caller.toString());


        var txt = $("nav .highlight").text() + " - " + hero.name;

        $(".heroes h3").text(txt);

        select($(this).parent(), "highlight");


        $("#doll li").removeClass().empty();

        renderHeroItems(hero.items);

        $("#stats").empty();

        renderHeroStats(hero.stats);

    });

    return li;
}

function renderHeroItems(items) {

    for (var i in items) {

        var url  = curr.urls.tooltip + items[i].tooltipParams
        var li = $("#doll li[slot=" + i + "]")
            .data("url", url)
                .html("<img src='" + makeIcon("items", "large", items[i].icon) + "'>")
                    .addClass(items[i].displayColor);

        li.on("click", function(){
            $.ajax({
                url:$(this).data("url"),
                cache: true,
                dataType:"jsonp",
                data:{ format:"jsonp" }
            });
        });
        li.on("mouseout", function(){
            if ($("#showitem").css('display') !== 'none') {
                $("#showitem").fadeOut(100).html("");
            }
        });
    }
}

function renderHeroStats(stats) {
    for (var i in stats) {

        var key = wrap("b", i);

        $("#stats").append(wrap("li", key + ": " + stats[i]));
    }
}


*/