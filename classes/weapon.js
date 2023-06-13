class Weapon {
    constructor(itemId, weaponId, weaponCategory, weaponRange) {
        this.itemId = itemId
        this.weaponId = weaponId
        this.weaponCategory = weaponCategory
        this.weaponRange = weaponRange
        this.normalRange = null
        this.longRange = null
        this.damageDice = null
        this.damageType = null
        this.twoDamageDice = null
        // this.ammunition = false
        // this.finesse = false
        // this.heavy = false
        // this.light = false
        // this.loading = false
        // this.monk = false
        // this.reach = false
        // this.special = false
        // this.thrown = false
        // this.two_handed = false
        // this.versatile = false
        this.properties = 0
        
    }
}

module.exports = Weapon