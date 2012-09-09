function parseProfile() {

    $.ajax({

        url: d3.current.url,
        type: "GET",
        dataType: "jsonp"

    }).done(function (data) {

        d3.current["last"] = data.lastHeroPlayed;
        d3.profiles[d3.current.tag] = data;
        renderHeroes()

    });

}

$(document).ready(function () {


    for (var i in d3.base.regions) {
        $("#sel").append($("<option>").attr("value", i).text(d3.base.regions[i]));
    }

    dummy("bb");
//    dummy("dh");
//    dummy("mk");
//    dummy("wd");
//    dummy("wz");


    $("#go").on('click', function(e) {

        e.preventDefault();

        setCurrent();

    });

    $(".heroes li").live('click', function() {

        var d = $(this).data("d3");
        console.log(d);

    });

    //$("#gear li a").live('hover', function() {

        //e.preventDefault();

        //Bnet.D3.Tooltips.show(this);
        //var d = $(this).data("d3tooltip");
        //console.log(e);

    //});

});