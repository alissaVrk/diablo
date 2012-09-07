
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

function dummy(h)  {

    var olo;
    olo = {
        bb : { region:"us", name:"alkaizer", id:"1727" },
        dh:{ region:"eu", name:"ingek", id:"2353" },
        mk:{ region:"eu", name:"muggz", id:"2796" },
        wd:{ region:"us", name:"fish", id:"1477" },
        wz:{ region:"us", name:"faye", id:"1737" },
        me:{ region:"eu", name:"chapaev", id:"2139" }
    }

    $("#sel").val(olo[h].region);
    $("#battleName").val(olo[h].name);
    $("#battleCode").val(olo[h].id);

}

