import React, { Component } from 'react';
import { ProductosService } from '../service/ProductosService';
import { DataTable } from 'primereact/datatable'
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

export default class ProductosCRUD extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      producto: {
        id: "",
        brand: "",
        category: "",
        name: "",
        description: "",
        price: "",
        availability: true,
        quantity: "",
        photography: ""
      },

      selectedProducto: {

      },
      categorias: []
    };

    // === ITEMS OF MENU ===
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-file',
        command: () => { this.mostrarDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.mostrarDialogEditar() }
      },
      {
        label: 'Borrar',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.delete() }
      }

    ];

    this.productosService = new ProductosService();
    //  bind para que el this de la funcion se refiera al componente
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.searchByPrice = this.searchByPrice.bind(this);
    this.searchByDescription = this.searchByDescription.bind(this);



    // === FOOTER, BOTON====================


    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );


  }

  componentDidMount() {
    this.productosService.getAll().then(data => this.setState({ productos: data }));
    //this.productosService.getCategorys().then(data => this.setState({categorias : data}));
    //console.log(this.state.productos);
  }

  save() {
    //console.log(this.state.producto);
    this.productosService.save(this.state.producto).then(data => {
      this.setState({
        visible: false,
        producto: {
          id: "",
          brand: "",
          category: "",
          name: "",
          description: "",
          price: "",
          availability: true,
          quantity: "",
          photography: ""
        }
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
      this.productosService.getAll().then(data => this.setState({ productos: data }));
    })

  }

  delete() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
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
        this.productosService.getAll().then(data => this.setState({ productos: data }));

      })
    }
  }


  // this methos search the product by price
  searchByPrice(event) {
    let price = event.target.value;
    this.productosService.getByPrice(price).then(data => this.setState({ productos: data }));

  }
  
  // this method search the product by description
  searchByDescription(event) {
    let description = event.target.value;
    this.productosService.getByDescription(description).then(data => this.setState({ productos: data }));
  }


  render() {
    return (
      <div style={{ width: '100%' }}>

        {/* LLADO DEL MENU PRICIPAL [Menubar] */}

        <Menubar model={this.items}
          start={
          <>
            <label htmlFor='searchDes'>Buscar por descripcion</label>
            <InputText id='searchDes' placeholder="Search by descripcion"
              value={this.state.producto.description} onChange={(e) => {
                let val = e.target.value;
                this.searchByDescription(e);
                this.setState(prevState => {
                  let producto = Object.assign({}, prevState.producto);

                  producto.description = val;

                  return { producto };

                }
                )// end setState
              }

              }
            />
          </>
          } // end start
          
           end={
            <>
              <label htmlFor='searchPrice'>Buscar por precio</label>
              <InputText id='searchPrice' placeholder="Search by price"
                value={this.state.producto.price} onChange={(e) => {
                  let val = e.target.value;
                  this.searchByPrice(e);
                  this.setState(prevState => {
                    let producto = Object.assign({}, prevState.producto);
                    producto.price = val;
                    return { producto };
                  }
                  )// end setState
                }

                }
              />
            </> 
          } 
            
          />


        <Panel header="CRUD productos" >
          <DataTable value={this.state.productos} size="large" paginator={true} rows="8" selectionMode="single" selection={this.state.selectedProducto} onSelectionChange={e => this.setState({ selectedProducto: e.value })} dataKey="id" responsiveLayout="scroll" >
            <Column field="id" header="ID"></Column>
            <Column field="brand" header="Marca"></Column>
            <Column field="category" header="CATEGORIA"></Column>
            <Column field="name" header="NOMBRE"></Column>
            <Column field="description" header="DESCRIPCION"></Column>
            <Column field="price" header="PRECIO"></Column>
            <Column field="availability" header="DISPONIBLE"></Column>
            <Column field="quantity" header="CANTIDAD"></Column>
            <Column field="photography" header="IMAGEN"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear Producto" footer={this.footer} visible={this.state.visible} style={{ width: '60%' }} modal={true} onHide={() => this.setState({ visible: false })}>
          <br />

          {/* INPUT FIELD ID */}

          <span className="p-float-label">
            <label htmlFor="id">Identification</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText id="id" placeholder='1213' value={this.state.producto.id} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.id = val;

                return { producto };

              })
            }} />

          </span>

          <br />

          <span className="p-float-label">
            <label htmlFor="brand">Marca</label>
          </span>
          <br />

          {/* INPUT FIELD BRAND */}


          <span className="p-float-label">
            <InputText id="brand" placeholder='mi marca' value={this.state.producto.brand} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.brand = val;

                return { producto };

              })
            }} />

          </span>

          <br />



          {/******* INPUT FIELD  CATEGORIA*/}
          <span className="p-float-label">
            <label htmlFor="category">Categoria</label>
          </span>
          <br />
          <span className="p-float-label">

            <InputText id="category" placeholder='Detergente' value={this.state.producto.category} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.category = val;

                return { producto };

              })
            }} />

          </span>
          <br />

          {/* ****************************INPUT NAME****************** */}
          <span className="p-float-label">
            <label htmlFor="name">Nombre</label>
          </span>
          <br />
          <span className="p-float-label">

            <InputText id="name" placeholder='Nicolas Huertas' value={this.state.producto.name} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.name = val;

                return { producto };

              })
            }} />

          </span>
          <br />



          {/**============== INPUT FIELD DESCRIPCION */}


          <span className="p-float-label">
            <label htmlFor="description">Descripcion</label>
          </span>
          <br />
          <span className="p-float-label">

            <InputText id="description" placeholder='Una descripcion corta del prodcucto' value={this.state.producto.description} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.description = val;

                return { producto };

              })
            }} />

          </span>
          <br />

          {/**============== INPUT FIELD PRECIO */}

          <span className="p-float-label">
            <label htmlFor="price">Precio</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputNumber id="price" placeholder="1500 $" value={this.state.producto.price} onValueChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.price = val;

                return { producto };

              })
            }} />

          </span>
          <br />


          {/* ====================== INPUT FIELD DISPONIBLE */}

          <span className="p-float-label">
            <label htmlFor="availability">Disponibilidad</label>
          </span>
          <br />
          <Checkbox id="availability" onChange={(e) => {
            let val = e.target.checked;
            this.setState(prevState => {
              let producto = Object.assign({}, prevState.producto);

              producto.availability = val;

              return { producto };

            })
          }} checked={this.state.producto.availability}></Checkbox>

          <br />
          <br />
          {/* =========== INPUT FIELD CANTIDAD======= */}

          <span className="p-float-label">
            <label htmlFor="quantity">Cantidad</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputNumber id="quantity" placeholder="5" value={this.state.producto.quantity} onValueChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.quantity = val;

                return { producto };

              })
            }} />

          </span>
          {/* ===============INPUT FIELD FOTOGRAFIA=========== */}
          <br />

          <span className="p-float-label">
            <label htmlFor="quantity">URL Fotografia</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText id="photography" value={this.state.producto.photography} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto);

                producto.photography = val;

                return { producto };

              })
            }} />

          </span>

        </Dialog>

        <ToastContainer></ToastContainer>

      </div>


    );
  }

  mostrarDialog() {
    this.setState({
      visible: true,
      producto: {
        id: "",
        brand: "",
        category: "",
        name: "",
        description: "",
        price: "",
        availability: true,
        quantity: "",
        photography: ""
      }
    });
  }

  mostrarDialogEditar() {
    this.setState({
      visible: true,
      producto: {
        id: this.state.selectedProducto.id,
        brand: this.state.selectedProducto.brand,
        nombre: this.state.selectedProducto.nombre,
        category: this.state.selectedProducto.category,
        name: this.state.selectedProducto.name,
        description: this.state.selectedProducto.description,
        price: this.state.selectedProducto.price,
        availability: this.state.selectedProducto.availability,
        quantity: this.state.selectedProducto.quantity,
        photography: this.state.selectedProducto.photography
      }
    });
  }
}
