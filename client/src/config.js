function dummy() {

    var heroList = [
        {reg:"eu", name:"zebq",   id: "2452" },
        {reg:"eu", name:"KingKongor", id: "2672" }
    ];

    setTimeout((function(){

        for (var i in heroList) {

            var src = heroList[i].name + "#" + heroList[i].id
            d3.init(heroList[i].reg, src);
        }

    }), 2000)



}





