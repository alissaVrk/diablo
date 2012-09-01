/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 9/1/12
 * Time: 11:05 PM
 * To change this template use File | Settings | File Templates.
 */

var model = {
    items: {},
    stats: {},
    skills: {}
};
var selectedHero;
function loadViews(heroes){

    loadHeroesView(heroes);
    var lastHero = _.filter(heroes, function(hero){
        return hero.last;
    });
    selectedHero = lastHero.length > 0 ? lastHero[0] : heroes[0];
    loadHeroView(selectedHero, true);
}

function loadHeroView(selectedHero, isFirstTime){
    loadItemsView(selectedHero, isFirstTime);
    loadStatsView(selectedHero, isFirstTime);
    loadSkillsView(selectedHero, isFirstTime);
}

function loadHeroesView(heroes){
    ko.applyBindings({
        m_heroes:_.map(heroes, function(hero){
            return {
                'klass' : (hero.last ? 'lastPlayed-': '') + hero.class + '-' + hero.gender,
                'items': hero.items,
                'skills': hero.skills,
                'stats': hero.stats,
                'selectHero': function(){
                    selectedHero.last = false;
                    selectedHero = this;
                    selectedHero.last = true;
                    loadHeroView(this);
                }
            }
        })
    }, $('#heroes')[0]);
}

function loadItemsView(selectedHero, isFirstTime){
    var iconUrl = "http://eu.media.blizzard.com/d3/icons/items/large/";
    _.map(selectedHero.items, function(item){
        item.m_icon = iconUrl + item.icon + '.png'
    });

    model.items.m_items = selectedHero.items;
    if(isFirstTime){
        ko.applyBindings(model.items, $('#gear')[0]);
    }
}

function loadStatsView(selectedHero, isFirstTime) {
    var stats = _.map(selectedHero.stats, function(value, key){
        return {
            'name': key,
            'value': value
        };
    });
    model.stats.m_stats = stats;
    if(isFirstTime){
        ko.applyBindings(model.stats, $('#stats')[0]);
    }
}
function loadSkillsView(selectedHero, isFirstTime){
    var iconUrl = "http://eu.media.blizzard.com/d3/icons/skill/large/";
    selectedHero.skills.active = _.filter(selectedHero.skills.active, function(item){
        return !! item.skill;
    });
    selectedHero.skills.passive = _.filter(selectedHero.skills.passive, function(item){
        return !! item.skill;
    });
    _.each(selectedHero.skills.active, function(item){
        var skill = item.skill;
        skill.m_icon = iconUrl + skill.icon + '.png';
        var rune = item.rune;
        if(rune){
            rune.m_icon = iconUrl + rune.icon + '.png';
        }else{
            item.rune.m_icon = '';
        }
    });
    _.each(selectedHero.skills.passive, function(item){
        var skill = item.skill
        skill.m_icon = iconUrl + skill.icon + '.png'
    });
    model.skills. m_skills_active = selectedHero.skills.active;
    model.skills. m_skills_passive = selectedHero.skills.passive;
    if(isFirstTime){
        ko.applyBindings(model.skills, $('#skills')[0]);
    }
}
