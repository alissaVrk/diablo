var d3 = {};


d3.base = {}
    d3.base.host    = "battle.net/";
    d3.base.api     = d3.base.host + "api/d3/";
    d3.base.media   = "media.blizzard.com/";

    d3.base.regions = { us:"us", eu:'eu', kr:"kr", tw:"tw" };


d3.current = {};
d3.profiles = {}


d3.character = {}
    d3.character.gear = {}
    d3.character.stats = {}
    d3.character.skills = {}

d3.item = {}

d3.item.get = function(item) {

}

d3.item.render = function (item) {

    var li  = $("#" + item);
    var itemClass = "item-" + item.displayColor;
    var pic  = el("img").setAttribute("src", makeIcon("items", "big", item.icon));
    var mainParam = item.armor ? item.armor.max : item.dps.max ;
    var gems = (item.gems.length > 0) ? renderGems(item.gems) : null ;
    var attributes = makeAttrs(item.attributes, "p");

    var itemModel = pic + "<div class='gems'>" + + "</div>" +

        "<ul class='itemTip'>" +
        "<h3>" + item.name + "</h3>" +
        "<li class='head'>" +
        "<img src='" + pic + "'>" +
        "<h4>" + item.typeName + "</h4>" +
        "<h5>" + mainParam + "</h5>" +
        "<span>armor</span>" +
        "</li>" +
        "<li class='affixes'>" + attributes + "</li>" +
        "<li class='foot'>" +
        "<p>level: <span>" + item.itemLevel + "</span></p>" +
        "<p>rec level: <span>" + item.requiredLevel + "</span></p>" +
        "</li>" +

        "</ul>";

    function makeGems(gems) {
        var html = "";
        for (var i in gems) {
            html +="<img src='" + makeIcon("items", "small", gems[i].item.icon) + "' />"
        }
        return html;
    }

    function makeAttrs(attr, e) {
        var html = "";
        for (var i in attr) {
            html += "<" + e + ">" +attr[i]+ "</" + e + ">"
        }
        return html;
    }


    /*

     bracers
     feet
     hands
     head
     leftFin
     legs
     mainHand
     neck
     offHand
     rightFinger
     shoulders
     torso
     waist

     */

}




function dummy(h)  {
    var olo;
    olo = {
        bb: { region: "us", name: "alkaizer", id: "1727" },
        dh: { region: "eu", name: "ingek",    id: "2353" },
        mk: { region: "eu", name: "muggz",    id: "2796" },
        wd: { region: "us", name: "fish",     id: "1477" },
        wz: { region: "us", name: "faye",     id: "1737" },
        me: { region: "eu", name: "chapaev",  id: "2139" }
    }

    $("#sel").val(olo[h].region);
    $("#battleName").val(olo[h].name);
    $("#battleCode").val(olo[h].id);

}

