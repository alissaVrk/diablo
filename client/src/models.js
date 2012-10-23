var Career = Backbone.Model.extend({
    defaults: {
        battleTag : null,
        region    : null,
        name      : null,
        id        : null,
        heroes    : null,
        last      : null,
        urls      : null,
        rest      : null
    },

    initialize: function(){
        console.log("career");
    }
});

var Hero = Backbone.Model.extend({
    defaults: {
        class    : null,
        gender   : null,
        name     : null,
        id       : null,
        level    : null,
        items    : null,
        skills   : null,
        stats    : null
    },
    initialize: function(){
        console.log("hero");
    }
});

var Item = Backbone.Model.extend({
    defaults: {
        class    : null,
        gender   : null,
        name     : null,
        id       : null,
        level    : null,
        items    : null,
        skills   : null,
        stats    : null
    },
    initialize: function(){
        console.log("hero");
    }
});


