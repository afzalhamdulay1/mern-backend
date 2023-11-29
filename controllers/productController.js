let productsModel = require("../models/productModel")

const getProducts = async (req, resp)=>{
    try {
        let page;
        let limit;
        let skip;
        if(req.query.page && req.query.limit){
            page = Number(req.query.page);
            limit = Number(req.query.limit);
        } else {
            page = 1;
            limit = 2;
        }

        skip = (page - 1) * limit;

        const products  = await productsModel.find({},{_id:0,__v:0}).skip(skip).limit(limit);
        resp.status(200).send(products);
        console.log("Products: "+products)
    } catch(error) {
        console.log(error)
        resp.status(500).send(error)
    }
    
}

const saveProduct = async (req, resp)=>{
    try {
        const body = req.body;
        console.log(body)
        await productsModel.create(req.body)
        resp.status(200).send("Product saved")
        console.log("Product saved: "+body)
    } catch (error) {
        console.log(error)
        resp.status(500).send(error)
    }
}

const updateProduct = async (req, resp)=>{
    try{
        const id  = req.params.id;
        const productDetails = await productsModel.findOne({proId:id})
        if(productDetails){
            await productsModel.updateOne({proId:id},{$set:req.body})
            resp.status(200).send("Product updated for id:"+id);
        } else {
            resp.status(404).send("Product not found for id:"+id);
        }
    }
    catch(error) {
        console.log(error)
        resp.status(500).send(error)
    }
}

const deleteProduct = async (req, resp)=>{
    try{
        const id  = req.params.id;
        const productDetails = await productsModel.findOne({proId:id})
        if(productDetails){
            await productsModel.deleteOne({proId:id})
            resp.status(200).send("Product deleted for id:"+id);
        } else {
            resp.status(404).send("Product not found for id:"+id);
        }
    }
    catch(error) {
        console.log(error)
        resp.status(500).send(error)
    }
}


module.exports = {getProducts,saveProduct,updateProduct,deleteProduct}