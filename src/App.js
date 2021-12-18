import './App.css';
import InicioSesion from './misComponentes/InicioSesion';
//import {Button , Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import React from 'react';
//import { render } from 'react-dom';




class App extends React.Component {

  state=
  {
    verModal: false
    
  }

  abrirModal=()=>{
    this.setState({verModal : !this.state.verModal});
  }


  render(){
  return (
    
               <InicioSesion />
        

    
  );
  }/// fin el render
}

export default App;
