import express from "express";
import {config} from "./config/config.js"
import { productsRouter } from "../routes/products.routes.js";
import { routerFS } from "../routes/product-fs.routes.js";
import { connectBD } from "./config/dbConnection.js";
import { __dirname } from "./utils.js";
import path from "path";
import handlebars, { engine } from "express-handlebars";
import { ProductMongo } from "./dao/managers/mongo/productsMongo.js";
import { pagesRouter } from "../routes/pages.routes.js";
import { Server } from "socket.io";

import Message from '../src/dao/managers/models/chat.models.js'; // Ajusta la ruta según la ubicación de tu modelo



const port = config.server.port;
const app = express();

//mildwares
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

//servidor de express (guardar el servidor en una variable para conectarlo al de socket)
const httpServer = app.listen(port,()=>console.log(`Server ${port}`));

//crear el servidor de websocket (lado del servidor)
const io = new Server(httpServer);

//conexion a la base de datos
connectBD();

//configuracion de handlebars
app.engine('.hbs', engine({extname: ".hbs",
runtimeOptions: {allowProtoProperties: true, // Permitir acceso a propiedades no propias
}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use("/products",productsRouter);
app.use("/fileSystem",routerFS);
app.use("/",pagesRouter);
app.use("/",pagesRouter);
app.use("/",pagesRouter);
app.use("/",pagesRouter);

const productService = new ProductMongo();

// Definir las rutas
app.get("/home", async (req, res) => {
  // console.log("RUTA: ", productsFilePath);
  try {
  //traer la hoja de estilos
  const products = await productService.get();
  // Renderizar la vista "home.hbs" con los productos como datos
  res.render("home", {products: products});}
catch (error) {
res.render("error");
}});

let messages = [];

io.on("connection",(socket)=>{
  console.log("nuevo cliente conectado");
  
  //capturamos el ingreso de un nuevo usuario
  socket.on("autenticated",(msg)=>{
      socket.emit("messageHistory", messages);
      //enviamos la informacion de que un nuevo usuario se conecto al resto, excepto al que se conecta
      socket.broadcast.emit("newUser",msg);
  });

  socket.on("message",(data)=>{
      console.log("data", data);
      messages.push(data);

      // Insertar el mensaje en la base de datos
      const newMessage = new Message({
        user: data.user, 
        email: data.email, 
        message: data.message,
        timestamp: new Date().toLocaleString()
      });

      newMessage.save()
        .then(() => {
          console.log('Mensaje guardado en la base de datos');
        })
        .catch(error => {
          console.error('Error al guardar el mensaje en la base de datos:', error);
        });

      //cada vez que recibimos mje, debemos enviarlos a todos los clientes conectados
      io.emit("messageHistory", messages);
  });
});