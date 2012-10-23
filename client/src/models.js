
var HeroList = Backbone.Collection.extend({
    model: Hero
});

var CareerList = Backbone.Collection.extend({
    model: Career
});
var ItemList = Backbone.Collection.extend({
    model: Item
});

var Career = Backbone.Model.extend({

    defaults: {
        battleTag : null,
        region    : null,
        name      : null,
        id        : null,
        urls      : null,
        heroes    : new HeroList()
    },

    initialize: function(){

        var self = this;
        var lnk = self.attributes.urls.main;

        console.log("career init " + lnk);

        $.ajax({ url:lnk, type:"GET", dataType:"jsonp"
        }).then(function (data) {
                self.adopt(data);
        });
    },

    adopt : function(data){

        var self = this;
        var lnk = self.attributes.urls.hero;
        var heroesList = new HeroList();

        console.log("career adopt " + lnk);

        _.each(data.heroes, function(h){

            heroesList.add(new Hero({
                class    : h.class,
                gender   : defineGender(h.gender),
                name     : h.name,
                id       : h.id,
                url      : lnk + h.id,
                level    : h.level
            }));

            console.log(lnk + h.id);

        });
        this.set({heroes:heroesList})
    }
});

var Hero = Backbone.Model.extend({
    defaults: {
        class    : null,
        gender   : null,
        name     : null,
        id       : null,
        url      : null,
        level    : null,
        items    : new ItemList()
    },

    initialize: function(){

        var self = this;
        var lnk = self.attributes.url;

        console.log("hero init " + lnk);

        $.ajax({ url:lnk, type:"GET", dataType:"jsonp"
        }).then(function (data) {

                self.equipGear(data.items);
            });
    },

    equipGear: function(items){


        var self = this;
        var itemsList = new HeroList();

        _.each(items, function(i){

            itemsList.add(new Hero({
                slot    : i,
                quality : i.displayColor,
                tooltip : i.tooltipParams,
                icon    : i.icon,
                id      : i.id
            }));
        });
        this.set({items:itemsList});

        console.log("equip: " + items);
    }
});


var Item = Backbone.Model.extend({
    defaults: {

        /*


         displayColor: "orange"
         icon: "unique_bracer_005_104_demonhunter_male"
         id: "Unique_Bracer_005_104"
         name: "Lacuni Prowlers"
         tooltipParams: "item/CjcI2

        */


        slot    : null,
        quality : null,
        tooltip : null,
        icon    : null,
        id      : null,
        gems    : null
    },
    initialize: function(){
        console.log("item: " + this.attributes.slot);
    }
});


