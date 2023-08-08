// import { __dirname } from "../../../utils.js";
// import path from "path";
// import fs from 'fs';

// export class ProductManager {
//   constructor(fileName) {
//     this.path = path.join(__dirname, 'files', fileName);
//   }

//   fileExists() {
//     return fs.existsSync(this.path);
//   }
  
// async get() {
//   try {
//     if (this.fileExists()) {
//       const content = await fs.promises.readFile(this.path, "utf-8");
//       // console.log("Contenido del archivo:", content);
//       const products = JSON.parse(content);
//       return products;
//     } else {
//       throw new Error("No es posible obtener los productos");
//     }
//   } catch (error) {
//     throw error;
//   }
// }

//   // Consultar un producto por ID
//   getProductById(id) {
//     return this.products.find((product) => product.id === id);
//   }

//   // Actualizar un producto por ID
//   updateProduct(id, updatedFields) {
//     const productIndex = this.products.findIndex((product) => product.id === id);
//     if (productIndex !== -1) {
//       this.products[productIndex] = {
//         ...this.products[productIndex],
//         ...updatedFields,
//         id,
//       };
//       this.saveProducts();
//       return this.products[productIndex];
//     }
//     return null;
//   }

//   // Eliminar un producto por ID
//   deleteProduct(id) {
//     const productIndex = this.products.findIndex((product) => product.id === id);
//     if (productIndex !== -1) {
//       const deletedProduct = this.products[productIndex];
//       this.products.splice(productIndex, 1);
//       this.saveProducts();
//       return deletedProduct;
//     }
//     return null;
//   }
// }

// // module.exports = ProductManager;
