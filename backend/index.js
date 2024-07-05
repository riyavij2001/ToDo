const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    todoDB: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("ToDo", UserSchema);
User.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.post("/createToDO", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      // delete result.password;
      res.send(req.body);
      console.log("Saved result:", result);
    } else {
      console.log("User data already submitted");
    }
  } catch (e) {
    console.error("Error saving data:", e);
    res.send("Something Went Wrong");
  }
});

app.delete("/deleteToDO/:id", async (req, res) => {
    const id = req.params.id;
    
    // Log the id received
    console.log("Deleting todo with id:", id);
  
    try {
      const result = await User.findOneAndDelete({'id': id});
      if (result) {
        res.status(200).send({ message: "Todo deleted successfully" });
        console.log("Deleted todo:", result);
      } else {
        res.status(404).send({ error: "Todo not found" });
        console.log("Todo not found");
      }
    } catch (e) {
      console.error("Error deleting todo:", e);
      res.status(500).send("Something Went Wrong");
    }
  });


  app.post("/editToDO", async (req, res) => {
    const id = req.body.id;
    const text = req.body.todoDB;

    try {
        const result = await User.findOneAndUpdate({'id': id}, {
            $set: {
              todoDB: text,
            },
          },);
        if (result) {
          res.status(200).send({ message: "Todo Updated successfully" });
          console.log("Updated todo:", result);
        } else {
          res.status(404).send({ error: "Todo not updated" });
          console.log("Todo not updated");
        }
      } catch (e) {
        console.error("Error updating todo:", e);
        res.status(500).send("Something Went Wrong");
      }
  });
  

// app.get("/getAllToDo", async (req, res) => {
//     try {
//         const todos = await User.find({});
//         res.send(todos);
//     } catch (e) {
//         console.error('Error fetching data:', e);
//         res.status(500).send("Something Went Wrong");
//     }
// });

module.exports = {
  User,
};

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
