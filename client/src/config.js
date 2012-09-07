var d3;
d3 = {
    base:{
        host    : "battle.net/",
        api     : "api/d3/",
        media   : "media.blizzard.com/",
        regions : { us:"us", eu:'eu', kr:"kr", tw:"tw" },
        locale  : { "us+en":"en_US", "us+es":"es_MX", "eu+en":"en_GB", "eu+it":"it_IT", "eu+es":"es_ES", "eu+pt":"pt_PT", "eu+fr":"fr_FR", "eu+ru":"ru_RU", "eu+pl":"pl_PL", "eu+de":"de_DE", "kr+ko":"ko_KR", "kr+en":"en_US", "tw+zh":"zh_TW", "tw+en":"en_US", "cn+zh":"zh_CN", "cn+en":"en_US" }
    },

    current  : { region: null, name:null, id:null, tag:null, url:null, last:null },
    profiles : {}

};

