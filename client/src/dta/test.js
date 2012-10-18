






var api = {};
var urls = {};
var media = {};
var game = {};

api.host    =  ".battle.net"
api.media   =  ".media.blizzard.com"
api.servers =  ["us", "eu", "tw", "kr", "cn"]
api.lang    =  ["en_US", "es_MX", "en_GB", "it_IT", "es_ES", "pt_PT", "fr_FR", "ru_RU", "pl_PL", "de_DE", "ko_KR", "en_US", "zh_TW", "en_US", "zh_CN", "en_US"]
api.errors  =  ["OOPS", "LIMITED", "MAINTENANCE", "NOTFOUND"]

urls.career    = ""
urls.hero      = ""

urls.follower  = ""
urls.artisan   = ""

urls.item      = ""
urls.itemIcon  = ""

urls.skill     = ""
urls.skillImg  = ""

urls.paperdoll = ""

media.itemSizes  =  ["small", "large"]
media.skillSizes =  ["21", "42", "64"]

game.genders       =  ["male", "female"]
game.classes       =  ["barbarian", "witch-doctor", "demon-hunter", "monk", "wizard"]
game.followerTypes =  ["enchantress", "templar", "scoundrel"]
game.artisanTypes  =  ["blacksmith", "jeweler"]