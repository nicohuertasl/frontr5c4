import React from "react";
import UsuariosCRUD from './UsuariosCRUD';
import ProductosCRUD from "./ProductosCRUD";



class MenuPrincipal extends React.Component{
  state={
    showUsers:true,
    showProducts:false

  }// fin state

  menuPpal=(
    <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary" onClick={()=>{this.setState({showUsers:true,showProducts:false})}}>Usuarios</button>
              <button type="button" className="btn btn-primary" onClick={()=>{this.setState({showUsers:false,showProducts:true})}}>Productos</button>
              <button type="button" className="btn btn-primary">Cerrar Sesión</button>
          </div>
  );

    render(){
        
      if(this.state.showUsers)
      {
        return(
        <div className="container">
            <div className="row">
              <div className="col">
                {this.menuPpal}
          </div>
          <div className="row">
              <div className="col">
                 <UsuariosCRUD />
                 
              </div>
            </div>  

          </div>
          </div>
        );
      }/// fin if(this.state.showUsers)
      else if(this.state.showProducts)
      {
        return(<div className="container">
            <div className="row">
              <div className="col">
                   {this.menuPpal}
              </div>
          <div className="row">
              <div className="col">
                     <ProductosCRUD />
              </div>
          </div>  

          </div>
          </div>
          );// fin segundo return
      }
    }
}

export default MenuPrincipal;