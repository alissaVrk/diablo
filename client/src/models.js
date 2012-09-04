function itsDone() {

   renderHeroes();
   // var div = $(".template");

    //div.clone().attr("id", currentTag).removeClass("template").appendTo("body");

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
        $(li).on("click", function () {
            renderHero (currentProfile[$(this).attr("data")]);
        })
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
    $("#gear li").data("d3tooltip", "").html("");
    for (var i in items) {

        var li  = $("#gear li#" + i);
        var html = "";
        li.data("d3tooltip", items[i].tooltipParams);

        html += "<div class='tip'>"
        html += (items[i].armor == undefined) ? "" : "<span>armor: " + items[i].armor.max + "</span>" ;
        html +="<h3 style='color:" + items[i].displayColor + "'>" + items[i].name + "</h3>";
        html +="<h4 style='color:" + items[i].displayColor + "'>" + items[i].typeName + "</h4>";

        if(items[i].gems.length > 0) {
            html += renderAttributes(items[i].attributes);
        }

        html +="<h5>Item Level: " + items[i].itemLevel + "</h5>";
        html +="<h6>Required Level: " + items[i].requiredLevel + "</h6>";



        html += "</div>"
        html += "<img src='" + "http://eu.media.blizzard.com/d3/icons/items/large/" +items[i].icon + ".png' alt='" + items[i].name + "'>";

        if(items[i].gems.length > 0) {
            html += renderGems(items[i].gems);
        }

        li.html(html);

    }
}

function renderGems(gems) {
    var html = "<ul class='gems'>";
    for (var i in gems) {
        //gems[i].attributes[0]
      html +="<li><img src='" + "http://eu.media.blizzard.com/d3/icons/items/small/" +gems[i].item.icon + ".png' alt='" + gems[i].item.name + "'></li>"
    }
    html += "</ul>";
    return html;
}

function renderAttributes(attr) {
    var html = "<ul class='affixes'>";
    for (var i in attr) {
        html += "<li>" +attr[i]+ "</li>"
    }
    html += "</ul>";
    return html;
}

function renderStats(stats) {
    $("#stats").empty();
    var ul   = document.getElementById("stats"),
        frag = document.createDocumentFragment();
    ul.innerHTML = ""
    for (var i in stats) {
        var li = document.createElement("li");
        //var roundNum = roundTo (stats[i], 2)
        li.innerHTML = "<b>" + i + ": </b><span>" + stats[i] + "</span>";
        frag.appendChild(li);
    }
    ul.appendChild(frag);
}

function renderSkills(skills, klass) {

    for (var cat in skills) {

        var ul   = document.getElementById(cat)
            ,frag = document.createDocumentFragment()
            ,iconUrl  = "http://eu.media.blizzard.com/d3/icons/skills/42/"
            ,skillUrl = "http://eu.battle.net/d3/en/class/" + klass + "/";

        ul.innerHTML = "";

        for (var i in skills[cat]) {

            var li = document.createElement("li"), a = document.createElement("a"), img = document.createElement("img");

            a.setAttribute("href", skillUrl + cat + "/" + skills[cat][i].skill.slug);
            img.setAttribute("src", iconUrl + skills[cat][i].skill.icon + ".png");

            a.appendChild(img);
            li.appendChild(a);
            frag.appendChild(li);
        }
        ul.appendChild(frag);
    }
}





