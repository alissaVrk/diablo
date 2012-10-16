/*

 apiResponse : {

 ErrorCode   : { json : "code"   },
 ErrorReason : { json : "reason" },
 //'OOPS', 'LIMITED', 'MAINTENANCE', 'NOTFOUND'

 Heroes      : { json : "heroes" }

 }

 apiHero : {

 name        : { json : "name"         , type : "string   " }
 class       : { json : "class"        , type : "string   " }
 id          : { json : "id"           , type : "number   " }
 level       : { json : "level"        , type : "number   " }
 hardcore    : { json : "hardcore"     , type : "bool     " }
 gender      : { json : "gender"       , type : "number   " }
 lastupdated : { json : "last-updated" , type : "number   " }
 dead        : { json : "dead"         , type : "bool     " }
 stats       : { json : "stats"        , type : "ApiStats " }
 skills      : { json : "skills"       , type : "ApiSkills" }
 items       : { json : "items"       , type : "ApiItems " }

 }

 apiStats : {
 Life              : { json:"life"
 Damage            : { json:"damage"
 AttackSpeed       : { json:"attackSpeed"
 Armor             : { json:"armor"
 Strength          : { json:"strength"
 Dexterity         : { json:"dexterity"
 Vitality          : { json:"vitality"
 Intelligence      : { json:"intelligence"
 ResistPhysical    : { json:"physicalResist"
 ResistFire        : { json:"fireResist"
 ResistCold        : { json:"coldResist"
 ResistLightning   : { json:"lightningResist"
 ResistPoison      : { json:"poisonResist"
 ResistArcane      : { json:"arcaneResist"
 CritDamage        : { json:"critDamage"
 DamageIncrease    : { json:"damageIncrease"
 CritChance        : { json:"critChance"
 DamageReduction   : { json:"damageReduction"
 BlockChance       : { json:"blockChance"
 ThornsDamage      : { json:"thorns"
 LifeSteal         : { json:"lifeSteal"
 LifePerKill       : { json:"lifePerKill"
 GoldFind          : { json:"goldFind"
 MagicFind         : { json:"magicFind"
 BlockAmountMin    : { json:"blockAmountMin"
 BlockAmountMax    : { json:"blockAmountMax"
 LifeOnHit         : { json:"lifeOnHit"
 PrimaryResource   : { json:"primaryResource"
 SecondaryResource : { json:"secondaryResource"
 }

 type ApiSkills struct {
 Active  []ApiActiveSkill  json:"active"
 Passive []ApiPassiveSkill json:"passive"
 }

 type ApiActiveSkill struct {
 Skill ApiSkill json:"skill"
 Rune  ApiRune  json:"rune"
 }

 type ApiPassiveSkill struct {
 Skill ApiSkill json:"skill"
 }

 type ApiSkill struct {
 Slug              string  json:"slug"
 Name              string  json:"name"
 Icon              string  json:"icon"
 Level             number rjson:"level"
 CategorySlug      string  json:"categorySlug"
 TooltipUrl        string  json:"tooltipUrl"
 Description       string  json:"description"
 SimpleDescription string  json:"simpleDescription"
 SkillCalcId       string  json:"skillCalcId"
 }

 type ApiRune struct {
 Slug              string  json:"slug"
 Type              string  json:"type"
 Name              string  json:"name"
 Level             number rjson:"level"
 Description       string  json:"description"
 SimpleDescription string  json:"simpleDescription"
 TooltipParams     string  json:"tooltipParams"
 SkillCalcId       string  json:"skillCalcId"
 Order             number rjson:"order"
 }

 type ApiItems struct {
 Head        ApiItem json:"head"
 Torso       ApiItem json:"torso"
 Feet        ApiItem json:"feet"
 Hands       ApiItem json:"hands"
 Shoulders   ApiItem json:"shoulders"
 Legs        ApiItem json:"legs"
 Bracers     ApiItem json:"bracers"
 MainHand    ApiItem json:"mainHand"
 OffHand     ApiItem json:"offHand"
 Waist       ApiItem json:"waist"
 RightFinger ApiItem json:"rightFinger"
 LeftFinger  ApiItem json:"leftFinger"
 Neck        ApiItem json:"neck"
 }

 type ApiItem struct {
 Id            string json:"id"
 Name          string json:"name"
 Icon          string json:"icon"
 DisplayColor  string json:"displayColor"
 TooltipParams string json:"tooltipParams"
 }



 */




var weaponTypes = {
    oneHanded : [ "Axe", "Ceremonial Knife", "Hand Crossbow", "Dagger", "Fist Weapon", "Mace", "Mighty Weapon", "Spear", "Sword", "Wand" ],
    twoHanded : [ "Two-Handed Axe", "Bow", "Daibo", "Crossbow", "Two-Handed Mace", "Two-Handed Mighty Weapon", "Polearm", "Staff", "Two-Handed Sword" ]
}
var armorTypes = [ "Ring", "Amulet", "Shoulders", "Helm", "Pants", "Gloves", "Chest Armor", "Bracers", "Boots", "Belt", "Cloak", "Mighty Belt", "Spirit Stone", "Voodoo Mask", "Wizard Hat" ];