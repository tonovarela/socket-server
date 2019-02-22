
import { UsuariosLista } from './../clases/usuarios-lista';
import { Socket }  from 'socket.io';
import { Usuario } from '../clases/usuario';

export const usuariosConectados  = new UsuariosLista();

export const conectarCliente = (cliente:Socket, io: SocketIO.Server) => {
  const usuario =  new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
 

}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {

  cliente.on('disconnect',()=> {
     const usuario=usuariosConectados.borrarUsuario(cliente.id);
     console.log('Usuario desconectado', usuario);
     io.emit('usuarios-activos',usuariosConectados.getLista());
     
  });
}
//Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server)=> {
  cliente.on('mensaje', (payload:  { de: string, cuerpo: string}) => {
      console.log(payload);
      io.emit('mensaje-nuevo',payload);
  });

}

export const obtenerUsuarios =(cliente: Socket, io: SocketIO.Server ) => {
  
   cliente.on('obtener-usuarios',() => {
     io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista());
   });
}

export const configurarUsuario = (cliente: Socket, io: SocketIO.Server)=> {
    
  cliente.on('configurar-usuario', (payload: { nombre: string}, callback: Function) => {
    usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
    io.emit('usuarios-activos',usuariosConectados.getLista());
    console.log(payload.nombre);
    callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado ` 
    });
    //io.emit('configurar-usuario',payload);
});

 

}