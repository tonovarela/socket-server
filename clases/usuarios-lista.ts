import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[]= [];

    constructor(){

    }

     //Agregar usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public borrarUsuario(id: string) {
         const tempUsuario = this.getUsuario(id);
         this.lista = this.lista.filter(usuario => usuario.id !== id);
       return tempUsuario;
    }

    public getLista(){
        return this.lista.filter(usuario=> usuario.nombre!=="sin-nombre");
    }
    public getUsuariosEnSala(sala: string){
         return this.lista.filter(usuario => usuario.sala ===sala);
    }

    public getUsuario (id: string){
     return this.lista.find(usuario=> usuario.id === id);
    }

    public actualizarNombre(id:string, nombre: string) {
         this.lista.forEach(usuario =>{
           if (usuario.id===id){
               usuario.nombre = nombre;
           }
         });
         console.log(this.lista);
         console.log("Actualizando usuario");
    }

}