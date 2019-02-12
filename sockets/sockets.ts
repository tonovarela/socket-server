import { UsuariosLista } from './../clases/usuarios-lista';
import { Socket }  from 'socket.io';
import { Usuario } from '../clases/usuario';

export const usuariosConectados  = new UsuariosLista();

export const conectarCliente = (cliente:Socket) => {
  const usuario =  new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket) => {

  cliente.on('disconnect',()=> {
     const usuario=usuariosConectados.borrarUsuario(cliente.id);
     console.log('Usuario desconectado', usuario);
     
  });
}
//Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server)=> {
  cliente.on('mensaje', (payload:  { de: string, cuerpo: string}) => {
      console.log(payload);
      io.emit('mensaje-nuevo',payload);
  });

}

export const configurarUsuario = (cliente: Socket, io: SocketIO.Server)=> {
    
  cliente.on('configurar-usuario', (payload: { nombre: string}, callback: Function) => {
    usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
    console.log(payload.nombre);
    callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado ` 
    });
    //io.emit('configurar-usuario',payload);
});
}