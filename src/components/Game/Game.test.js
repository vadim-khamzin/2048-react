import { moveValues } from './gameLogic'

describe('Test move logic [CASE #1]', () => {
    const matrix = [
        [2, 2, 2, null],
        [2, 2, 2, null],
        [2, 2, 2, null],
        [2, 2, 2, null]
    ]
    it('Move LEFT', () => {
        const res = moveValues(matrix, 37, false)
        const expectedMatrix = [
            [4, 2, null, null],
            [4, 2, null, null],
            [4, 2, null, null],
            [4, 2, null, null]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move RIGHT', () => {
        const res = moveValues(matrix, 39, false)
        const expectedMatrix = [
            [null, null, 2, 4],
            [null, null, 2, 4],
            [null, null, 2, 4],
            [null, null, 2, 4]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move UP', () => {
        const res = moveValues(matrix, 38, false)
        const expectedMatrix = [
            [4, 4, 4, null],
            [4, 4, 4, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move DOWN', () => {
        const res = moveValues(matrix, 40, false)
        const expectedMatrix = [
            [null, null, null, null],
            [null, null, null, null],
            [4, 4, 4, null],
            [4, 4, 4, null]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
})
describe('Test move logic [CASE #2]', () => {
    const matrix = [
        [4, 2, 4, 4],
        [2, 2, 4, 2],
        [null, null, 4, 2],
        [null, 2, 2, 4]
    ]
    it('Move LEFT', () => {
        const res = moveValues(matrix, 37, false)
        const expectedMatrix = [
            [4, 2, 8, null],
            [4, 4, 2, null],
            [4, 2, null, null],
            [4, 4, null, null]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move RIGHT', () => {
        const res = moveValues(matrix, 39, false)
        const expectedMatrix = [
            [null, 4, 2, 8],
            [null, 4, 4, 2],
            [null, null, 4, 2],
            [null, null, 4, 4]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move UP', () => {
        const res = moveValues(matrix, 38, false)
        const expectedMatrix = [
            [4, 4, 8, 4],
            [2, 2, 4, 4],
            [null, null, 2, 4],
            [null, null, null, null]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
    it('Move DOWN', () => {
        const res = moveValues(matrix, 40, false)
        const expectedMatrix = [
            [null, null, null, null],
            [null, null, 4, 4],
            [4, 2, 8, 4],
            [2, 4, 2, 4]
        ]
        expect(res.newMatrix).toEqual(expectedMatrix)
    })
})