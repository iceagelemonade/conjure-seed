class Armor {
    constructor(itemId, armorId, armorType, armorClass, dexBonus, strMin, stealthDisadvantage) {
        this.itemId = itemId
        this.armorId = armorId
        this.armorType = armorType
        this.armorClass = armorClass
        this.dexBonus = dexBonus
        this.strMin = strMin
        this.stealthDisadvantage = stealthDisadvantage
    }
}

module.exports = Armor