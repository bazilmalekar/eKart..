const express = require("express");
const router = express.Router();
const products = require("../model/userShcema");

router.post("/insert", async(req, res) => {
    try{
        const {title, description, price, img} = req.body;
        const insert = new products({
            title, description, price, img
        });
        await insert.save();
        res.status(201).send("Product added successfully");
    }catch(err){
        console.log(err);
    }
});

router.get("/products", async(req, res) => {
    try{
        const allProducts = await products.find();
        res.status(200).send(allProducts);
    }catch(err){
        console.log(err);
    }    
});

router.get("/products/:id", async(req, res) => {
    try{
        const product = await products.findById({_id: req.params.id});
        res.status(200).send(product);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;