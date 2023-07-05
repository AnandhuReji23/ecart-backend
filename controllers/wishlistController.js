//import wishlists
const wishlists = require('../models/wishlistSchema')

//logic for wishlists
exports.addToWishlist = async (req, res) => {

    //get product details from request
    // req.body={
    //     id:'3',
    //     title:'hd',
    //     price:500,
    //     image:""
    // }

    //destructure req.body

    const { id, title, price, image } = req.body

    //logic
    try {
        const item = await wishlists.findOne({ id })
        if (item) {
            res.status(404).json("Product already exists")
        }
        else {
            //add item to wishlist collection
            const newItem = new wishlists({ id, title, price, image })

            //to store in wishlist collection
            await newItem.save()

            //response send back to the client
            res.status(200).json("Product added to the wishlist")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}
//logic for view wishlist product

exports.getWishlist = async (req, res) => {

    //logic
    try {
        const allWishlist = await wishlists.find()
        res.status(200).json(allWishlist)
    }
    catch (error) {
        res.status(404).json(error)
    }

   

} 
//logic for delete wishlist product

exports.deleteWishlist = async (req, res) => {

    const{id}=req.params

    //logic
    try {
        const removeWishlist = await wishlists.deleteOne({ id })

        if (removeWishlist) {
            const allItems=await wishlists.find() 
            res.status(200).json(allItems)
        }
     
    }
    catch (error) {
        res.status(404).json(error)
    }
}