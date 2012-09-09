
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
