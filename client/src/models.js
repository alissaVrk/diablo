var Career = Backbone.Model.extend({
    defaults: {
        battleTag : null,
        region    : null,
        name      : null,
        id        : null,
        heroes    : null,
        urls      : null
    },

    initialize: function(){

        console.log("career: " + this);

        var lnk =  makeUrl(this.get("region"), this.get("name"), this.get("id"))

        $.ajax({

            url: lnk.main,
            type: "GET",
            dataType: "jsonp"

        }).then(function (data) {
            var arr = []
            _.each(data.heroes, function(hero){

                arr.push(new Hero({
                    class    : hero.class ,
                    gender   : defineGender(hero.gender),
                    name     : hero.name  ,
                    id       : hero.id    ,
                    level    : hero.level
                }));


            });
            console.log(arr);

        });
    }

});

var Hero = Backbone.Model.extend({
    defaults: {
        class    : null,
        gender   : null,
        name     : null,
        id       : null,
        level    : null
    },

    initialize: function(){
        console.log("hero: " + this);
    },

    equipGear: function(){
        console.log("hero: " + this);
    }
});

var Item = Backbone.Model.extend({
    defaults: {
        slot    : null,
        quality : null,
        tooltip : null,
        icon    : null,
        id      : null,
        gems    : null
    },
    initialize: function(){
        console.log("item: " + this);
    }
});


