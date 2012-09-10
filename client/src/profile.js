function getProfile(url, callback) {
    $.ajax({

        url:url,
        type:"GET",
        dataType: "jsonp"

    }).done(function (data) {
        callback(data);
    });
}

function getHeroes(objh, url, callback) {

    //var back = callback;
    var obj = objh;
    var deferreds = [];

    $(obj).each(function(i) {

        var req = $.ajax({ url:url + obj[i].id, type:"GET", dataType: "jsonp" });

        deferreds.push(req);

        req.done(function(data){

            obj[i] = data;
            $(".overlay p").text("loading items");
            getItems(obj[i].items);

        });
    });

    $.when.apply($, deferreds).then(function(data){
        callback(obj);
    });
}

function getItems(items) {

    var deferreds = [];

    $.each(items, function(i) {

        var req = $.ajax({ url:d3.current.urls.data + items[i].tooltipParams, type:"GET", dataType: "jsonp" });

        deferreds.push(req);

        req.done(function(data){

            items[i] = data;
            return items;
        });

    })

}