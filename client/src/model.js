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
var selectedHeroModel;
function loadViews(heroes){

    var heroesModel = loadHeroesView(heroes);
    var lastHero = _.filter(heroesModel, function(hero){
        return hero.selected;
    });
    selectedHeroModel = lastHero.length > 0 ? lastHero[0] : heroesModel[0];
    loadHeroView(selectedHeroModel, true);
}

function loadHeroView(selectedHero, isFirstTime){
    loadItemsView(selectedHero, isFirstTime);
    loadStatsView(selectedHero, isFirstTime);
    loadSkillsView(selectedHero, isFirstTime);
}

function loadHeroesView(heroes){
    var heroesModel = _.map(heroes, function(hero){
        return {
            'klass' : ko.observable((hero.last ? 'lastPlayed-': '') + hero.class + '-' + hero.gender),
            'items': hero.items,
            'skills': hero.skills,
            'stats': hero.stats,
            'selected': hero.last,
            'selectHero': function(){
                selectedHeroModel.selected = false;
                selectedHeroModel.klass(selectedHeroModel.klass().replace('lastPlayed-', ''));
                selectedHeroModel = this;
                selectedHeroModel.klass('lastPlayed-' + selectedHeroModel.klass());
                selectedHeroModel.selected = true;
                loadHeroView(this);
            }
        }
    });
    ko.applyBindings({
        m_heroes: heroesModel
    }, $('#heroes')[0]);
    return heroesModel;
}

function loadItemsView(selectedHero, isFirstTime){
    var iconUrl = "http://eu.media.blizzard.com/d3/icons/items/large/";
    _.each(items, function(item, itemName){
        var heroItem = selectedHero.items[itemName];
        if(heroItem){
            item.m_icon(iconUrl + heroItem.icon + '.png');
        }else{
            item.m_icon('');
        }
    });
    ko.applyBindings(items, $('#gear')[0]);
}

var items = {
    bracers: {
        'm_icon': ko.observable()
    },
    feet: {
        'm_icon': ko.observable()
    },
    hands: {
        'm_icon': ko.observable()
    },
    head: {
        'm_icon': ko.observable()
    },
    leftFinger: {
        'm_icon': ko.observable()
    },
    legs: {         'm_icon': ko.observable()     },
    mainHand: {         'm_icon': ko.observable()     },
    neck: {         'm_icon': ko.observable()     },
    offHand: {         'm_icon': ko.observable()     },
    rightFinger: {         'm_icon': ko.observable()     },
    shoulders: {         'm_icon': ko.observable()     },
    torso: {         'm_icon': ko.observable()     },
    waist: {         'm_icon': ko.observable()     }
}

function loadStatsView(selectedHero, isFirstTime) {
    var stats = _.map(selectedHero.stats, function(value, key){
        return {
            'name': key,
            'value': value
        };
    });
    if(isFirstTime){
        model.stats.m_stats = ko.observableArray(stats);
        ko.applyBindings(model.stats, $('#stats')[0]);
    }else{
        model.stats.m_stats(stats);
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
            item.rune = {m_icon: ''};
        }
    });
    _.each(selectedHero.skills.passive, function(item){
        var skill = item.skill
        skill.m_icon = iconUrl + skill.icon + '.png'
    });
    if(isFirstTime){
        model.skills.m_skills_active = ko.observableArray(selectedHero.skills.active);
        model.skills.m_skills_passive = ko.observableArray(selectedHero.skills.passive);
        ko.applyBindings(model.skills, $('#skills')[0]);
    }else{
        model.skills.m_skills_active(selectedHero.skills.active);
        model.skills.m_skills_passive(selectedHero.skills.passive);
    }
}
