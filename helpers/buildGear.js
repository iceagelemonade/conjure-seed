const Item = require('../classes/item')
const buildDesc = require('./buildDescDesc')


const buildGear = (rawData, index) => {
    let item = new Item(index + 100000, rawData.name, 'Gear', rawData.equipment_category.name)
    if (rawData.desc.length > 0) {
        item.description = buildDesc(rawData.desc)
    }
    if (rawData.weight) {
        item.weight = rawData.weight
    }
    if (rawData.cost) {
        item.value = rawData.cost.quantity
        item.currency = rawData.cost.unit
    }
    return item
}

module.exports = buildGear