var defaultHeroes = {

    bb : {region: "us", name: "alkaizer", id: "1727" },
    dh : {region: "eu", name: "ingek",    id: "2353" },
    mk : {region: "eu", name: "muggz",    id: "2796" },
    wd : {region: "us", name: "fish",     id: "1477" },
    wz : {region: "us", name: "faye",     id: "1737" },
    me : {region: "eu", name: "chapaev",  id: "2139" }

};


var Bnet = { D3: { Tooltips : {
    registerData : function (d) {
        $(".olo").html(d.tooltipHtml);
}
} } };



function dummy(hero) {

    $("#sel").val(defaultHeroes[hero].region);
    $("#battleName").val(defaultHeroes[hero].name);
    $("#battleCode").val(defaultHeroes[hero].id);

    d3.init();
}



















