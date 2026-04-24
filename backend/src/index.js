import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import Note from "./models/note.model.js";
import noteRoutes from "./routes/note.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/notes", noteRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running!");
});


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });












// //CREATE NOTE
// app.post("/api/notes", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     if (!title || !content) {
//       return res.status(400).json({
//         message: "Title and content are required",
//       });
//     }

//     const note = await Note.create({
//       title,
//       content,
//     });

//     res.status(201).json(note);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// //READ
// app.get("/api/notes", async (req, res) => {
//   try{
//     const notes = await Note.find();
//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: error.message});
//   }
// });

// //update
// app.put("/api/notes/:id", async (req, res) => {
//     try{
//         const { title, content } = req.body;
//           if (!title && !content) {
//             return res.status(400).json({ message: "Nothing to update" });
//           }
//         const updatedData = {};
//         if (title) updatedData.title = title;
//         if (content) updatedData.content = content;

//         const note = await Note.findByIdAndUpdate(
//             req.params.id,
//             updatedData,
//             { new: true}
//         );
//         if (!note){
//           return res.status(404).json({message: "Note not found"})
//         }
//          res.status(200).json(note);
//     } catch(error){
//         res.status(500).json({ message: error.message })
//     }
// });
// //DELETE
// app.delete("/api/notes/:id", async (req, res)=>{
//   try{
//     const note = await Note.findByIdAndDelete(req.params.id);

//     if(!note){
//       return res.status(404).json({ message: "Note not found"});
//     }
//     res.status(200).json({message: "Note deleted successfully"});

//   }catch(error){
//     res.status(500).json({message: error.message})
//   }
// })

