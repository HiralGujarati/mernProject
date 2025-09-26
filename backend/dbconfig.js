import { MongoClient } from "mongodb";

const url = "dburl";
const dbName = "todo-app";
export const collectionName = "todos";
const client = new MongoClient(url);


export const connection = async () => {
  const connect = await client.connect()
  return connect.db(dbName)
}