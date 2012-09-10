d3.defaultHeroes = {};
    d3.defaultHeroes.bb = { region: "us", name: "alkaizer", id: "1727" };
    d3.defaultHeroes.dh = { region: "eu", name: "ingek",    id: "2353" };
    d3.defaultHeroes.mk = { region: "eu", name: "muggz",    id: "2796" };
    d3.defaultHeroes.wd = { region: "us", name: "fish",     id: "1477" };
    d3.defaultHeroes.wz = { region: "us", name: "faye",     id: "1737" };
    d3.defaultHeroes.me = { region: "eu", name: "chapaev",  id: "2139" };



var Bnet = { D3: { Tooltips :{
    registerData : function(d){
        $(".olo").html(d.tooltipHtml);
}
} } }



function dummy(hero)  {

    $("#sel").val(d3.defaultHeroes[hero].region);
    $("#battleName").val(d3.defaultHeroes[hero].name);
    $("#battleCode").val(d3.defaultHeroes[hero].id);

    d3.init();
}

function getInputs() {
    var obj = {};
        obj.region = $("#sel").val()
        obj.name   = $("#battleName").val()
        obj.id     = $("#battleCode").val()
    return obj
}

function makeUrl (region, lang, tag) {

    var host = "http://" + region + "." + d3.base.host
    var urls = {};
    urls.host    = host
    urls.profile = host + d3.base.api + "profile/" + tag + "/";
    urls.data    = host + d3.base.api + "data/";
    urls.tooltip = host + "d3/" + lang + "/tooltip/";
    urls.media   = "http://" + region + "." + d3.base.media + "d3/icons/";

    return urls;

}


















