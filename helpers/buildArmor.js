const Armor = require('../classes/armor')
const buildItem = require('./buildItem')


const buildArmor = (rawData, itemIndex, armorIndex) => {
    const result = []
    result.push(buildItem(rawData, itemIndex, 'Armor'))
    let armor = new Armor(itemIndex + 100000, armorIndex, rawData.armor_category, rawData.armor_class.base, rawData.armor_class.dex_bonus, rawData.str_minimum, rawData.stealth_disadvantage)
    result.push(armor)
    return result
}

module.exports = buildArmor