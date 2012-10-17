var d3 = {
    base : { host:"battle.net/", api:"api/d3/", media:"media.blizzard.com/" },
    regions   : { us: "us", eu: "eu", kr: "kr", tw: "tw" },
    sel: {
        tTip:    "#showitem",
        bName:   "#battleName",
        bCode:   "#battleCode",
        bRegion: "#sel"
    },
    profiles : {},
    current  : {}
};

var heroesList = {

    az : {region: "eu", name: "azimuth",   id: "2255" },
    //te : {region: "eu", name: "Thundar",   id: "2697" },
    ab : {region: "eu", name: "sssd",      id: "2577" },
    ib : {region: "ko", name: "gogogo",    id: "1629" },
    bb : {region: "ko", name: "pureoym",   id: "2637" },
    yb : {region: "eu", name: "ryuzaki",   id: "2177" },
    ub : {region: "eu", name: "mantukinas",id: "1386" },
    rb : {region: "eu", name: "nugiyen",   id: "1382" },
    mk : {region: "eu", name: "muggz",     id: "2796" },
    cb : {region: "eu", name: "nel",       id: "1957" },
    wz : {region: "us", name: "faye",      id: "1737" },
    eb : {region: "us", name: "buleh",     id: "1655" },
    wd : {region: "us", name: "fish",      id: "1477" },
    dh : {region: "eu", name: "ingek",     id: "2353" }
};

function dummy(hero) {

    $(d3.sel.bName).val(heroesList[hero].name);
    $(d3.sel.bCode).val(heroesList[hero].id);
    $(d3.sel.bRegion).val(heroesList[hero].region);

    d3.init();

    delete heroesList[hero];
}

function getNextDummy() {

    if(!_.isEmpty(heroesList)) {

        for (first in heroesList) {
            dummy(first);
            break;
        }
    } else {
        console.log("..........END.........");

        $("nav li:first").click();

        $(".heroes li:first a").click();

    }
}





