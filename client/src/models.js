function renderHeroes(tag) {
    $(".overlay p").text("rendering heroes");
    var profile = d3.profiles[tag];
    var ul  = $("#" + tag + " .heroes");

    $("#" + tag + " section.heroes h2").html("Heroes " + tag);

    $(profile.heroes).each(function(h) {
        //var last = (profile.lastHeroPlayed == profile.heroes[h].id) ? h : null;
        var li = $("<li>").data("hero", {tag: tag, id : h});
        li.addClass(profile.heroes[h].class + " " + defineGender(profile.heroes[h].gender));
        li.html("<div><h4>" + profile.heroes[h].name + "</h4><span>level: " + profile.heroes[h].level + "</span><br><span>id: " + profile.heroes[h].id + "</span></div>");

        li.on('click', function() {

            var t = $(this).data("hero").tag;
            var n = $(this).data("hero").id;

            renderItems(t, n);
        });

        //(profile.heroes[h].id == d3.current.last) ? li.attr("id", "lastPlayed") : null;
        ul.append(li);

    });

   renderItems(tag, 0);
}

function  renderItems(tag, n) {

    $(".overlay p").text("rendering items");

    $(".overlay").fadeIn();

    var items = d3.profiles[tag].heroes[n].items;

    $("#" + tag + " section.gear h2").html(d3.profiles[tag].heroes[n].name + "'s Gear");

    $(".overlay p").text("rendering items");


    for (var i in items) {



        var li  = $("#" + tag + " .gear li."+i);

        li.find("img").attr("src", makeIcon("items", "small", items[i].icon));

        var str =  items[i].tooltipParams;
        var itm = str.replace("item", "item-data");
        li.data("tip", d3.current.urls.tooltip + itm);

        li.on('click', function() {

            console.log($(this).data());

            var req = $.ajax({
                url: $(this).data("tip"),
                dataType: "jsonp",
                data  :{ format:"jsonp"}

                //jsonpCallback: Bnet.D3.Tooltips.registerData

            })
            req.then(function(d) {
                $("#" + tag + " .olo").html(d);
            });

            req.error(function(data) {

                console.log('Oh noes!' + data);
            });




        });


/*
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
*/

    }

    $(".overlay").fadeOut();
}

/*

tt.registerData = function(d){
    console.log("..............." + d.tooltipHtml)
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


*/






