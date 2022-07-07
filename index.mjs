class PropertyNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "PropertyNotFoundError"
  }
}

const fetchingObjectHandler = {
  get(_target, prop, receiver) {
    if (!(prop in receiver)) throw new PropertyNotFoundError(`Property not found: ${prop}`)

    return Reflect.get(...arguments)
  },

  set(receiver, prop, newValue) {
    if (!(prop in receiver)) throw new PropertyNotFoundError(`Property not found: ${prop}`)

    receiver[prop] = newValue

    return true
  }
}

const fetchingObject = (wrappedObject = {}) => new Proxy(wrappedObject, fetchingObjectHandler)

export default fetchingObject
