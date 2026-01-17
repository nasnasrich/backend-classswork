import { Product } from "../model/product.js";

//create product
export const createProduct = async(req,res) =>{

  try {
    const{
     name, 
     price, 
     description, 
     image, 
     category
    }=req.body

    const newProduct =await Product.create({
       name, 
     price, 
     description, 
     image, 
     category
    })
    res.status(201).json({
      success:true,
      message:"Product Created Successfully",
      product:newProduct
    })
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({
      success:false,
      message:"server error",error
    })
  }
}
//get all products

export const getAllProducts = async(req,res) =>{
  try{
    let Products = await Product.find();
    res.status(200).json({
      success:true,Products
    })
  }
  catch(error){
   console.error(error)
    res.status(500).json({
      success:false,
      message:"server error",error
    }) 
  }
}

//GET product BY ID
export const getProductById = async (req,res) =>{
const productId = req.params.id
try {
  const product = await Product.findById(productId)
  if(!product) return res.status(404).json({message:"product not found"})
    res.status(200).json({success:true,product})
} catch (error) {
  res.status(500).json({message:error.message})
  }
}

//Update products
export const updateProduct = async (req,res) =>{
let productId = req.params.id
const{name,price,description,image,category}=req.body
try {
  let product = await Product.findById(productId)
  if(!product) return res.status(404).json({message:"product not found"})
    //update only provided fields
  product.name = name|| product.name
  product.price = price|| product.price
  product.description = description|| product.description
  product.image = image|| product.image
  product.category = category|| product.category;
  await product.save();
  res.status(200).json({message:"product updated successfully",
    product:{
      id:product._id,
      name:product.name,
      price:product.price,
      description:product.description,
      image:product.image,
      category:product.category,
    
      }
  })
  
} catch (error) {
 res.status(500).json({message:error.message}) 
}

}

//delete product
export const deleteProduct
 = async (req,res) =>{
  const productId = req.params.id
  try {
    const product = await Product.findById(productId)
    if(!product) return res.status(404).json({message:"product does not exist"})
      await product.deleteOne()
    res.status(200).json({message:"product deleted successfully"})
    } catch (error) {
    res.status(500).json({message:error.message})
  }
}