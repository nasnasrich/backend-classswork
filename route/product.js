import express from "express";
import { createProduct, deleteProduct, getAllProducts,getProductById, updateProduct} from "../controller/product.js";


const ProductRouter = express.Router()
ProductRouter.post("/", createProduct)
ProductRouter.get("/", getAllProducts)
ProductRouter.get("/:id", getProductById)
ProductRouter.put('/:id', updateProduct)
ProductRouter.delete('/id', deleteProduct)

export default ProductRouter