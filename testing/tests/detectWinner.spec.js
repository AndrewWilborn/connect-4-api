import { detectWinner } from "../src/detectWinner"
describe('detectWinner', () => {
    it('returns false when passed an empty board', () => {
        const result = detectWinner(["","","","","","",""])
        expect(result).toEqual(false)
    })
    it('returns true when passed a vertical row of 4', () => {
        const result = detectWinner(["YYYRY","","","","","","RRRR"])
        expect(result).toEqual(true)
    })
    it('returns true when passed horizontal row of 4', () => {
        const result = detectWinner(["Y","Y","Y","Y","","",""])
        expect(result).toEqual(true)
    })
    it('returns true when passed horizontal row of 4 in the upper corner', () => {
        const result = detectWinner(["","","","XXXXXY","XXXXXY","XXXXXY","XXXXXY"])
        expect(result).toEqual(true)
    })
})
