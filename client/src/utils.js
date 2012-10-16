//........ shortcut for console log

function cl(m) { console.log(m); }

//........ Does icon url for items and skills

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

//........ replace default numeric values with string values

function defineGender(g) { 
    return (g === 0 ) ? "male" : "female"; 
}

/*
 ________/-----------------------\________
/________/-----             -----\________\
/________/-----   TOOLTIP   -----\________\
/________/-----             -----\________\
/________/-----------------------\________\
/.........................................\
*/

//........ url for ajax Bnet, blizzard shit 

function makeItemUrl(str) {
    return d3.current.urls.tooltip + str.replace("item", "item-data");
}

//........ displays item tooltip

function showItemTip(html) {
    var tip = $(d3.sel.tTip); // in "main.js" define id for html element
    ( tip.css('display') == 'none')? tip.html(html).fadeIn(300) : null;
}

//........ hack to avoid blizzard tooltip

var Bnet={D3:{Tooltips:{registerData:function(d){showItemTip(d.tooltipHtml);}}}};

//........

function makeSkillUrl(klass, cat, prop ) {
    return config.base + "class/" + klass + "/" + cat + "/" + prop;
}

//........ wrap message with given html tag

function wrap(wrp, msg) {
    return "<" + wrp + ">" + msg + "</" + wrp + ">";
}

//........ removes css class from siblings and applys same class to $this

function select(el, cls) {
    $(el).addClass(cls).siblings().removeClass(cls);
}
