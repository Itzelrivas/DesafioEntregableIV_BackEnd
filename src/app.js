import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../utils.js'; 
import { Server } from 'socket.io'; 

//importamos mis archivos de routes
import productsRoutes from './routes/products.router.js'
import cartsRoutes from './routes/carts.router.js'
import homeHandlebars from './routes/views.router.js'

const app = express();
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));

//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/src/views");

// Indicamos que vamos a trabajar con archivos estaticos
app.use(express.static(__dirname + "/src/public"))//Antes solo estaba /public

//Puntos de entrada para routes:
app.use('/api/products', productsRoutes) 
app.use('/api/carts', cartsRoutes)
app.use('/handlebars', homeHandlebars)

const httpServer = app.listen (PORT, () => {
	console.log(`Server run on port: ${PORT}`) ;
})

//Instanciamos socket.io
export const socketServer = new Server(httpServer); 
socketServer.on('connection', socket => {
	console.log('Un cliente se ha conectado.');
})