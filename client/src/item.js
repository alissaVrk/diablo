

var itm = {
    klassMost: {
        brb: {},
        dmh: {},
        mnk: {},
        wdr: {},
        wiz: {}
    },
    armor: {
        must: {

        },
        baseStats: {
            Strength_Item:"",
            Vitality_Item:"",
            Intelligence_Item:"",
            Dexterity_Item:"",
            Armor_Item:"",
            Magic_Find:"",
            Gold_Find:"",
            Resistance_All:"",
            Movement_Scalar:"",
            Crit_Percent_Bonus_Capped:"",
            Resource_Max_Bonus:"",
            attacksPerSecond:"",
            Attacks_Per_Second_Item:"",
            Attacks_Per_Second_Percent:""

        },
        nicetoHave: {

        }

    },
    weapon: {
        must: {

        },
        baseStats: {
            Strength_Item:"",
            Vitality_Item:"",
            Intelligence_Item:"",
            Dexterity_Item:"",
            Armor_Item:"",
            Magic_Find:"",
            Gold_Find:"",
            Resistance_All:"",
            Movement_Scalar:"",
            Crit_Percent_Bonus_Capped:"",
            Resource_Max_Bonus:"",
            attacksPerSecond:"",
            Attacks_Per_Second_Item:"",
            Attacks_Per_Second_Percent:""

        },
        nicetoHave: {

        }

    }


}

function makeItem(item) {

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

}









