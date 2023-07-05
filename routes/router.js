

//Inside router.js file, import express
const express = require('express')

//import product controller
const productController = require('../controllers/productController')

//import wishlist controller

const wishlistController=require('../controllers/wishlistController')

//import cart controller

const cartController=require('../controllers/cartController')

//Using express, create an object for router class in order to setup path
const router = new express.Router()

//Resolve client request in various server routes
//all aAPI call will be resolved

//get all products
router.get('/products/all-products', productController.getAllProducts)

//get particular product

router.get('/products/viewProduct/:id', productController.viewProduct)

//add to wish list
router.post('/products/addToWishlist',wishlistController.addToWishlist)

//get wishlist product details
router.get('/products/getWishlist',wishlistController.getWishlist) //same in controller fn call getWishlist

//delete wishlist product

router.delete('/products/deleteWishlist/:id',wishlistController.deleteWishlist) //same in controller fn call deleteWishlist

//add to cart

router.post('/products/addToCart',cartController.addToCart)

//get cart product details

router.get('/products/getCart',cartController.getCart) //same in controller fn call getCart

//delete cart product

router.delete('/products/deleteCart/:id',cartController.deleteCart) //same in controller fn call deleteCart


//cart increment

router.get('/products/incrementCart/:id',cartController.incrementCart)

//cart decrement

router.get('/products/decrementCart/:id',cartController.decrementCart)



//export router
module.exports = router