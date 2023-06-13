
const buildDesc = (arr, magicItem) => {
    let tableFirst
    let tableLast
    let removeLine
    let containsList
    let listFirst
    let listLast
    arr.forEach((line, index) => {
        line.slice(-1) === ":" ? containsList = true : null
        if (containsList && line.slice(0, 2) === "* ") {
            if (!listFirst) {
                listFirst = index
            }
            listLast = index
        }
        if (line.includes('|---|')) {
            removeLine = index
        }
        if (line.includes('|') && tableFirst) {
            tableLast = index
        } else if (line.includes('|') && !tableFirst) {
            tableFirst = index
        }
    })
    if (tableFirst && tableLast) {
        arr[tableFirst] = `&t${arr[tableFirst]}`
        arr[tableLast] = `${arr[tableLast]} &t`
    }
    if (removeLine) {
        arr.splice(removeLine, 1)
    }
    if (listFirst && listLast) {
        list = arr.slice(listFirst, listLast + 1).join("&l&l")
        list = `&l${list}&l`
        list = list.replaceAll("* ", "")
        arr.splice(listFirst, listLast - listFirst + 1, list)
        console.log(arr)
    }
    magicItem ? arr[0] = `&i${arr[0]}&i` : null
    let desc = arr.join("&&")
    desc = desc.replaceAll("***", "&b&i")
    desc = desc.replaceAll("**", "&b")
    desc = desc.replaceAll('"', '&quot;')
    return desc
}

module.exports = buildDesc
