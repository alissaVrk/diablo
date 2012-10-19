
var info = {};
    info.host    = "battle.net/";
    info.api     = "api/d3/";
    info.media   = "media.blizzard.com/";
    info.regions = ["us", "eu", "tw", "kr", "cn"];
    info.lang    = ["en_US", "es_MX", "en_GB", "it_IT", "es_ES", "pt_PT", "fr_FR", "ru_RU", "pl_PL", "de_DE", "ko_KR", "en_US", "zh_TW", "en_US", "zh_CN", "en_US"] ;
    info.errors  = ["OOPS", "LIMITED", "MAINTENANCE", "NOTFOUND"];


function makeUrl(region, name, id) {

    var tag  = name + "-" + id;

    var host = "http://" + region + "." + info.host;
    var api = host + info.api;
    var prf = api + "profile/" + tag;

    var u = {}

        u.profile = prf + "/"
        u.hero    = prf + "/hero/"

        u.data    = api + "data/"
        u.item    = api + "data/item/"
        u.skill   = api + "data/skill/"

        u.tooltip = host + "d3/en/tooltip/"

        u.media   = "http://" + region + "." + info.media + "d3/icons/"

    return u;
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
    return curr.urls.media + t + s + prop + ".png";
}

function defineGender(g) { 
    return (g === 0 ) ? "male" : "female"; 
}

function showItemTip(html) {
    var tip = $("#showitem");
    tip.is(":visible") ? tip.html(html).fadeIn(300) : null;
}

var Bnet={D3:{Tooltips:{registerData:function(d){showItemTip(d.tooltipHtml);}}}};

function wrap(wrp, msg) {
    return "<" + wrp + ">" + msg + "</" + wrp + ">";
}

function select(el, cls) {
    $(el).addClass(cls).siblings().removeClass(cls);
}

function setBg(c, g){

    var x = g ? -83 : 0,
        y = 0;

    if(c == "barbarian") {
        y = 0;
    } else if (c == "demon-hunter") {
        y = -66;
    }else if (c == "monk") {
        y = -132;
    }else if (c == "witch-doctor") {
        y = -198;
    }else if (c == "wizard") {
        y = -264; }

    return "background-position:" + x + "px " + y + "px";
}