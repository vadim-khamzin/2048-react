let score = 0

const mergeRowValues = (row, moveType) => {
    const filteredRow = row.filter(item => item !== null)
    const resultRow = []

    if (moveType) {
        let i = filteredRow.length - 1
        while (i >= 0) {
            if (filteredRow[i] === filteredRow[i - 1]) {
                const sum = filteredRow[i] + filteredRow[i - 1]
                resultRow.unshift(sum)
                score += sum
                i -= 2
            } else {
                resultRow.unshift(filteredRow[i])
                i--
            }
        }
    } else {
        let i = 0
        while (i < filteredRow.length) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                const sum = filteredRow[i] + filteredRow[i + 1]
                resultRow.push(sum)
                score += sum
                i += 2
            } else {
                resultRow.push(filteredRow[i])
                i++
            }
        }
    }

    return resultRow
}

const fillRow = (_row, moveType) => {
    const row = [].concat(_row)
    if (row.length < 4) {
        const nullCount = 4 - row.length
        const nullRow = Array(nullCount).fill(null)
        return moveType
            ? nullRow.concat(row)
            : row.concat(nullRow)
    }

    return row
}

const mainAxisMove = (matrix, moveType) => matrix.map(row => {
    const mergedRow = mergeRowValues(row, moveType)

    return fillRow(mergedRow, moveType)
})

const crossAxisMove = (matrix, moveType) => {
    const turnMatrix = (matrix) => matrix.reduce((newMatrix, row) => {
        const newRow = [].concat(row)
        return newMatrix.map(item => item.concat(newRow.pop()))
    }, Array(4).fill([]))

    const turnedMatrix = turnMatrix(matrix)
    const matrixAfterMove = mainAxisMove(turnedMatrix, moveType)

    const turnBackMatrix = (matrix) => matrix.reduce((newMatrix, row) => {
        const newRow = [].concat(row)
        return newMatrix.map(item => {
            const newItem = [].concat(item)
            newItem.unshift(newRow.shift())
            return newItem
        })
    }, Array(4).fill([]))

    return turnBackMatrix(matrixAfterMove)
}

const randomIntegerInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const shouldRandomValueAdd = (prevMatrix, nextMatrix) =>
    prevMatrix.toString() !== nextMatrix.toString()

export const addRandomValue = (matrix, count = 1) => {
    function add(matrix, count) {
        const matrixToList = (matrix) => matrix.reduce((list, el) => {
            return list.concat(el)
        }, [])

        const convertArrayToObject = (arr) =>
            Object.assign({}, arr)

        const matrixObj = convertArrayToObject(matrixToList(matrix))

        const nullCells = Object.entries(matrixObj)
            .filter(([key, value]) => value === null)

        const random = randomIntegerInRange(0, nullCells.length - 1)
        matrixObj[nullCells[random][0]] = 2

        const objToMatrix = (obj) =>
            Object.values(obj).reduce((matrix, el, index, array) => {
                matrix.push(array.splice(0, 4))
                return matrix
            }, [])

        const resultMatrix = objToMatrix(matrixObj)

        if (count > 1) {
            return add(resultMatrix, count - 1)
        } else {
            return resultMatrix
        }
    }
    return add(matrix, count)
}

const getNewMatrix = (matrix, keyCode, addRandomFlag) => {
    const directions = {
        mainAxis: [37, 39],
        crossAxis: [38, 40]
    }

    const newMatrix = (directions.mainAxis.includes(keyCode))
        ? mainAxisMove(matrix, directions.mainAxis.indexOf(keyCode))
        : (directions.crossAxis.includes(keyCode))
            ? crossAxisMove(matrix, directions.crossAxis.indexOf(keyCode))
            : matrix

    return (addRandomFlag && shouldRandomValueAdd(matrix, newMatrix))
        ? addRandomValue(newMatrix)
        : newMatrix
}

export const moveValues = (matrix, keyCode, addRandomFlag = true) => ({
    newMatrix: getNewMatrix(matrix, keyCode, addRandomFlag),
    score
})
