// Use Mongoose for the main app connection, but also expose a
// `clientPromise` that resolves to the underlying native MongoClient
// so code that expects a MongoClient (e.g. `@next-auth/mongodb-adapter`)
// keeps working.
import mongoose from 'mongoose'
import dbConnect from './db'

const clientPromise = (async () => {
  await dbConnect()
  return mongoose.connection.getClient()
})()

export default clientPromise
