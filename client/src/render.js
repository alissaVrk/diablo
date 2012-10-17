function renderProfile(prf){

    var li = $("<li>").attr("id",  prf.tag).text(prf.name).appendTo("nav ul");

    li.on('click', function() {
        select($(this), "highlight");
        renderAllHeroes($(this).text());
    });

    $("nav li:first").click();

    getNextDummy();
}

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

    a.on("click", function(e){

        e.preventDefault()
        var url = $(this).attr("href");

        var txt = $("nav .highlight").text() + " - " + hero.name;
        $(".heroes h3").text(txt);

        select($(this).parent(), "highlight");
        getData(url, heroReady);

    });

    return li;
}

function renderHeroItems(items) {

    $("#doll li").removeClass().empty();

    for (var i in items) {
        renderItem(items[i], i);
    }
}

function renderHeroProps(prop, foo) {
    for (var i in prop) {
        foo(prop[i], i);
    }
}

function renderItem(item, slt){

    var bg = item.displayColor
       ,url = makeItemUrl(item.tooltipParams)
       ,icon = makeIcon("items", "large", item.icon)
       ,slot  = ".gear li[type=" + slt + "]"
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
}

function renderStat(stat){
    console.log(stat);
}
function renderSkill(skill){
    console.log(skill);
}