const Stu = require('../models/Student');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register Student (POST)
exports.registerstd = async (req,res) => {
    const {
        Name,
        //Last_Name,
        Email,
        Username,
        Phone,
        Password,
        Faculty,
        Program,
        //Profile,
        Sex,
        Year_of_study    
    } = req.body;
    try {
        const hashPass = await bcrypt.hash(Password,10);
        const stu = new Stu ({
            Name,
            //Last_Name,
            Email,
            Username,
            Phone,
            Password : hashPass,
            Faculty,
            Program,
            //Profile,
            Sex,
            Year_of_study
        })
        await stu.save();
        res.status(201).send("User registered");
        console.log({ stu })
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//login Student (POST)
exports.loginstu = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const stu = await Stu.findOne({ Username });

        if (!stu) return res.status(400).send("User not found");

        const isMatch = await bcrypt.compare(Password, stu.Password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const stud = await Stu.findOne({ Username }).select("-Password");

        const accessTokenSTU = jwt.sign(
            { stuId: stu._id },
            process.env.ACCESS_TOKEN_SECRET_STU,
            { expiresIn: "3h" }
        );

        const refreshTokenSTU = jwt.sign(
            { stuId: stu._id },
            process.env.REFRESH_TOKEN_SECRET_STU
        );

        res.json({ stud, accessTokenSTU, refreshTokenSTU });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Show Profile Student (GET)
exports.showprofilestu = async (req,res) => {
    try {
        const stu = await Stu.find().select('-Password');
        res.status(200).json(stu);
    } catch (error) {
        res.status(500).send(error.message);
    }
}