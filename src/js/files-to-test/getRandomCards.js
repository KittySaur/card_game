function getRandomCards(data, toSliceNumber) {
    data.sort(() => Math.random() - 0.5)

    const newArray = data.slice(1, toSliceNumber.valueOf() + 1)
    const duplicateArray = [...newArray]
    const finalCardFieldArray = newArray.concat(duplicateArray)

    finalCardFieldArray.sort(() => Math.random() - 0.5)

    return finalCardFieldArray
}

module.exports = { getRandomCards }
