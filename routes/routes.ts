import {Router, Request, Response} from 'express';
import Server from '../clases/server';
export const router = Router();
router.get('/mensajes',(req:Request,res: Response)=>{

     res.json({
         ok: true,
         mensaje: 'Todo esta bien'
     });
});
router.post('/mensajes',(req:Request,res: Response)=>{
  const cuerpo = req.body.cuerpo;
  const de  = req.body.de;
  const server = Server.instance;
  const payload =  { de ,cuerpo };
  server.io.emit('mensaje-nuevo',payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id',(req:Request,res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de  = req.body.de;
    const id= req.params.id;
    const server = Server.instance;
    const payload =  {
        de,
        cuerpo
    };
     console.log(payload);
    server.io.in(id).emit('mensaje-privado',payload);
      res.json({
          ok: true,
          cuerpo,
          de,
          id
      });
  });


export default router;