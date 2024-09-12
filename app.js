// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const path = require ('path');

// const app = express();
// app.use(express.json());

// dotenv.config();

// app.use(express.static(path.join(__dirname, 'public')));

// // Route to serve the main HTML page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login_page.html'));
// });


// mongoose.connect(process.env.MONGO_URL,{}).then(()=>{
//     console.log("MongoDB connected");
// }).catch(err => console.log(err));



// const professorRoutes = require("./routes/Proffessor");
// app.use("/api/prof", professorRoutes);

// const studentRoutes = require("./routes/Student");
// app.use("/api/stu",studentRoutes);

// const postProfRoutes = require("./routes/PostProf");
// app.use("/api/postProf",postProfRoutes);

// const postStuRoutes = require("./routes/PostStu");
// app.use("/api/postStu",postStuRoutes);
// const port = process.env.PORT || 3005;
// app.listen(port, () => console.log(`Server Running on port ${port}`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
app.use(express.json());
dotenv.config();

// Serve static files from the "public" directory

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

const cors = require('cors');
// app.use(cors());
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'] // หรือ URL ของ Live Server
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Import routes
const professorRoutes = require("./routes/Proffessor");
const studentRoutes = require("./routes/Student");
const postProfRoutes = require("./routes/PostProf");
const postStuRoutes = require("./routes/PostStu");

// Use routes
app.use("/api/prof", professorRoutes);
app.use("/api/stu", studentRoutes);
app.use("/api/postProf", postProfRoutes);
app.use("/api/postStu", postStuRoutes);

// //add Get Collection PostStu
// app.get('/api/postStu', async (req, res) => {
//     try {
//         const posts = await Post.aggregate([
//             {
//                 $lookup: {
//                     from: "Student",  // ชื่อของคอลเลกชันผู้ใช้
//                     localField: "_id",  // ฟิลด์ `_id` ในคอลเลกชัน `postStu`
//                     foreignField: "_id",  // ฟิลด์ `_id` ในคอลเลกชันผู้ใช้
//                     as: "user_info"  // ชื่อฟิลด์ใหม่สำหรับรวมข้อมูลผู้ใช้
//                 }
//             },
//             {
//                 $unwind: "$user_info"  // แยกข้อมูลผู้ใช้ให้เป็นแถวเดียวกัน
//             },
//             {
//                 $project: {  // เลือกเฉพาะฟิลด์ที่ต้องการส่งออก
//                     _id: 1,
//                     St_skill: 1,
//                     St_ability: 1,
//                     St_work_time: 1,
//                     "user_info.Name": 1,
//                     "user_info.Email": 1
//                 }
//             }
//         ]);
//         res.json(posts);
//     } catch (error) {
//         res.status(500).send('Error fetching posts');
//     }
// });



// Start server

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Server running on port ${port}`));
