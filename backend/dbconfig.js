import { MongoClient } from "mongodb";

const url = "mongodb+srv://hiralgujarati6539_db_user:hiral2408@cluster0.qtybz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "todo-app";
export const collectionName = "todos";
const client = new MongoClient(url);


export const connection = async () => {
  const connect = await client.connect()
  return connect.db(dbName)
}