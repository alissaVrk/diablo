
function renderHeroes(tag) {

    $("#container .heroes ul").empty();
    $("#container .heroes h2").html("Heroes " + tag);

    var profile = d3.profiles[tag];
    var heroes = profile.heroes;


    $(heroes).each(function(i) {

        var data = {tag: tag, id : i};
        var cls  = heroes[i].class + " " +  defineGender(heroes[i].gender);
        var htm  = "<div>" + heroes[i].name + "</div>";
        var li = $("<li>").data("hero", data).addClass(cls).html(htm).on('click', function(){

            renderItems($(this).data("hero").tag, $(this).data("hero").id);
        });

        $("#container .heroes ul").append(li);

    });

    renderItems(tag, 0);
}

function  renderItems(tag, n) {


    $("#container .gear h2").text(d3.profiles[tag].heroes[n].name + "'s Gear");

    var items = d3.profiles[tag].heroes[n].items;

    for (var i in items) {

        var itmColor = "background-image:  url('http://eu.battle.net/d3/static/images/item/icon-bgs/" + items[i].displayColor + ".png');"

        var li  = $("#container .gear li."+i).removeAttr("style").attr("style", itmColor);
        li.find("img").attr("src", makeIcon("items", "large", items[i].icon));

        var str =  items[i].tooltipParams;
        var itm = str.replace("item", "item-data");
        li.data("tip", d3.current.urls.tooltip + itm);




//        li.hover(function() {
//            var req = $.ajax({
//                url: $(this).data("tip"),
//                dataType: "jsonp",
//                data  :{ format:"jsonp"}
//            }).then(function(d) {
//                $(".olo").html(d).fadeIn();
//            });
//
//            },
//            function(){
//                $(".olo").fadeOut();
//            }
//
//
//        );


        li.on('click', function() {
            var req = $.ajax({
                url: $(this).data("tip"),
                dataType: "jsonp",
                data  :{ format:"jsonp"}
            })
            req.then(function(d) {
                $(".olo").html(d);
            });

        });
    }
}





