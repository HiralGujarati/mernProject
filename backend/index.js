import express from "express";
import cors from 'cors'
import { collectionName, connection } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());



app.post("/login", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users")
    const result = await collection.findOne({ email: userData.email, password: userData.password });
    if (result) {
      jwt.sign(userData, 'Google', { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          msg: "Login done",
          token
        })
      })
    } else {
      res.send({
        success: false,
        msg: "Login not done",

      })
    }

  }


})
app.post("/signup", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users")
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, 'Google', { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          msg: "Signup done",
          token
        })
      })
    } else {
      res.send({
        success: false,
        msg: "Signup not done",

      })
    }

  }


})



app.post("/add-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  if (result) {
    res.send({
      message: "new task added",
      success: true, result
    });
  } else {
    res.send({
      message: "task not added",
      success: false
    });
  }
  res.send("working...")
})

app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();

  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();

  if (result) {
    res.send({ message: "Task data fetched", success: true, result })

  } else {
    res.send({ message: "Error in Task data fetching", success: false, })
  }
});


app.get("/task/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task updated", success: true, result })
  } else {
    res.send({ message: "Error in task updating!!", success: false })
  }


})

app.put("/update-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  console.log(fields);
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    res.send({ message: "Data is updated...", success: true, result })

  } else {
    res.send({ message: "error in data update!!", success: false })
  }


})

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {

  const db = await connection();
  const id = req.params.id;
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  if (result) {
    res.send({ message: "Task deleted", success: result })
  } else {
    res.send({ message: "error in data deleted!!", success: false, })
  }

})
app.delete("/delete-multiple", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const IDS = req.body

  const deleteTask = IDS.map((item) => new ObjectId(item))
  console.log(IDS);
  const collection = db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTask } })
  if (result) {
    res.send({ message: "multi task deleted..", success: true, result });
  } else {
    res.send({ message: "error in delete multi task", success: false });
  }
})

function verifyJWTToken(req, res, next) {
  const token = req.cookies['token'];
  jwt.verify(token, 'Google', (error, decode) => {
    if (error) {
      return res.send({
        msg: "Invalid Token",
        success: false
      })
    }
    next();
    console.log(decode);
  })


}


app.listen(3200);