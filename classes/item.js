 class Item {
    constructor(id, name, type, category) {
        this.id = id
        this.name = name
        this.description = null
        this.from_srd = true
        this.owner = 100000
        this.published = false
        this.weight = null
        this.value = null
        this.currency = null
        this.type = type
        this.category = category
        this.rarity = null
        this.attunement = false
    }
}

module.exports = Item