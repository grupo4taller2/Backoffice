import { checkValidUsername } from "../src/functions/checks"

test('empty username is not valid', () => {
    expect(checkValidUsername('')).toBe(false)
})

test('normal name is a valid username', () => {
    expect(checkValidUsername("normalName")).toBe(true);
})

test("Username with numbers is valid", () => {
    expect(checkValidUsername("normalName123")).toBe(true);
})

test("username with spaces is invalid", () => {
    expect(checkValidUsername("Juan Carlos")).toBe(false);
})