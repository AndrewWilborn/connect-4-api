import { detectWinner } from "../src/detectWinner"
describe('detectWinner', () => {
    it('returns false when passed an empty board', () => {
        const result = detectWinner(["","","","","","",""])
        expect(result).toEqual(false)
    })
    it('returns true when passed a vertical row of 4', () => {
        const result = detectWinner(["0RYYYY","1","2","3","4","5","6"])
        expect(result).toEqual(false)
    })
})
