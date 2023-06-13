// Magic Items that should have specfic armor docs:


// Copper Dragon Scale Mail
// White Dragon Scale Mail
// Bronze Dragon Scale Mail
// Brass Dragon Scale Mail
// Gold Dragon Scale Mail
// Black Dragon Scale Mail
// Blue Dragon Scale Mail
// Green Dragon Scale Mail
// Silver Dragon Scale Mail
// Dragon Scale Mail
// Red Dragon Scale Mail
// //////////////
// Animated Shield
// Armor of Invulnerability
// Armor of Vulnerability
// Arrow-Catching Shield
// Demon Armor
// Dwarven Plate
// Elven Chain
// Glamoured Studded Leather Armor
// Plate Armor of Etherealness
// Shield of Missile Attraction
// Spellguard Shield

const buildMagicArmor = (itemObjs, lastIndex) => {
    const output = []
    const magicArmor = {
        "Dragon Scale Mail" : {
            itemId : 0,
            armorId : 1,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Black Dragon Scale Mail" : {
            itemId : 0,
            armorId : 2,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Blue Dragon Scale Mail" : {
            itemId : 0,
            armorId : 3,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Brass Dragon Scale Mail" : {
            itemId : 0,
            armorId : 4,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Bronze Dragon Scale Mail" : {
            itemId : 0,
            armorId : 5,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Copper Dragon Scale Mail" : {
            itemId : 0,
            armorId : 6,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Gold Dragon Scale Mail" : {
            itemId : 0,
            armorId : 7,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Green Dragon Scale Mail" : {
            itemId : 0,
            armorId : 8,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Red Dragon Scale Mail" : {
            itemId : 0,
            armorId : 9,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Silver Dragon Scale Mail" : {
            itemId : 0,
            armorId : 10,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "White Dragon Scale Mail" : {
            itemId : 0,
            armorId : 11,
            armorType : "Medium",
            armorClass : 15,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : true
        },
        "Animated Shield" : {
            itemId : 0,
            armorId : 12,
            armorType : "Shield",
            armorClass : 2,
            dexBonus : false,
            strMin : 0,
            stealthDisadvantage : false
        },
        "Armor of Invulnerability" : {
            itemId : 0,
            armorId : 13,
            armorType : "Heavy",
            armorClass : 18,
            dexBonus : false,
            strMin : 15,
            stealthDisadvantage : true
        },
        "Armor of Vulnerability" : {
            itemId : 0,
            armorId : 14,
            armorType : "Heavy",
            armorClass : 18,
            dexBonus : false,
            strMin : 15,
            stealthDisadvantage : true
        },
        "Arrow-Catching Shield" : {
            itemId : 0,
            armorId : 15,
            armorType : "Shield",
            armorClass : 2,
            dexBonus : false,
            strMin : 0,
            stealthDisadvantage : false
        },
        "Demon Armor" : {
            itemId : 0,
            armorId : 16,
            armorType : "Heavy",
            armorClass : 19,
            dexBonus : false,
            strMin : 15,
            stealthDisadvantage : true
        },
        "Dwarven Plate" : {
            itemId : 0,
            armorId : 17,
            armorType : "Heavy",
            armorClass : 20,
            dexBonus : false,
            strMin : 15,
            stealthDisadvantage : true
        },
        "Elven Chain" : {
            itemId : 0,
            armorId : 18,
            armorType : "Medium",
            armorClass : 13,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : false
        },
        "Glamoured Studded Leather Armor" : {
            itemId : 0,
            armorId : 19,
            armorType : "Light",
            armorClass : 13,
            dexBonus : true,
            strMin : 0,
            stealthDisadvantage : false
        },
        "Plate Armor of Etherealness" : {
            itemId : 0,
            armorId : 20,
            armorType : "Heavy",
            armorClass : 18,
            dexBonus : false,
            strMin : 15,
            stealthDisadvantage : true
        },
        "Shield of Missile Attraction" : {
            itemId : 0,
            armorId : 21,
            armorType : "Shield",
            armorClass : 2,
            dexBonus : false,
            strMin : 0,
            stealthDisadvantage : false
        },
        "Spellguard Shield" : {
            itemId : 0,
            armorId : 22,
            armorType : "Shield",
            armorClass : 2,
            dexBonus : false,
            strMin : 0,
            stealthDisadvantage : false
        }
    }

    const findItem = (name, min, max) => {
        const index = Math.floor((max - min) / 2) + min
        if (index < 0 || index > itemObjs.length - 1) {
            console.log(`Oppsy Whoopsy :(\n ${index}`)
        }
        if (name === itemObjs[index].name) {
            return itemObjs[index].id
        } else if (name < itemObjs[index].name) {
            return findItem(name, min, index)
        } else {
            return findItem(name, index, max)
        }
    }

    for (key in magicArmor) {
        magicArmor[key].itemId = findItem(key, 0, itemObjs.length - 1)
        magicArmor[key].armorId += lastIndex
        output.push(magicArmor[key])
    }
    return output
}

module.exports = buildMagicArmor