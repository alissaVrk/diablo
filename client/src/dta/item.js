var apiResponse = {

    errorCode   : { json : "code"   },
    errorReason : { json : "reason" },
    oops        : ['LIMITED', 'MAINTENANCE', 'NOTFOUND'],
    heroes      : { json : "heroes" }
}
var apiHero = [ "name", "class", "id", "level", "hardcore", "gender", "last-updated", "dead", "stats", "skills", "items" ]

var apiStats = [
    "life", "damage", "attackSpeed", "armor", "strength", "dexterity", "vitality", "intelligence", "physicalResist", "fireResist", "coldResist", "lightningResist", "poisonResist", "arcaneResist", "critDamage",
    "damageIncrease", "critChance", "damageReduction", "blockChance", "thorns", "lifeSteal", "lifePerKill", "goldFind", "magicFind", "blockAmountMin", "blockAmountMax", "lifeOnHit", "primaryResource", "secondaryResource"
]


var skill = function() {



}

 var apiSkillStruct = {
    Active  : { json:"active" },
    Passive : { json:"passive"}
 }

var apiActiveSkillStruct = {
    Skill : { json:"skill"},
    Rune  : { json:"rune" }
}

var apiPassiveSkillStruct = {
    Skill : { json:"skill"}
}

var apiSkillStruct = {
    Slug              : { json:"slug"             },
    Name              : { json:"name"             },
    Icon              : { json:"icon"             },
    Level             : { json:"level"            },
    CategorySlug      : { json:"categorySlug"     },
    TooltipUrl        : { json:"tooltipUrl"       },
    Description       : { json:"description"      },
    SimpleDescription : { json:"simpleDescription"},
    SkillCalcId       : { json:"skillCalcId"      }
}


var apiRuneStruct = {
    Slug              : {  json:"slug"              },
    Type              : {  json:"type"              },
    Name              : {  json:"name"              },
    Level             : {  json:"level"             },
    Description       : {  json:"description"       },
    SimpleDescription : {  json:"simpleDescription" },
    TooltipParams     : {  json:"tooltipParams"     },
    SkillCalcId       : {  json:"skillCalcId"       },
    Order             : {  json:"order"             }
}

var apiItemStruct = {

    Head        : { json:"head"       },
    Torso       : { json:"torso"      },
    Feet        : { json:"feet"       },
    Hands       : { json:"hands"      },
    Shoulders   : { json:"shoulders"  },
    Legs        : { json:"legs"       },
    Bracers     : { json:"bracers"    },
    MainHand    : { json:"mainHand"   },
    OffHand     : { json:"offHand"    },
    Waist       : { json:"waist"      },
    RightFinger : { json:"rightFinger"},
    LeftFinger  : { json:"leftFinger" },
    Neck        : { json:"neck"       }
}

var apiItemStruct = {
    Id            : { json:"id"           },
    Name          : { json:"name"         },
    Icon          : { json:"icon"         },
    DisplayColor  : { json:"displayColor" },
    TooltipParams : { json:"tooltipParams"}
}

var weaponTypes = {
    oneHanded : [ "Axe", "Ceremonial Knife", "Hand Crossbow", "Dagger", "Fist Weapon", "Mace", "Mighty Weapon", "Spear", "Sword", "Wand" ],
    twoHanded : [ "Two-Handed Axe", "Bow", "Daibo", "Crossbow", "Two-Handed Mace", "Two-Handed Mighty Weapon", "Polearm", "Staff", "Two-Handed Sword" ]
}
var armorTypes = [ "Ring", "Amulet", "Shoulders", "Helm", "Pants", "Gloves", "Chest Armor", "Bracers", "Boots", "Belt", "Cloak", "Mighty Belt", "Spirit Stone", "Voodoo Mask", "Wizard Hat" ];