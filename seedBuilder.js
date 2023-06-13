// import modules
const axios = require('axios')
const fs = require('fs')

// import helper functions
const findType = require('./helpers/findType')
const buildItem = require('./helpers/buildItem')
const buildArmor = require('./helpers/buildArmor')
const buildWeapon = require('./helpers/buildWeapon')
const buildMagicWeapons = require('./helpers/buildMagicWeapons')
const buildMagicArmor = require('./helpers/buildMagicArmor')

// import classes
// we need the Kit class for the KitItem class, which is why I chose not to put this in a seperate helper function like all the other classes
const Kit = require('./classes/kit')
const KitItem = require('./classes/kitItem')

// declear some arrays we will use
const itemObjs = []
const weaponObjs = []
const armorObjs = []
const kitObjs = []
const kitItemObjs = []

// decleared what will become our sorted arrays
let rawItemDataSorted
let rawKitDataSorted

// more variables... these ones are specifically used in our promise chain
const host = 'https://www.dnd5eapi.co'
let itemCount = 0
let endpoints = []
let rawItemData = []
const rawKitData = []


// Recursive function for when we later need to find which items go in kits (Packs)
const findItem = (name, min, max) => {
    const index = Math.floor((max - min) / 2) + min
    if (index < 0 || index > itemObjs.length - 1) {
        console.log(`Oppsy Whoopsy :(\n ${index}`)
    }
    // console.log (`Find: ${name} | Current: ${itemObjs[index].name} #${index} | Min: ${min} | Max: ${max}`)
    if (name === itemObjs[index].name) {
        // console.log(`Got 'em!\n ${itemObjs[index].name}\n ${itemObjs[index].id}`)
        return itemObjs[index].id
    } else if (name < itemObjs[index].name) {
        // console.log(`Next: Left ${nextIndex}`)
        return findItem(name, min, index)
    } else {
        // console.log(`Next: Right ${nextIndex}`)
        return findItem(name, index, max)
    }
}

// Promise chain for collecting data from the 5eAPI
axios.get(host + '/api/magic-items')
    .then(res => {
        itemCount += res.data.count
        return res.data.results
    })
    .then(results => {
        results.forEach(result => {
            endpoints.push(result.url)
        })
    })
    .then(() => {
        axios.get(host + '/api/equipment')
            .then(res => {
                itemCount += res.data.count
                return res.data.results
            })
            .then(results => {
                results.forEach(result => {
                    endpoints.push(result.url)
                })
            })
            .then(() => {
                endpoints.forEach(endpoint => {
                    axios.get(host + endpoint)
                        .then(res => {
                            // we seperate equipment packs here (what I call "kits") so they won't get indexed as items
                            if (res.data.gear_category && res.data.gear_category.index === "equipment-packs") {
                                rawKitData.push(res.data)
                            } else {
                                rawItemData.push(res.data)
                            }
                            checkFinished()
                        })
                })
            })
    })

// Once we have all the data from 5eAPI we can begin formating it in the manner we want
const checkFinished = () => {
    // console.log(`${rawItemData.length}/${itemCount}`)
    // Start with a simple check to make sure we truely did get all the data
    if (itemCount === rawItemData.length + rawKitData.length && rawItemData.length > 0) {
        // console.log(rawItemData)
        console.log(`${rawItemData.length + rawKitData.length}/${itemCount}`)
        // rawItemData.forEach(item => {
        //     if (item.variants && item.variants.length > 0) {
        //         console.log(item.name)
        //     }
        // })
        // Sort our items... very important for when we look them up to build kits
        rawItemDataSorted = rawItemData.sort((a, b) => {
            const itemA = a.name.toUpperCase()
            const itemB = b.name.toUpperCase()
            if (itemA < itemB) {
                return -1
            }
            if (itemA > itemB) {
                return 1
            }
            return 0
        })
        // Sort the kits too because I like sorted data in seeds, but excluding this breaks nothing
        rawKitDataSorted = rawKitData.sort((a, b) => {
            const kitA = a.name.toUpperCase()
            const kitB = b.name.toUpperCase()
            if (kitA < kitB) {
                return -1
            }
            if (kitA > kitB) {
                return 1
            }
            return 0
        })

        rawItemDataSorted.forEach((item, index) => {
            const type = findType(item)
            if (type === 'Gear' || type === 'Magic Item') {
                // every item (excluding equipment packs/kits) gets an item class but armor and weapons will call buildItem in their own helper functions
                itemObjs.push(buildItem(item, index, type))
            } else if (type === 'Armor'){
                const armorArr = buildArmor(item, index, armorObjs.length + 1)
                itemObjs.push(armorArr[0])
                armorObjs.push(armorArr[1])
            } else if (type === 'Weapon'){
                const weaponArr = buildWeapon(item, index, weaponObjs.length + 1)
                itemObjs.push(weaponArr[0])
                weaponObjs.push(weaponArr[1])
            }
        })
        // add weapon object for each magic item that is a specific weapon
        buildMagicWeapons(itemObjs, weaponObjs.length + 1).forEach(weapon => {weaponObjs.push(weapon)})
        // add weapon object for each magic item that is a specific armor
        buildMagicArmor(itemObjs, armorObjs.length + 1).forEach(armor => {armorObjs.push(armor)})
        // here we use the recursive functioned defined up above
        rawKitDataSorted.forEach((kit, index) => {

            kitObjs.push(new Kit(index +1, kit.name, 100000, kit.cost.quantity, kit.cost.unit))
            kit.contents.forEach(item => {
                kitItemObjs.push(new KitItem(index +1, findItem(item.item.name, 0, itemObjs.length - 1), item.quantity))
            })     
        })
        // console.log(kitItemObjs)
        ///////////////////////////
        // Build SQL and JSON files
        ///////////////////////////
        const sqlData = ["-- Begin Items"]
        itemObjs.forEach(item => {
            sqlData.push(`INSERT INTO items (item_id, name, description, from_srd, owner, published, weight, value, currency, type, category, rarity, attunement) VALUES (${item.id}, "${item.name}", ${item.description ? `"${item.description}"` : "null"}, ${item.from_srd}, ${item.owner}, ${item.published}, ${item.weight}, ${item.value}, ${item.currency ? `"${item.currency}"` : "null"}, "${item.type}", ${item.category ? `"${item.category}"` : "null"}, ${item.rarity ? `"${item.rarity}"` : "null"}, ${item.attunement})`)
        })
        sqlData.push("-- Begin Weapons")
        weaponObjs.forEach(weapon => {
            sqlData.push(`INSERT INTO items_weapons (weapon_id, item_id, weapon_category, weapon_range, normal_range, long_range, damage_dice, damage_type, 2h_damage_dice, properties) VALUES (${weapon.weaponId}, ${weapon.itemId}, "${weapon.weaponCategory}", "${weapon.weaponRange}", ${weapon.normalRange}, ${weapon.longRange}, ${weapon.damageDice ? `"${weapon.damageDice}"` : "null"}, ${weapon.damageType ? `"${weapon.damageType}"` : "null"}, ${weapon.twoDamageDice ? `"${weapon.twoDamageDice}"` : "null"}, ${weapon.properties})`)
        })
        sqlData.push("-- Begin Armor")
        armorObjs.forEach(armor => {
            sqlData.push(`INSERT INTO items_armor (armor_id, item_id, armor_type, armor_class, dex_bonus, str_min, stealth_disadvantage) VALUES (${armor.armorId}, ${armor.itemId}, "${armor.armorType}", ${armor.armorClass}, ${armor.dexBonus}, ${armor.strMin}, ${armor.stealthDisadvantage})`)
        })
        sqlData.push("-- Begin Equipment Packs (Kits)")
        kitObjs.forEach(kit => {
            sqlData.push(`INSERT INTO kits (kit_id, kit_name, owner, value, currency) VALUES (${kit.kitId}, "${kit.name}", ${kit.owner}, ${kit.value}, "${kit.currency}")`)
        })
        sqlData.push("-- Begin Items In Kits")
        kitItemObjs.forEach(item => {
            sqlData.push(`INSERT INTO kit_items (kit_id, item_id, qty) VALUES (${item.kitId}, ${item.itemId}, ${item.qty})`)
        })
        let sqlDataStr = sqlData.join('; \n')
        sqlDataStr = `${sqlDataStr};`
        fs.writeFile('seed-files/seed.sql', sqlDataStr, err => {
            if (err) {
                console.error(err)
            }
        })
        //////////////////////////////////////
    }
}