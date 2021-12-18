import React from "react";
import user_im from './IMG/user.png'
import NuevoUsuario from "./NuevoUsuario";
import MenuPrincipal from "./MenuPrincipal";
import { PersonaService } from '../service/PersonaService'
import axios from 'axios';




class InicioSesion extends React.Component {

  PersonaService = new PersonaService();
  baseUrl2 = process.env.REACT_APP_URL_PERSONA;
  resAux;/// variable auxiliar para obtener satos

  state = {
    mostrarInicioSesion: true,
    mostrarNewUser: false,
    mostrarMenuPrincipal: false,

    persona: {
      id: null,
      correo: null,
      edad: null,
      nombre: null,
      pwd: null,
     
    }/*  */
  }

  llamarRegistrarUsuario() {
    this.setState({
      mostrarInicioSesion: false,
      mostrarNewUser: true,
      persona: {
        id: null,
        correo: null,
        edad: null,
        nombre: null,
        pwd: null
      }
    });
  }

  llamarMenuPrincipal() {
    this.setState({
      mostrarInicioSesion: false,
      mostrarMenuPrincipal: true
    });
  }

  validarFormInicioSesion() {
    let correo = document.getElementById("correo").value;
    let pwd = document.getElementById("pass").value;

    //alert(process.env.REACT_APP_URL_PRODUCTOS+" esta es de productos ");

    if (correo.length <= 0) {
      alert("El correo es necesario para continuar");
      document.getElementById("correo").focus();
      return false;
    }
    else if (pwd.length <= 0) {
      alert("El password es necesario para continuar?");
      document.getElementById("pass").focus();
      return false;
    }
    else {

      axios.get(this.baseUrl2 + correo + "/" + pwd)
        .then(res => {

          //console.log(res);

          if (res.data.email == null) {
            alert('Usuario o Clave incorrectos');
            return false;

          }
          else { alert("Bienvenid@ " + res.data.name); this.llamarMenuPrincipal(); return true; }



        }).catch(res => { console.log("Error conexion base de datos validadndo usuario"); return false; });

    }//// fin else


  }/// fin function

  /*validar(){

    if(this.validarFormInicioSesion()){
         //this.llamarMenuPrincipal();
         //alert('pasar');
      }

  }*/


  render() {
    if (this.state.mostrarInicioSesion) {
      return (
        <div id="div_isesion" className="container">
          <div className="row">
            <div className="col">
              <center><h1>Inicio de Sesión</h1></center>
            </div>
          </div>

          <div className="row">
            <div id="login" className="col">
              <h2 className="text-center">Bienvenid@</h2>
              <img src={user_im} className="img-fluid mx-auto d-block rounded" alt="" />

              <form>
                <div className="form-group">
                  <label htmlFor="correo">E-mail</label>
                  <input id="correo" name="correo"
                    className="form-control" type="email"
                    placeholder="E-mail" />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">Contraseña</label>
                  <input id="pass" name="pass"
                    className="form-control" type="password"
                    placeholder="Contraseña" />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={() => this.validarFormInicioSesion()}>
                  Entrar
                </button>
                <br />
                <a href="/#" onClick={() => this.llamarRegistrarUsuario()}>Crear Nuevo Usuario</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/#">Contraseña olvidada</a>
              </form>
            </div>
          </div>

        </div>
      );
    }// fin si mostrarNewUser
    else if (this.state.mostrarNewUser) {
      return (<NuevoUsuario />);
    }///else if(this.state.mostrarNewUser)
    else if (this.state.mostrarMenuPrincipal) {
      return (<MenuPrincipal />);
    }///else if(this.state.mostrarNewUser)
  }// fin render
}// fin InicioSesion

export default InicioSesion;