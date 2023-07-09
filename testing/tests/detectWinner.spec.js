import { detectWinner } from "../src/detectWinner"
describe('detectWinner', () => {
    it('returns false when passed an empty board', () => {
        const result = detectWinner(["","","","","","",""])
        expect(result).toEqual(false)
    })
    it('returns false when passed a board with lots of Ys and Rs but no wins', () => {
        const result = detectWinner(["RYRYRY", "YRYRYR", "YYYRRR", "R", "Y", "YRYRYR", ""])
        expect(result).toEqual(false)
    })
    it('returns true when passed a vertical row of 4', () => {
        const result = detectWinner(["YYYRY","","","","","","RRRR"])
        expect(result).toEqual(true)
    })
    it('returns true when passed horizontal row of 4', () => {
        const result = detectWinner(["R","R","R","R","","",""])
        expect(result).toEqual(true)
    })
    it('returns true when passed horizontal row of 4 in the upper corner', () => {
        const result = detectWinner(["","","","XXXXXY","XXXXXY","XXXXXY","XXXXXY"])
        expect(result).toEqual(true)
    })
    it('returns true when passed diagonal row of 4 with a positive slope', () => {
        const result = detectWinner(["","","","XXY","XXXY","XXXXY","XXXXXY"])
        expect(result).toEqual(true)
    })
    it('returns true when passed diagonal row of 4 with a negative slope', () => {
        const result = detectWinner(["","","","XXXXXY","XXXXY","XXXY","XXY"])
        expect(result).toEqual(true)
    })
})
