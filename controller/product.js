import {Product} from "../model/product.js"

// create Prodct
export const createProduct = async (req, res) =>{
try {
    const {name, price, description, image, category}= req.body
 const newProduct = await Product.create ({
  name, price, description, image, category
 })
 res.status(201).json({
    success: true,
    message:"Prodcuct Created Successfully",
 Product:newProduct
 })

} catch (error) {
    console.error(error)
    res.status(500).json({success:false,
    message: "Server Error", error})
}
}



// get all products

export const getAllProducts = async (req, res) => {
    try {
        let product = await Product.find()
        res.status(200).json ({success:true,product})
    } catch (error) {
       res.status(500).json({success:false, message: "server Error",error}) 
    }
}


// get product id

export const getProductById = async (req, res) =>{
 try { 
   const productId = req.params.id
const product = await Product.findById(productId)
 if (!product) return res.status (400).json
 ({message: "Product Not Found"})
  res.status(200).json({message:"product retrieved successfully",product})
} catch (error){
  res.status(500).json({message:error.message})
}
}


// update user

      export const updateProduct = async ( req, res)=> {
         let productId = req.params.id
         const {name, price, description, Image, stock, category
            } = req.body
         try {
            let product = await cohortFour.findById(productId)
            if(!product) return res.status(404).json({message: "Product Not Found"})
                //upate only provided fields
            product.name = name || product.name
            product.price = price || product.price
            product.description = description || product.description
            product.Image = Image || product.Image
            product.stock = stock || product.stock
            product.category = category || product.category
            await product.save()
            res.status (200).json({

                message: "Product Successfully Updated",
                user:{
                    id:product._id,
                    name:product.name,
                    price:product.price,
                    description:product.description,
                    Image:product.Image,
                    stock:product.stock,
                    category:product.category
                }
            })

         } catch (error) {
            res.status(500).json({message:error.message})
         }
      }



       //delete

      export const deleteProduct = async (req, res) =>{
        const productId = req.params.id
        try {
            const product = await cohortFour.findById(productId)
            if (!product) return res.status (404).json({message: "product doesnt exist"})
            await product.deleteOne()
        res.status(200).json({message: "product deleted successfully"})

        } catch (error) {
            res.status(500).json({message:error.message})
        }
      }

