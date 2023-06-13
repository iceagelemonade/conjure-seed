const findType = (rawData) => {
    // console.log(rawData)
    if (rawData.rarity) {
        return "Magic Item"
    } else if (rawData.weapon_category) {
        return "Weapon"
    } else if (rawData.armor_class) {
        return "Armor"
    } else {
        return "Gear"
    }
}

module.exports = findType