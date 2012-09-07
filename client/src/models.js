function profileReady() {

    //console.log(d3);
   //renderHeroes();
  // $(".loader").fadeOut();
}

function renderHeroes() {

    var ul   = document.getElementById("heroes"),
        frag = document.createDocumentFragment();

    ul.innerHTML = "";

    for (var hero in currentProfile) {

        var li = document.createElement("li");
        li.setAttribute("data", hero);
        li.className = currentProfile[hero].class + " " + currentProfile[hero].gender;
        li.innerHTML = "<div><h4>" + currentProfile[hero].name + "</h4><span>level: " + currentProfile[hero].level + "</span><p>kills: " + currentProfile[hero].kills.elites + "</p></div>";

        if(currentProfile[hero].last) {
            li.id = "lastPlayed";
            renderHero(currentProfile[hero]);
        }
        frag.appendChild(li);
    }
    ul.appendChild(frag);

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









