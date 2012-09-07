
function getProfileData(lnk) {
    fetchData(lnk).then(function (data) {

        var heroes = $.map(data.heroes, function(i, name) {

            console.log(i.id + ": " + i.name)
        });

       d3.profiles[d3.profiles.curr.tag] = data;
       //getHeroesData(profileReady);

    });
}

function getHeroesData(callback) {

    var heroes = d3.profiles[d3.profiles.curr.tag].heroes;
    var arrCalls = [];

    for (var i in heroes){
        arrCalls.push(getHeroCall(d3.profiles.curr.url + "hero/" + heroes[i].id));
    }

    $.when.apply($, arrCalls).then(function(data){
        console.log("tttttttttt " + data);
        //getExtendedItems(callback);
    });
}

function getHeroCall(url){

    fetchData(url).then(function(data){
        console.log(data);
    })

}









function getSomeData(some, callback) {

    var arrCalls = [];

    for (var i in some){
        arrCalls.push(
            fetchData(url).then(function(data){

            })
        );
    }

    $.when.apply($, arrCalls).then(function(args){

    });
}


















