const mongoose = require("mongoose");


const PostStuSchema = new mongoose.Schema({
    St_skill: { type: String },
    St_ability: { type: String },
    St_work_time: { type: String }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("PostStu", PostStuSchema);
