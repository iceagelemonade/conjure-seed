const Item = require('../classes/item')
const buildDesc = require('./buildDesc')
const armorDescriptions = require('./armorDescriptions')

const buildItem = (rawData, index, type) => {
    let item = new Item(index + 100000, rawData.name, type, rawData.equipment_category.name)
    if (rawData.desc.length > 0) {
        if (type === 'Magic Item') {
            if (rawData.desc[0].includes('attunement')) {
                item.attunement = true
            }
            // below is just to find which magic items build off a sspecific weapon or armor
            // I was going to automate this similar to how I build weapons & armor, but there are too many things to check for and the cases would be so specific that I am better off just doing them by hand
            // Weapons:
            // if (rawData.desc[0].includes('Weapon') && !rawData.desc[0].split(',')[0].includes('any')) {
                // console.log(item.name)
            // }
            // Results:
            // Hammer of Thunderbolts
            // Mace of Smiting
            // Mace of Disruption
            // Javelin of Lightning
            // Mace of Terror
            // Sun Blade
            // Oathbow
            // Trident of Fish Command
            // Scimitar of Speed
            // Dwarven Thrower
            // Arrow of Slaying
            // Dagger of Venom
            // Armor:
            // if (rawData.desc[0].includes('Armor') && !rawData.desc[0].split(')')[0].includes('any') && !rawData.desc[0].split(')')[0].includes(' or')) {
            //     console.log(item.name)
            // }
            // Results:
            // White Dragon Scale Mail
            // Demon Armor
            // Copper Dragon Scale Mail
            // Bronze Dragon Scale Mail
            // Glamoured Studded Leather Armor
            // Silver Dragon Scale Mail
            // Armor of Invulnerability
            // Brass Dragon Scale Mail
            // Gold Dragon Scale Mail
            // Arrow-Catching Shield
            // Armor of Vulnerability
            // Plate Armor of Etherealness
            // Elven Chain
            // Animated Shield
            // Dwarven Plate
            // Shield of Missile Attraction
            // Black Dragon Scale Mail
            // Blue Dragon Scale Mail
            // Green Dragon Scale Mail
            // Spellguard Shield
            // Dragon Scale Mail
            // Red Dragon Scale Mail
            

        }
        item.description = buildDesc(rawData.desc, type === 'Magic Item' ? true : false)
        if (item.description.includes('weighs ')) {
            const weightStr = item.description.slice().split('weighs ')[1].split(' ')[0]
            const weightNum = Number(weightStr)
            if (weightNum > 0) {
                item.weight = Number(weightStr)
                // console.log(`Item: ${item.name} - Weight: ${item.weight}`)
            }
        }
        if (rawData.speed) {
            item.description = `&iSpeed: ${rawData.speed.quantity.toString()}${rawData.speed.unit}&i&&${item.description}`
            // console.log(`${item.name}\n${item.description}`)
        }
    }
    if (rawData.special && rawData.special.length > 0) {
        item.description = `&B&ISpecial:&I&B ${rawData.special.join("")}`
    }
    if (rawData.weight) {
        item.weight = rawData.weight
    }
    if (rawData.cost) {
        item.value = rawData.cost.quantity
        item.currency = rawData.cost.unit
    }
    if (rawData.rarity) {
        item.rarity = rawData.rarity.name
    }
    if (type === 'Armor') {
        const descName = item.name.toLowerCase().replaceAll(' ', '_')
        item.description = armorDescriptions[descName]
    }
    return item
}

module.exports = buildItem