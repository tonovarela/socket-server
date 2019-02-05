
import Server from './clases/server';
import router  from './routes/routes';

import bodyParser from 'body-parser';
import cors from  'cors';

const server =  Server.instance;

// BodyParser

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors( {origin: true, credentials: true}));

//Rutas de Servicios
server.app.use('/',router);

server.iniciar(()=>{
console.log(`Servidor corriendo  en el puerto ${server.port}`);
});