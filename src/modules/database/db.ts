import { MongoClient } from 'mongodb'

export const connectToDb = async () => {
    try {
        const client = new MongoClient("mongodb://localhost:27017/e4e");
    
      await client.connect()
      const db = client.db('e4e')
      return db

    } catch (error) {
        console.log(error, 'database error')
        return new Error("database error");
    }
}

