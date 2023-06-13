const Weapon = require('../classes/weapon')
const buildItem = require('./buildItem')
const weaponProperties = require('./weaponProperties')

const buildWeapon = (rawData, itemIndex, weaponIndex) => {
    const result = []
    result.push(buildItem(rawData, itemIndex, 'Weapon'))
    let weapon = new Weapon(itemIndex + 100000, weaponIndex, rawData.weapon_category, rawData.weapon_range)
    weapon.normalRange = rawData.range.normal
    if (rawData.range.long) {
        weapon.longRange = rawData.range.long
    }
    if (rawData.throw_range) {
        weapon.normalRange = rawData.throw_range.normal
        weapon.longRange = rawData.throw_range.long
    }
    if (rawData.damage) {
        weapon.damageDice = rawData.damage.damage_dice
        weapon.damageType = rawData.damage.damage_type.name
    }
    if (rawData.two_handed_damage) {
        weapon.twoDamageDice = rawData.two_handed_damage.damage_dice
    }
    weapon.properties = 0
    rawData.properties.forEach(property => {
        weapon.properties += weaponProperties[property.index]
    })
    result.push(weapon)
    return result
}

module.exports = buildWeapon