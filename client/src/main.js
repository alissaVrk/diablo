var d3 = new CareerList();

function initCareer(reg, btag){
    var tmp = {}

    tmp.name = btag.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
    tmp.id   = btag.match(/[0-9]/g).toString().replace(/,/g, "");
    tmp.region   = reg;
    tmp.urls = makeUrl(reg, tmp.name, tmp.id);

    var career = new Career({
        battleTag : tmp.name + "#" + tmp.id,
        region    : tmp.region,
        name      : tmp.name,
        id        : tmp.id,
        urls      : makeUrl(tmp.region, tmp.name, tmp.id)
    })

    d3.add(career);
}


















