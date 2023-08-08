import { Router } from "express";
import { ProductMongo } from "../src/dao/managers/mongo/productsMongo.js";
import { uploader } from "../src/utils.js";

const productService = new ProductMongo();

const homeRouter = Router();


homeRouter.get("/",async(req,res)=>{
    try{
        const products = await productService.get();
        res.json({status:"success",data:products})
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al obtener los usuarios"});
    }
});

homeRouter.post("/",uploader.single("fileImage"), (req,res)=>{
    try{
        console.log("files", req.file);
        const productsCreated = productService.create(req.body); 
        res.json({status:"success",data:productsCreated});
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al crear producto"});
    }
});

homeRouter.delete("/:sid",async(req,res)=>{
    try{
        const productsId = req.params.sid;
        await productService.delete({_id:productsId}); 
        res.json({status:"success",message:"producto eliminado"});
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al eliminar el producto"});
    }
});

// Ruta para eliminar todos los productos
homeRouter.delete("/", async (req, res) => {
    try {
      const deletedProducts = await productService.deleteAll();
      res.json({
        status: "success",
        message: `Se han eliminado ${deletedProducts.deletedCount} productos`,
      });
    } catch (error) {
      console.log(error.message);
      res.json({ status: "error", message: "Hubo un error al eliminar los productos" });
    }
  });

export {homeRouter as productsRouter}