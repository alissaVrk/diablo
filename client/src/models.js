
function renderHeroes() {

    //var ul = $("#heroes").removeData().empty();
    var ul = $("<ul>").attr("id", d3.current.tag).addClass("heroes").appendTo("section:first");
    var hrs = $(d3.profiles[d3.current.tag].heroes);

    var deferreds = [];

    $(hrs).each(function(h) {

        var li = $("<li>");
        li.addClass(hrs[h].class + " " + defineGender(hrs[h].gender));
        li.html("<div><h4>" + hrs[h].name + "</h4><span>level: " + hrs[h].level + "</span><span>id: " + hrs[h].id + "</span></div>");
        (hrs[h].id == d3.current.last) ? li.attr("id", "lastPlayed") : null;


        var request = fetchData(d3.current.url + "hero/" + hrs[h].id);
        deferreds.push(request);

        request.done(function (data) {

            d3.profiles[d3.current.tag].heroes[h] = data;
            li.data("d3", d3.profiles[d3.current.tag].heroes[h]);
            ul.append(li);
            mapItems(d3.profiles[d3.current.tag].heroes[h].items, d3.profiles[d3.current.tag].heroes[h].gender, d3.profiles[d3.current.tag].heroes[h].class )

        }); //done one

    }); //loop end

    $.when.apply($, deferreds).then(function(args){
        console.log(d3.profiles[d3.current.tag].heroes);
    });

}


var Bnet = {};

Bnet.D3 = {}
Bnet.D3.Tooltips = {}
Bnet.D3.Tooltips.registerData = function(d){

    console.log("..............." + d.tooltipHtml)

    debugger;

    babyGotBack(d);
}
function babyGotBack(d) {
    console.log("**********************" + d);
}

function mapItems(items, kls, gnr) {


    var tt = d3.current.urls.tooltip;
    //var tt = d3.current.urls.data;

    for(var i in items) {

        var slot =  $("#" + i);
        var a =  $("<a>");
        var str =  items[i].tooltipParams;
        var itm = str.replace("item", "item-data");

        a.attr("href", tt + itm );
        // a.attr("data-d3tooltip", tt + itm );
        a.data("d3tooltip", tt + itm);
        a.text(items[i].name).appendTo(slot);

        var req = $.ajax({
            url: tt + itm,
            dataType: "jsonp",
            data  :{ classIcon: kls, gender: gnr, format:"jsonp"}

            //jsonpCallback: Bnet.D3.Tooltips.registerData

        })

        req.success(function() {
            console.log('Yes! Success!');
        });

        req.error(function(data) {

            console.log('Oh noes!' + data.tooltipHtml);
        });

//        $(document).ajaxError(function (e, jqXHR, ajaxSettings, thrownError) {
//                //If either of these are true, then it's not a true error and we don't care
//                if (jqXHR.status === 0 || jqXHR.readyState === 0) {
//                    return;
//                }
//
//                console.log("oooooooooooooooo")
//            });


//        req.done(function (resp) {
//                console.log("done " + resp);
//            });
//        req.error(function (resp) {
//                console.log("err " + resp);
//            });
//        req.fail(function (resp) {
//                console.log("fail " + resp);
//            });
//        req.success(function (resp) {
//                console.log("success " + resp);
//            });
//        req.then(function (resp) {
//                console.log("then " + resp);
//            });

    }

//    $.when.apply($, def).then(function(args){
//        console.log(args);
//        for(var i in def) {
//            console.log(def[i]);
//        }
//
//    });

}





function renderHero (hero) {

    $("#gear h2").html("<span>" + hero.level + "</span><p>" + hero.class + "</p>" + hero.name);
    var klass = hero.class;
    renderItems(hero.items);
    renderSkills(hero.skills, klass);
    renderStats(hero.stats);
}

function  renderItems (items) {



    $("#gear li").each(function(index) {
        $(this).data("item-info", "").html("").empty();
    });


    for (var i in items) {

        var li  = $("#gear li#" + i);
        li.data("item-info", "").html("").empty();
        var html = "";
        var pic = "<img src='" + makeIcon("items", "big", items[i].icon) + "' />";
        var gems = (items[i].gems.length > 0) ? renderGems(items[i].gems, "p") : null;
        var desc = (items[i].flavorText) ? items[i].flavorText : "";




        html += "<div class='tip'>" + pic + gems;
        html += (items[i].armor == undefined) ? "" : "<span>armor: " + items[i].armor.max + "</span>" ;
        html += "<h3 style='color:" + items[i].displayColor + "'>" + items[i].name + "</h3>";
        html += "<h4 style='color:" + items[i].displayColor + "'>" + items[i].typeName + "</h4>";

        html += "<ul>" +  renderAttributes(items[i].attributes, "li") + "</ul>";



        html += "<p>" +  desc + "</p>";

        html += "<h5>Item Level: " + items[i].itemLevel + "</h5>";
        html += "<h6>Required Level: " + items[i].requiredLevel + "</h6>";
        html += "</div>";

        li.data("item-info", html);
        li.html(pic);

    }

}

function renderGems(gems, e) {
    var html = "";
    for (var i in gems) {
        html +="<" + e + "><img src='" + makeIcon("items", "small", gems[i].item.icon) + "' /></" + e + ">"
    }
    return html;
}

function renderAttributes(attr, e) {
    var html = "";
    for (var i in attr) {
        html += "<" + e + ">" +attr[i]+ "</" + e + ">"

    }
    return html;
}

function renderStats(stats) {
    var ul   = document.getElementById("stats"), frag = document.createDocumentFragment();
    ul.innerHTML = ""
    for (var i in stats) {
        var li = el("li");
        li.innerHTML = "<b>" + i + ": </b><span>" + stats[i] + "</span>";
        frag.appendChild(li);
    }
    ul.appendChild(frag);
}

function renderSkills(skills, klass) {

    for (var cat in skills) {

        var ul   = document.getElementById(cat), frag = document.createDocumentFragment();
        ul.innerHTML = "";

        for (var i in skills[cat]) {

            if( skills[cat][i].skill)

                var curr = skills[cat][i].skill, li = el("li"), img = el("img"), a = el("a");

            a.setAttribute("href", makeSkillUrl(klass, cat, curr.slug ));
            img.setAttribute("src", makeIcon("skills", "small", curr.icon));

            a.appendChild(img);
            li.appendChild(a);
            frag.appendChild(li);
        }

        ul.appendChild(frag);

    }
}









