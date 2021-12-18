import React from "react";
import InicioSesion from "./InicioSesion";


class NuevoUsuario extends React.Component{
    
    state={
        volverAinicioSesion: false
      } 
    
    validarFormNewUser(){
        if(document.getElementById("nu_nombre").value.length<=0)
              {
                  alert("El nombre es necesario para continuar?");
                  document.getElementById("nu_nombre").focus();
                  return false;
              }
              else if(document.getElementById("nu_correo").value.length<=0)
              {
                  

                  alert("El correo es necesario para continuar?");
                  document.getElementById("nu_correo").focus();
                  return false;
              }
              else if(document.getElementById("nu_pwd1").value.length<=0)
              {
                  

                  alert("La contraseña es necesaria para continuar?");
                  document.getElementById("nu_pwd1").focus();
                  return false;
              }
              else if(document.getElementById("nu_pwd2").value.length<=0)
              {                 

                  alert("Confirmar la contraseña es necesaria para continuar?");
                  document.getElementById("nu_pwd2").focus();
                  return false;
              }
              else if(document.getElementById("nu_pwd1").value!==document.getElementById("nu_pwd2").value)
              { 
                  alert("Las contraseñas deben coincidir");
                  document.getElementById("nu_pwd1").focus();
                  return false;
              }

                

              return true;
    }

    validar(){

        if(this.validarFormNewUser()){
            
           /* adicionarUsuario(document.getElementById('nu_nombre').value
                             ,document.getElementById('nu_correo').value
                             ,document.getElementById('nu_pwd1').value)}*/
          alert('addd user');
        }// fin if(this.validarFormNewUser())

    }

    llamarIniciaSesion(){
        this.setState({volverAinicioSesion: true});
    }

    render(){
      if(!this.state.volverAinicioSesion)
      {
        return(
            <div id="div_adUsuario">

        <main role="main" className="container my-auto">
           
            <div className="row">
             <div id="div_adUsuarioInt" className="col">
                 <h2 className="text-center">Crear Nuevo Usuario</h2>
                     
                     <div className="form-group">                        
                         <label htmlFor="nu_nombre">Nombre</label>
                         <input id="nu_nombre" name="nu_nombre"
                         className="form-control" type="text"
                         placeholder="Nombre Completo"  />
                     </div>
 
                     <div className="form-group">                        
                         <label htmlFor="nu_correo">E-mail</label>
                         <input id="nu_correo" name="nu_correo"
                             className="form-control" type="email"
                             placeholder="Usuario" />
                     </div>
                     <div className="form-group">
                         <label htmlFor="nu_pwd1">Contraseña</label>
                         <input id="nu_pwd1" name="nu_pwd1"
                             className="form-control" type="password"
                             placeholder="Contraseña" />
                     </div>
 
                     <div className="form-group">
                         <label htmlFor="nu_pwd2">Confirma Contraseña</label>
                         <input id="nu_pwd2" name="nu_pwd2"
                             className="form-control" type="password"
                             placeholder="Confirma Contraseña" />
                     </div>
 
                     <button type="button" className="btn btn-primary mb-2"
                        onClick={()=>this.validar()}>
                         Crear
                     </button>
                     <br />
                     ¿Ya tienes cuenta? <a href="/#" onClick={()=>this.llamarIniciaSesion()}>Inicia sesión aquí</a>
                     <br /><br />
                 
             </div>
         </div>
        </main>

    </div>
        );
        } // else inicio sesion
        else{

            return(<InicioSesion />);
        }

    }
}

export default NuevoUsuario;