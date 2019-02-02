
import express from 'express';
import { SERVER_PORT } from '../globals/enviroments';

export default  class Server {

    public app: express.Application;
    public port:number;

   
    constructor() {
        this.app= express();
        this.port= SERVER_PORT;
        
    }

    iniciar( callback: Function){
       this.app.listen(this.port,callback);
    }
    
}