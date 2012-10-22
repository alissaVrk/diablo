    var d3 = {}
    var Career = Backbone.Model.extend({
        defaults: {
            battleTag : "",
            region    : "",
            name      : "",
            id        : ""
        }

    });



    function createCareer(reg, name, id, urls) {

        d3[name] = new Career({ region:reg, name:name, id:id, urls:urls});

        getCareer(urls.profile, olo)

    }


    function olo(data){
        

    }

    function valCareer(reg, btag){

        var name = btag.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
        var id   = btag.match(/[0-9]/g).toString().replace(/,/g, "");
        var urls = makeUrl(reg, name,id);

        createCareer(reg, name, id, urls)

    }

    function getCareer(url, callback) {

        $.ajax({
            url: url,
            type:"GET",
            dataType:"jsonp",
            timeout: 5000,
            error: function(x, t, m) {
                console.log(t); console.log(m);
            }
        }).done(function (res) {

                if (!_.has(res, "code")) {

                    callback(res);

                } else {
                    console.log("code: " + res.code + "\n reason: " + res.reason);
                }

            })
    }

















