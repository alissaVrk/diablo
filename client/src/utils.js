var config = {};

config = {

    icon: {
        url : "http://eu.media.blizzard.com/d3/icons/",
        small : "42/",
        big   : "64/"
    },

    base :"http://eu.battle.net/d3/en/",
    api: "http://eu.battle.net/api/d3/",
    ui: { inp: "#battleTag", btn: "#go" },
    currentTag : null
};

function fetchData(url) {
    return $.ajax({ url: url, type: "GET", dataType: "jsonp" });
}

function el(e) {
    return document.createElement(e);
}
function elId(e) {
    return document.getElementById(e);
}

function makeIcon(type, size, prop ) {
    var t, s;
    switch (type) {
        case "skills" :
            t = "skills/"
            s = (size == "small") ? config.icon.small : config.icon.big;
            break;
        case "items" :
            t = "items/"
            s = (size == "small") ? "small/" : "large/";
            break;
    }
    return config.icon.url + t + s + prop + ".png";
}

function makeSkillUrl(klass, cat, prop ) {
    return config.base + "class/" + klass + "/" + cat + "/" + prop;
}

function pTag(str) {
    //return str.replace("#", "-");
}
function defineGender(g) {
    return (g === 0 ) ? "male" : "female";
}
function defineLast(l) {
    return (l === last) ? true : false;
}

