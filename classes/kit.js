class Kit {
    constructor(kitId, name, owner, value, currency) {
        this.kitId = kitId
        this.name = name
        this.description = null
        this.owner = owner
        this.value = value
        this.currency = currency
    }
}

module.exports = Kit