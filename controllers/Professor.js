//professor not search

const Prof = require('../models/Professor');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register (POST)
exports.registerProf = async (req,res) => {
    const {
        Name,
        //Last_Name,
        Email,
        Username,
        Phone,
        Password,
        //Institude,
        Faculty,
        //Profile,
    } = req.body;
    try {
        const hashPass = await bcrypt.hash(Password,10);
        const prof = new Prof ({
            Name,
            Email,
            Username,
            Phone,
            Password : hashPass,
            //Institude,
            Faculty,
            //Profile,
        })
        await prof.save();
        res.status(201).send("User registered");
        console.log({ prof })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//login (POST)
exports.loginProf = async (req,res) => {
    const {Username , Password} = req.body;
    try {
        const prof = await Prof.findOne({Username});
        if (!Username) return res.status(400).send("User not found");
        const isMatch = await bcrypt.compare(Password, prof.Password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const profs = await Prof.findOne({Username}).select("-password");

        const accessToken = jwt.sign(
            {profId: prof._id},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : "3h"}
        );

        const refreshToken = jwt.sign(
            {profId: prof._id},
            process.env.REFRESH_TOKEN_SECRET
        );
        res.json({ profs, accessToken, refreshToken });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//showProf profile (GETALL -password)
exports.showprofileProf = async (req,res) => {
    try {
        const prof = await Prof.find().select('-Password');
        res.status(200).json(prof);
    } catch (error) {
        res.status(500).send(error.message);
    }
}