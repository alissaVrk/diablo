
function el(e) {
    return document.createElement(e);
}
function elId(e) {
    return document.getElementById(e);
}
function cl(m) {
    console.log(m);
}


function makeIcon(type, size, prop ) {
    var t, s;
    switch (type) {
        case "skills" :
            t = "skills/"
            s = (size == "small") ? "42/" : "64/";
            break;
        case "items" :
            t = "items/"
            s = (size == "small") ? "small/" : "large/";
            break;
    }
    return d3.current.urls.media + t + s + prop + ".png";
}

function makeSkillUrl(klass, cat, prop ) {
    return config.base + "class/" + klass + "/" + cat + "/" + prop;
}


function defineGender(g) {
    return (g === 0 ) ? "male" : "female";
}
function handlerErr(args) {
    $(".loader p").html(args.code + "<br>" + args.reason);
    throw new Error(args.code + "<br>" + args.reason);
}

function fetchData(url) {
    return $.ajax({ url: url, type: "GET", dataType: "jsonp" });
}


function checkHero(hero, key, val) {
    if(hero[key] == val)
        return hero
}

function sortStats(stats) {

    var s = {};
    s.core =     {};
    s.life =     {};
    s.damage =   {};
    s.armor =    {};
    s.block =    {};
    s.game =     {};
    s.resource = {};

    for(var i in stats){

        switch (stats[i]) {

            case "vitality" : case "dexterity": case "strength": case "intelligence":
                s.core[i] = stats[i];
                break;
            case "life": case "lifeOnHit": case "lifePerKill": case "lifeSteal": case "lightningResist":
                s.life[i] = stats[i];
                break;
            case "damage": case "attackSpeed": case "critChance": case "critDamage": case "damageIncrease":
                s.damage[i] = stats[i];
                break;
            case "armor": case "arcaneResist": case "coldResist": case "fireResist": case "physicalResist": case "poisonResist":
                s.armor[i] = stats[i];
                break;
            case "blockAmountMax": case "blockAmountMin": case "blockChance": case "damageReduction": case "thorns":
                s.block[i] = stats[i];
                break;
            case "goldFind": case "magicFind":
                s.game[i] = stats[i];
                break;
            case "primaryResource": case "secondaryResource":
                s.resource[i] = stats[i];
                break;

            default:
                s[i] = stats[i];
                break;

        }
    }

    return s;
}
