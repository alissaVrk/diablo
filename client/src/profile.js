function parseProfile() {
    var request = fetchData(d3.current.url);
    request.done(function (data) {
        d3.current["last"] = data.lastHeroPlayed;
        d3.profiles[d3.current.tag] = data;
        renderHeroes()
    });
}

$(document).ready(function () {

    for (var i in d3.base.regions) {
        $("#sel").append($("<option>").attr("value", i).text(d3.base.regions[i]));
    }
    dummy("wz");

    $("#go").on('click', function(e) {

        e.preventDefault();

        d3.current["region"] = $("#sel").val()
        d3.current["name"]   = $("#battleName").val()
        d3.current["id"]     = $("#battleCode").val()
        d3.current["tag"]    = d3.current.name + "-" + d3.current.id
        d3.current["url"]    = "http://" + d3.current.region + "." + d3.base.api + "profile/" + d3.current.tag + "/";

        parseProfile();

    });

    $(".heroes li").live('click', function() {

        var d = $(this).data("d3");
        console.log(d);

    });

    $("#gear li a").live('click', function(e) {
        e.preventDefault();
        var d = $(this).data("d3tooltip");
        console.log(d);

    });

});