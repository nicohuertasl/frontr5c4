import React, { Component } from 'react';
import { ProductosService } from '../service/ProductosService';
import {DataTable} from 'primereact/datatable' 
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class ProductosCRUD extends Component{
  constructor(){
    super();
    this.state ={visible:false,
      producto: {
        id:"",
        categoria:"",
        nombre:"",
        descripcion:"",
        precio:"",
        disponibilidad:true,
        cantidad:"",
        imagen:""},

        selectedProducto:{

        },
        categorias:[]
      };
    this.items=[
      {
        label:'Nuevo',
        icon:'pi pi-fw pi-file',
        command : () => {this.mostrarDialog()}
      },
      {
        label:'Editar',
        icon:'pi pi-fw pi-pencil',
        command : () => {this.mostrarDialogEditar()}
      },
      {
        label:'Borrar',
        icon:'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];

    this.productosService= new ProductosService();
    this.save=this.save.bind(this);
    this.delete=this.delete.bind(this);

    this.footer=(
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    

  }

  componentDidMount(){
    this.productosService.getAll().then(data => this.setState({productos : data}));
    //this.productosService.getCategorys().then(data => this.setState({categorias : data}));
    //console.log(this.state.productos);
  }

  save(){
      //console.log(this.state.producto);
    this.productosService.save(this.state.producto).then(data => {
      this.setState({
        visible:false,
        producto: {
          id:"",
          categoria:"",
          nombre:"",
          descripcion:"",
          precio:"",
          disponibilidad:true,
          cantidad:"",
          imagen:""}
      });
      toast('Producto Guardado', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
      this.productosService.getAll().then(data => this.setState({productos : data}));
    })
    
  }

  delete(){
    if(window.confirm("Realmente desea eliminar el registro?"))
    {
      this.productosService.delete(this.state.selectedProducto.id).then(data => {
        toast('Producto Eliminado', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        this.productosService.getAll().then(data => this.setState({productos : data}));

      })
    }
  }

  render(){
    return(
      <div style={{width:'80%'}}>
        <Menubar model={this.items}/>
         <Panel header="CRUD productos" >
        <DataTable value={this.state.productos} paginator={true} rows="8" selectionMode="single" selection={this.state.selectedProducto} onSelectionChange={e => this.setState({ selectedProducto: e.value })} dataKey="id" responsiveLayout="scroll" >
        <Column field="id" header="ID"></Column>
        <Column field="categoria" header="CATEGORIA"></Column>
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="descripcion" header="DESCRIPCION"></Column>
        <Column field="precio" header="PRECIO"></Column>
        <Column field="disponibilidad" header="DISPONIBLE"></Column>
        <Column field="cantidad" header="CANTIDAD"></Column>
        <Column field="imagen" header="IMAGEN"></Column>
      </DataTable>
      </Panel>

      <Dialog header="Crear Producto" footer={this.footer} visible={this.state.visible} style={{ width: '60%' }} modal={true}  onHide={() => this.setState({visible:false})}>
      <br/>
      <span className="p-float-label">
          <InputText id="id" value={this.state.producto.id} onChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.id=val;

            return{producto};

          })} }/>
          <label htmlFor="id">IDENTIFICADOR</label>
      </span>

      <br/>

      <span className="p-float-label">
        
          <label htmlFor="categoria">CATEGORIA</label>
      </span>
      <br/>
      <span className="p-float-label">
          <InputText id="nombre" value={this.state.producto.nombre} onChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.nombre=val;

            return{producto};

          })} }/>
          <label htmlFor="nombre">NOMBRE</label>
      </span>

      <br/>
      <span className="p-float-label">
          <InputText id="descripcion" value={this.state.producto.descripcion} onChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.descripcion=val;

            return{producto};

          })} }/>
          <label htmlFor="descripcion">DESCRIPCION</label>
      </span>
      <br/>
      <span className="p-float-label">
          <InputNumber id="precio" placeholder="PRECIO" value={this.state.producto.precio} onValueChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.precio=val;

            return{producto};

          })} }/>
          <label htmlFor="precio">PRECIO</label>
      </span>
        <br/>
        <Checkbox id="disponibilidad" onChange={(e) => {
            let val=e.target.checked;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.disponibilidad=val;

            return{producto};

          })}} checked={this.state.producto.disponibilidad}></Checkbox>Disponibilidad

          <br/> <br/>

          <span className="p-float-label">
          <InputNumber id="cantidad" placeholder="CANTIDAD" value={this.state.producto.cantidad} onValueChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.cantidad=val;

            return{producto};

          })}} />
          <label htmlFor="cantidad">CANTIDAD</label>
      </span>

      <br/>
      <span className="p-float-label">
          <InputText id="imagen" value={this.state.producto.imagen} onChange={(e) => {
            let val=e.target.value;
            this.setState(prevState => {
            let producto=Object.assign({},prevState.producto);

            producto.imagen=val;

            return{producto};

          })}} />
          <label htmlFor="imagen">IMAGEN</label>
      </span>
          
      </Dialog>

      <ToastContainer></ToastContainer>

      </div>

      
    );
  }

  mostrarDialog(){
    this.setState({
      visible:true,
      producto: {
        id:"",
        categoria:"",
        nombre:"",
        descripcion:"",
        precio:"",
        disponibilidad:true,
        cantidad:"",
        imagen:""}
    });
  }

  mostrarDialogEditar()
  {
    this.setState({
      visible:true,
      producto: {
        id:this.state.selectedProducto.id,
        categoria:this.state.selectedProducto.categoria,
        nombre:this.state.selectedProducto.nombre,
        descripcion:this.state.selectedProducto.descripcion,
        precio:this.state.selectedProducto.precio,
        disponibilidad:this.state.selectedProducto.disponibilidad,
        cantidad:this.state.selectedProducto.cantidad,
        imagen:this.state.selectedProducto.imagen}
    }); 
  }
}
