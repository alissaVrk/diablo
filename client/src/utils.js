function getInputs() {
    var obj = {};
    //TODO: add some validation
    obj.region = $(d3.sel.bRegion).val();
    obj.name   = $(d3.sel.bName).val();
    obj.id     = $(d3.sel.bCode).val();
    return obj;
}

function makeUrl(region, tag) {
    var host = "http://" + region + "." + d3.base.host, urls = {};
    urls.host    = host;
    urls.profile = host + d3.base.api + "profile/" + tag + "/";
    urls.data    = host + d3.base.api + "data/";
    urls.tooltip = host + "d3/en/tooltip/";
    urls.media   = "http://" + region + "." + d3.base.media + "d3/icons/";
    return urls;
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

function defineGender(g) { 
    return (g === 0 ) ? "male" : "female"; 
}

function makeItemUrl(str) {
    return d3.current.urls.tooltip + str.replace("item", "item-data");
}

function showItemTip(html) {
    var tip = $(d3.sel.tTip); // in "main.js" define id for html element
    ( tip.css('display') == 'none')? tip.html(html).fadeIn(300) : null;
}

var Bnet={D3:{Tooltips:{registerData:function(d){showItemTip(d.tooltipHtml);}}}};

function makeSkillUrl(klass, cat, prop ) {
    return config.base + "class/" + klass + "/" + cat + "/" + prop;
}

function wrap(wrp, msg) {
    return "<" + wrp + ">" + msg + "</" + wrp + ">";
}

function select(el, cls) {
    $(el).addClass(cls).siblings().removeClass(cls);
}

function setBg(el){
    var x = el.hasClass("male") ? 0 : -83, y = 0;
    if(el.hasClass("barbarian")) { y = 0;
    } else if (el.hasClass("demon-hunter")) { y = -66;
    }else if (el.hasClass("monk")) { y = -132;
    }else if (el.hasClass("witch-doctor")) { y = -198;
    }else if (el.hasClass("wizard")) { y = -264; }
    el.attr("style", "background-position:" + x + "px " + y + "px");
}

function sortHeroesByBiggest(heroes, prop, inc){
    var sorted = _.filter(heroes, function(h) {
        return h[prop] > inc;
    });
    return sorted;
}
function loadAnim(state){

    var msg =  state ? "loading.." : "";


//    if(state){
//        $(".gear").slideUp()
//
//    } else {
//        $(".gear").slideDown()
//    }

    console.log(msg);

    $("blockquote").text(msg);


}

function getData(url, callback) {
    loadAnim(true);
    $.ajax({ url:url, type:"GET", dataType: "jsonp"}).done(function (data) {

       if( _.has(data, "code")) {

           console.log("\n\n\n\n" + data.code + "\n" + data.reason + "\n\n\n\n");
           throw new Error(data.code + "\n" + data.reason);


       } else {

           callback(data);
           loadAnim(false);

       }

    });
}