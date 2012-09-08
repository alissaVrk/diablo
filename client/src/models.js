
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
            mapItems(d3.profiles[d3.current.tag].heroes[h].items)

        }); //done one

    }); //loop end


    $.when.apply($, deferreds).then(function(args){
        console.log(d3.profiles[d3.current.tag].heroes);
    });


}


function mapItems(items) {
    var lnk = "http://us." + d3.base.host + "us/item/warlord-gauntlets"
    for(var i in items) {

       var slot =  $("#" + i);
       var a =  $("<a>").attr("href", lnk ).data("d3tooltip", items[i].tooltipParams).text(items[i].name);
       slot.append(a);
        //slot.data("d3tooltip", items[i].tooltipParams)

    }
    //data-d3tooltip
    //$("#gear li")
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









