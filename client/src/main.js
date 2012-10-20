(function (){

    var Career = Backbone.Model.extend({
        defaults: {
            battleTag : "",
            region    : "",
            name      : "",
            id        : "",
            url       : ""
        }

    });

    var CareerView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: $("#contactTemplate").html(),

        render: function () {
            var tmpl = _.template(this.template);

            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    function createCareer(reg, btag) {

        var name = btag.match(/[a-zA-Z]/g).toString().replace(/,/g, "");
        var id   = btag.match(/[0-9]/g).toString().replace(/,/g, "");
        var urls = makeUrl(reg, name,id);

        $.ajax({
            url: urls.profile,
            type:"GET",
            dataType:"jsonp",
            timeout: 5000,
            error: function(x, t, m) {
                console.log(t); console.log(m);
            }
        }).done(function (res) {

                if (!_.has(res, "code")) {

                    var career = new Career({ battleTag: res.battleTag, region:reg, name:name, id:id, urls:urls});

                    console.log(career.toJSON());
                    console.time('createCareer timer');
                    console.timeEnd('createCareer timer')

                } else {
                    console.log("code: " + res.code + "\n reason: " + res.reason);
                }

            })
    }

    $(document).ready(function () {

        $("#go").on('click', function(e) {
            e.preventDefault();

            createCareer($("#region").val(), $("#battleTag").val());
        });
    });


})();







