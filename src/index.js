class PropertyNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "PropertyNotFoundError"
  }
}

const fetchingObjectHandler = {
  get(receiver, prop) {
    if (typeof receiver == "function") receiver = receiver()
    if (prop == "prototype") return receiver.prototype // Prevent crashing from being scanned by things like Expo
    if (!(prop in receiver)) throw new PropertyNotFoundError(`Property not found: ${prop}`)

    return Reflect.get(receiver, prop)
  },

  set(receiver, prop, newValue) {
    if (typeof receiver == "function") receiver = receiver()
    if (!(prop in receiver)) throw new PropertyNotFoundError(`Property not found: ${prop}`)

    return Reflect.set(receiver, prop, newValue)
  }
}

const fetchingObject = (wrappedObject = {}) => new Proxy(wrappedObject, fetchingObjectHandler)

export default fetchingObject
