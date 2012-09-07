

 function hero(data){


var hero = {};

    hero.class    = data.class
    hero.dead     = data.dead
    hero.gender   = data.gender
    hero.hardcore = data.hardcore
    hero.id       = data.id
    hero.level    = data.level
    hero.name     = data.name
    hero.pLevel   = data.paragonLevel
    hero.url      = data.url

    hero.stats    = heroInfo()


     function getData(url) {

         $.ajax({ url: url, type:"GET", dataType:"jsonp", jsonpCallback: "heroInfo",
             success: function(args){
                 console.log("inside ajax getData args: " + args + " | " + url);
                 args.code ?  handlerErr(args) : null;
             },
             error: function(args){
                 console.log("Error ajax" + args);
             }
         })
     }




}

/*

hero.class    = data.class
hero.dead     = data.dead
hero.gender   = data.gender
hero.hardcore = data.hardcore
hero.id       = data.id
hero.level    = data.level
hero.name     = data.name
hero.pLevel   = data.paragonLevel


    followers
    progress: Object
    skills: Object
    stats:
    items: Object
    kills




*/
