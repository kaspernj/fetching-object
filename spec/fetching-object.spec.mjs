import fetchingObject from "../index.mjs"

const kasper = fetchingObject({
  firstName: "Kasper"
})

const people = fetchingObject(["Kasper", "Christina"])

describe("fetchingObject", () => {
  it("throws an error when fetching a key that doesnt exist on an object", () => {
    expect(() => { kasper.middleName }).toThrow(new Error("Property not found: middleName"))
  })

  it("allows fetching a key that exists on an object", () => {
    expect(kasper.firstName).toEqual("Kasper")
  })

  fit("throws an error when fetching a key that doesnt exist on an array", () => {
    expect(() => { people[2] }).toThrow(new Error("Property not found: 2"))
  })

  fit("allows fetching a key that exists on an object", () => {
    expect(people[0]).toEqual("Kasper")
    expect(people[1]).toEqual("Christina")
  })
})
