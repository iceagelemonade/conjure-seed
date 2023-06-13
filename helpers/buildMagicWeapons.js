// Magic Items that should have specfic weapon docs:
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
const buildMagicWeapons = (itemObjs, lastIndex) => {
    const output = []
    const magicWeapons = {
        "Dagger of Venom": {
            itemId: null,
            weaponId: 1,
            weaponCategory: "Simple",
            weaponRange: "Melee",
            normalRange: 20,
            longRange: 60,
            damageDice: "1d4 + 1",
            damageType: "Piercing",
            twoDamageDice: null,
            properties: 266,
        },
        "Dwarven Thrower": {
            itemId: null,
            weaponId: 2,
            weaponCategory: "Martial",
            weaponRange: "Melee",
            normalRange: 20,
            longRange: 60,
            damageDice: "1d8 + 3",
            damageType: "Bludgeoning",
            twoDamageDice: "1d10 + 3",
            properties: 1280,
        },
        "Hammer of Thunderbolts": {
            itemId: null,
            weaponId: 3,
            weaponCategory: "Martial",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "2d6 + 1",
            damageType: "Bludgeoning",
            twoDamageDice: null,
            properties: 516,
        },
        "Javelin of Lightning": {
            itemId: null,
            weaponId: 4,
            weaponCategory: "Simple",
            weaponRange: "Melee",
            normalRange: 30,
            longRange: 120,
            damageDice: "1d6",
            damageType: "Piercing",
            twoDamageDice: null,
            properties: 256,
        },
        "Mace of Disruption": {
            itemId: null,
            weaponId: 5,
            weaponCategory: "Simple",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "1d6",
            damageType: "Bludgeoning",
            twoDamageDice: null,
            properties: 0,
        },
        "Mace of Smiting": {
            itemId: null,
            weaponId: 6,
            weaponCategory: "Simple",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "1d6 + 1",
            damageType: "Bludgeoning",
            twoDamageDice: null,
            properties: 0,
        },
        "Mace of Terror": {
            itemId: null,
            weaponId: 7,
            weaponCategory: "Simple",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "1d6",
            damageType: "Bludgeoning",
            twoDamageDice: null,
            properties: 0,
        },
        "Oathbow": {
            itemId: null,
            weaponId: 8,
            weaponCategory: "Martial",
            weaponRange: "Ranged",
            normalRange: 150,
            longRange: 600,
            damageDice: "1d8",
            damageType: "Piercing",
            twoDamageDice: null,
            properties: 517,
        },
        "Scimitar of Speed": {
            itemId: null,
            weaponId: 9,
            weaponCategory: "Martial",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "1d6 + 2",
            damageType: "Slashing",
            twoDamageDice: null,
            properties: 10,
        },
        "Sun Blade": {
            itemId: null,
            weaponId: 10,
            weaponCategory: "Martial",
            weaponRange: "Melee",
            normalRange: 5,
            longRange: null,
            damageDice: "1d8 + 2",
            damageType: "Radiant",
            twoDamageDice: "1d10 + 2",
            properties: 1024,
        },
        "Trident of Fish Command": {
            itemId: null,
            weaponId: 11,
            weaponCategory: "Martial",
            weaponRange: "Melee",
            normalRange: 20,
            longRange: 60,
            damageDice: "1d6",
            damageType: "Piercing",
            twoDamageDice: "1d8",
            properties: 1280,
        }
    }

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

    for (key in magicWeapons) {
        magicWeapons[key].itemId = findItem(key, 0, itemObjs.length - 1)
        magicWeapons[key].weaponId += lastIndex
        output.push(magicWeapons[key])
    }
    return output
}

module.exports = buildMagicWeapons