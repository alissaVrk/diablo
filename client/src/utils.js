
var paths = {
	lang    : ["en_US", "es_MX", "en_GB", "it_IT", "es_ES", "pt_PT", "fr_FR", "ru_RU", "pl_PL", "de_DE", "ko_KR", "en_US", "zh_TW", "en_US", "zh_CN", "en_US"],
	errors  : ["OOPS", "LIMITED", "MAINTENANCE", "NOTFOUND"],
	regions : ["us", "eu", "tw", "kr", "cn"],
	host    : "battle.net/",
	api     : "api/d3/",
	media   : "media.blizzard.com/"
}

function makeUrl(region, name, id) {

    var tag  = name + "-" + id;

    var host = "http://" + region + "." + paths.host;
    var api = host + paths.api;
    var prf = api + "profile/" + tag;

    var u = {}

        u.main = prf + "/"
        u.hero    = prf + "/hero/"

        u.data    = api + "data/"
        u.skill   = api + "data/skill/"

        u.tooltip = host + "d3/en/tooltip/"

        u.media   = "http://" + region + "." + paths.media + "d3/icons/"

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

    var x = g ? -83 : 0;
	var y = 0;

	switch (c) {
		case "barbarian"   : y = 0;
			break;
		case "demon-hunter": y = -66;
			break;
		case "monk"        : y = -132;
			break;
		case "witch-doctor": y = -198;
			break;
		case "wizard"      : y = -264;
			break;
	}

    return "background-position:" + x + "px " + y + "px";
}