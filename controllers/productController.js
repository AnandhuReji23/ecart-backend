

//import product collection
const products = require('../models/productSchema')

//Define logic to resolve client request 

//get all products
exports.getAllProducts = async (req, res) => {        //asynchronous function
    try {
        //get all products from product collection in mongodb
        const allProducts = await products.find()           //await - reduces delay in api fetching
        res.status(200).json(allProducts)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get product by id

exports.viewProduct = async (req, res) => {        //asynchronous function
    const id = req.params.id
    try {
        //check id is in mongodb
        const product = await products.findOne({ id })
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json("product note found")

        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}