// This function is for rendering user input for a larger app
// it prevents users from injecting html code, but allows some editing options for bold, italics, tables, and lists
// we could sanitize HTML code before it ever hits the server, but preventing characters that may be useful (like '<') is a bad idea, and replacing them with their HTML code will increase the character count, so we will only do it at render
// because of this, this event will have two states, one where styling is not permitted but the '<' characters are replaced, and one where styling is allowed
// The second parameter takes care of this

const intereptDesc = (str, desc) => {
    // inside this function are two functions to handle tables. The user can start and end a table with '&t', seperate cells with '|', and seperate rows with '&&' which is also used for line breaks
    const buildRow = (subStr, rowNum) => {
        let arr = subStr.split("|")
        arr.forEach((cell, index) => {
            if (cell.length > 0) {
                if (rowNum === 0) {
                    arr[index] = `<th>${cell}</th>`
                } else {
                    arr[index] = `<td>${cell}</td>`
                }
            }
        })
        let row = arr.join("")
        let result = ""
        if (rowNum % 2 != 0) {
            row = `<tr class="row-alt">${row}</tr>`
        } else {
            row = `<tr>${row}</tr>`
        }
        return row
    }
    const buildTable = (subStr) => {
        let arr = subStr.split("&& ")
        arr.forEach((row, index) => {
            arr[index] = buildRow(row, index)
        })

        return `<table>${arr.join("")}</table>`
    }
    // this prevents html injection
    str = str.replaceAll('<', '&lt;')

    if (desc) {
        // since && can be used for breaks and rows, we have to check for breaks after checking for tables
        // we add a space to all instances of && incase a user puts in something like '&&The ...'
        // without adding the space, the function would see this as a call to create a table
        str = str.replaceAll("&&", "&& ")
  
        str = str.replaceAll('&T', '&t')
        str = str.replaceAll('&B', '&b')
        str = str.replaceAll('&I', '&i')
        str = str.replaceAll('&L', '&l')
        str = str.replace(/&t\n/g, '&t')
        str = str.replace(/&t&& /g, '&t')
        str = str.replace(/\n/g, "&& ")

        let tableArr = str.split('&t')
        tableArr.forEach((table, index) => {
            if (index % 2 != 0) {
                tableArr[index] = buildTable(table)
            }
        })
        str = tableArr.join("")

        str = str.replaceAll("&& ", "<br />")
        
        let boldArr = str.split('&b')
        boldArr.forEach((subStr, index) => {
            if (index % 2 != 0) {
                boldArr[index] = `<b>${subStr}</b>`
            }
        })
        str = boldArr.join("")

        let itlArr = str.split('&i')
        itlArr.forEach((subStr, index) => {
            if (index % 2 != 0) {
                itlArr[index] = `<i>${subStr}</i>`
            }
        })
        str = itlArr.join("")

        let listArr = str.split('&l')
        listArr.forEach((subStr, index) => {
            if (index % 2 != 0) {
                listArr[index] = `<li>${subStr}</li>`
            }
        })
        str = listArr.join("")
    }
    return str
}

// let testString = "nothing &BBold text&B &iItalics&i &b&iItalics and bold&b&i&&break&&&Llist item 1&l&llist item 2&ltable&T|head 1|head2|head3|&&|row 1|row 1|row 1|&&|row 2|row 2|row 2|&t"



// console.log(intereptDesc(testString))

module.exports = intereptDesc
