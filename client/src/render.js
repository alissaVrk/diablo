
d3.render = {

    profile : function(tag, name, target){

        var li = $("<li>").attr("id",  tag).text(name).appendTo($(target));

        li.on("click", function() {

            select($(this), "highlight");
            renderAllHeroes($(this).text());

        });

        $(target + " li:last").click();
    }

};



function renderAllHeroes(tag) {

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

    var cls  = hero.class + " " + defineGender(hero.gender)
       ,htm  = wrap("h3", hero.name) + wrap("label", hero.level) + wrap("label", hero.paragonLevel) + wrap("h4", hero.class)
       ,a  = $("<a>").attr("href", hero.lnk).html( wrap("div", htm))
       ,li   = $("<li>").addClass(cls).append(a);

    hero.hardcore ? li.addClass("hardcore") : null; setBg(li);

    getData(hero.lnk, heroReady);

    a.on("click", function(e){

        e.preventDefault()
        var url = $(this).attr("href");

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


