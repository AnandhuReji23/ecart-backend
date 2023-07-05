//import cart collection

const carts=require('../models/cartSchema');

//add to cart
exports.addToCart=async(req,res)=>{

    //get product details from the request

    const{id,title,price,image,quantity}=req.body


    //logic

    try {
        //check product  is already in cart collection
        const product=await carts.findOne({id})

        if (product) {
            //update product quantity
            product.quantity+=1

            //update product grand total

            product.grandTotal = product.price*product.quantity
            //to update in mongodb

            product.save()
            //to sent response to clint

            res.status(200).json("product added successfully")
            
        }else{

            //product is not in the cart
            const newProduct=new carts({
                id,
                title,
                price,
                image,
                quantity,
                grandTotal:price
            })

            //to save in mongodb
            await newProduct.save();
            //to sent response to clint
            res.status(200).json("product added successfully");


        }
        
    } catch (error) {
        req.status(401).json(error);
        
    }

}

//get cart

exports.getCart=async(req,res)=>{

    //get all product details from the cart

    //logic

    try {
        //check product  is already in cart collection
        const allCart=await carts.find()

            res.status(200).json(allCart)
        
    } catch (error) {
        req.status(401).json(error);
        
    }

}

// delete cart product

exports.deleteCart=async(req,res)=>{
    //get product details from the request
const{id}=req.params;

    //logic
    try {
        //check product  is already in cart collection
        const removeCart=await carts.deleteOne({id})

        //to sent response to clint
        if (removeCart) {
            const allItems=await carts.find() 
            res.status(200).json(allItems)
        }
        
    }catch (error) {
        req.status(404).json(error);
        
    }
}


//cart increment

exports.incrementCart=async(req,res)=>{
    //get product details from the request
const{id}=req.params; //de structuring

    //logic
    try {
        //check product  is already in cart collection
        const product=await carts.findOne({id})

        //to sent response to clint
        if (product) {
            product.quantity+=1
            product.grandTotal=product.price*product.quantity

            //save in mongodb
           await product.save()
           // increment the quantity get all  cart collection item and updating in particular
           
            const allCarts=await carts.find() 
            res.status(200).json(allCarts)
   
            
        }
        
    }catch (error) {
        req.status(404).json(error);
        
    }
}

//decrement cart

exports.decrementCart=async(req,res)=>{
    //get product details from the request
const{id}=req.params; //de structuring

    //logic
    try {
        //check product  is already in cart collection
        const product=await carts.findOne({id})
        if (product.quantity<=1) {
            const removeCart=await carts.deleteOne({id})
            //to sent response to clint
                const allItems=await carts.find() 
                res.status(200).json(allItems)
            
        }else{

        //to sent response to clint
        if (product) {
            product.quantity-=1
            product.grandTotal=product.price*product.quantity

            //save in mongodb
           await product.save()
           // increment the quantity get all  cart collection item and updating in particular
           
            const allCarts=await carts.find() 
            res.status(200).json(allCarts)
   
            
        }
    }
        
    }catch (error) {
        req.status(404).json(error);
        
    }
}