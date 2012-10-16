function renderAllHeroes(tag) {

    var ul = $(".heroes > ul").empty();
    var heroes = d3.profiles[tag].heroes;

    $(heroes).each(function(i) {

        //var size = !!((_.size(heroes[i].items) > 5));

        _.size(heroes[i].items) > 10 ? ul.append(renderHero(heroes[i], tag, i)) : null;

    });

    ul.find("li:first").addClass("highlight");

   renderHeroItems({ tag:tag, id:heroes[0].id, index:0 });
}

function renderHero(hero, parent, index){

    var nav  = { tag:parent, id:hero.id, index:index }
       ,cls  = hero.class + " " + defineGender(hero.gender)
       ,htm  = wrap("h3", hero.name) + wrap("label", hero.level) + wrap("label", hero.paragonLevel) + wrap("p", hero.kills.elites) + wrap("h4", hero.class)
       ,info = wrap("div", htm)
       ,li = $("<li>").data("nav", nav).addClass(cls).html(info);

    hero.hardcore ? li.addClass("hardcore") : null;

    li.on('click', function(){
        select($(this), "highlight");
        renderHeroItems($(this).data("nav"));
    });
    return li;
}

function  renderHeroItems(obj) {

    var items = d3.profiles[obj.tag].heroes[obj.index].items;

    $("#doll li").removeClass().removeData("url", "").empty();

    for (var i in items) {
        renderItem(items[i], i);
    }
   getNextDummy();
}

function renderItem(item, slt){

    var bg = item.displayColor
       ,url = makeItemUrl(item.tooltipParams)
       ,icon = makeIcon("items", "large", item.icon)
       ,slot = ".gear li[type=" + slt + "]"

       ,li = $(slot).data("url", url).html("<img src='" + icon + "'>").addClass(item.displayColor);

    li.on("click", function(){
        $.ajax({
            url:$(this).data("url"),
            dataType:"jsonp",
            data:{ format:"jsonp" }
        });
    });

    li.on("mouseout", function(){
        if ($(d3.sel.tTip).css('display') !== 'none') {
            $(d3.sel.tTip).fadeOut(100).html("");
        }
    });
};
