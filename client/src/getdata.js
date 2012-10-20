/*

 $.ajax({
 type: "GET",
 url: url,
 dataType: "html",
 global: false,
 beforeSend: function() {
 // Show "Loading..." tooltip when request is being slow
 setTimeout(function() {
 if (!Tooltip.visible)
 Tooltip.position(node, Msg.ui.loading, options);
 }, 500);
 },
 success: function(data) {
 Tooltip.cache[content] = data;

 if (Tooltip.currentNode == node){
 Tooltip.position(node, data, options);
 }
 },
 error: function(xhr) {
 if (xhr.status != 200){
 Tooltip.hide();
 }
 }
 });

*/

function getData(url, callback) {

    $.ajax({
        url: url,
        type:"GET",
        dataType:"jsonp",
        cache: true,
        global: false,
        timeout: 5000,
        error: function(x, t, m) {
           console.log(t);
           console.log(m);
        }
    }).done(function (res) {

        _.has(res,"code") ? console.log("code: " + res.code + "\n reason: " + res.reason) : callback(res);

    })
}


function returnData(url, index, callback) {

    $.ajax({
        url: url,
        type:"GET",
        dataType:"jsonp",
        cache: true,
        global: false,
        timeout: 5000,
        error: function(x, t, m) {
            console.log(t);
            console.log(m);
        }
    }).done(function (res) {

            _.has(res,"code") ? console.log("code: " + res.code + "\n reason: " + res.reason) : callback(res);

        })
}

function showMsg(status, m) {

    var div = $("#overlay"),
        vis = $("overlay").is(":visible"),
        msg = _.isObject(m) ? readObj(m) : wrap("p", m);

    div.on("click", function(){div.fadeOut()});

    function readObj(msg){

        var htm = ""; console.log(msg);

        _.each(msg, function(m){

            htm += wrap("p", m);
            console.log(m)
        });

        return wrap("div", htm);
    }

    switch (status) {
        case 1 :
            div.html(msg);
	        vis ? null : div.fadeIn();
            break;
        case 0 :
            div.html(msg);
            vis ? null : div.fadeIn();
            break;
        case -1 :
            div.fadeOut().html("");
            break;
    }

}