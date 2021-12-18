import React from "react";
import { PersonaService } from '../service/PersonaService';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
//import { InputNumber } from 'primereact/inputnumber';
//import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';




class UsuariosCRUD extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: false,

      persona: {
        id: "",
        identification: "",
        name: "",
        birthtDay: "",
        monthBirthtDay: "",
        address: "",
        cellPhone: "",
        email: "",
        password: "",
        zone: "",
        type: ""
      },

      selectedPersona: {

      }
    }; /// fin del state

    //*****   items del menu */
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

    ///*****  fin items del menu */

    this.PersonaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);

    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );

  }/// fin constructor


  componentDidMount() {
    this.PersonaService.getAll().then(data => this.setState({ personas: data }));
    //console.log(this.state.persona);

  }/// componentDidMount

  save() {
    //console.log(this.state.persona);
    this.PersonaService.save(this.state.persona).then(data => {
      this.setState({
        visible: false,
        persona: {
          id: "",
          identification: "",
          name: "",
          birthtDay: "",
          monthBirthtDay: "",
          address: "",
          cellPhone: "",
          email: "",
          password: "",
          zone: "",
          type: ""
        }
      });
      toast('Persona Guardada', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.PersonaService.getAll().then(data => this.setState({ personas: data }));
    })
  }

  delete() {
    if (window.confirm("Realmente desea eliminar el registro?")) {
      this.PersonaService.delete(this.state.selectedPersona.id).then(data => {
        toast('Datos de Persona Borrados', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.PersonaService.getAll().then(data => this.setState({ personas: data }));

      })
    }
  }


  /* exportPdf (div){

     html2canvas(document.querySelector("#"+div)).then(canvas => {
        document.body.appendChild(canvas);  // if you want see your screenshot in body.
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf"); 
    });
 
 }*/


  render() {

    return (
      <>
        <Menubar model={this.items} />
        <Panel header="CRUD Personas" id="panelPersonas">
          <DataTable value={this.state.personas} paginator={true} rows="8" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({ selectedPersona: e.value })} dataKey="id" responsiveLayout="scroll" >
            <Column field="id" header="ID"></Column>
            <Column field="identification" header="Cedula"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="birthtDay" header="Fecha de  Nacimiento"></Column>
            <Column field="monthBirthtDay" header="Mes Nacimiento"></Column>

            <Column field="address" header="Dirección"></Column>
            <Column field="cellPhone" header="Celular"></Column>
            <Column field="email" header="Correo"></Column>
            <Column field="password" header="Contraseña"></Column>

            <Column field="zone" header="Zona"></Column>
            <Column field="type" header="Tipo"></Column>

          </DataTable>

        </Panel>

        {/* Ventanas de dialogo */}
        <Dialog header="Crear Persona" footer={this.footer} visible={this.state.visible} style={{ width: '60%' }} modal={true} onHide={() => this.setState({ visible: false })}>
          <br />
          <span className="p-float-label">
            <InputText id="id" value={this.state.persona.id} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.id = val;

                return { persona };

              })
            }} />
            <label htmlFor="id">IDENTIFICADOR</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText id="identification" value={this.state.persona.identification} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.identification = val;

                return { persona };

              })
            }} />
            <label htmlFor="identification">IDENTIFICACIÓN</label>
          </span>


          <br />

          <span className="p-float-label">
            <InputText id="name" value={this.state.persona.name} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.name = val;

                return { persona };

              })
            }} />
            <label htmlFor="name">NOMBRE</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText id="birthtDay" value={this.state.persona.birthtDay} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.birthtDay = val;

                return { persona };

              })
            }} />
            <label htmlFor="birthtDay">Fecha de Nacimiento</label>
          </span>

          <br />
          <span className="p-float-label">
            <InputText id="monthBirthtDay" value={this.state.persona.monthBirthtDay} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.monthBirthtDay = val;

                return { persona };

              })
            }} />
            <label htmlFor="monthBirthtDay">Mes cumpleaños</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="address" value={this.state.persona.address} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.address = val;

                return { persona };

              })
            }} />
            <label htmlFor="address">DIRECCIÓN</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="cellPhone" value={this.state.persona.cellPhone} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.cellPhone = val;

                return { persona };

              })
            }} />
            <label htmlFor="cellPhone">CELULAR</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="email" value={this.state.persona.email} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.email = val;

                return { persona };

              })
            }} />
            <label htmlFor="email">Correo</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="password" value={this.state.persona.password} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.password = val;

                return { persona };

              })
            }} />
            <label htmlFor="password">CLAVE</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="zone" value={this.state.persona.zone} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.zone = val;

                return { persona };

              })
            }} />
            <label htmlFor="zona">Zona</label>
          </span>
          <br />

          <span className="p-float-label">
            <InputText id="type" value={this.state.persona.type} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let persona = Object.assign({}, prevState.persona);

                persona.type = val;

                return { persona };

              })
            }} />
            <label htmlFor="type">Tipo</label>
          </span>
          <br />

        </Dialog>

        <ToastContainer></ToastContainer>

      </>/// fin eqtiqueta contenedora de return


    );// fin return del render

  }/// fin render

  //*****   declaracion de funciones para mostrar dialogos de guaradr y editar */
  mostrarDialog() {
    this.setState({
      visible: true,
      persona: {
        id: "",
        identification: "",
        name: "",
        birthtDay: "",
        monthBirthtDay: "",
        address: "",
        cellPhone: "",
        email: "",
        password: "",
        zone: "",
        type: ""
      }

    });
  }

  mostrarDialogEditar() {
    this.setState({
      visible: true,
      persona: {
        id: this.state.selectedPersona.id,
        identification: this.state.selectedPersona.identification,
        name: this.state.selectedPersona.name,
        birthtDay: this.state.selectedPersona.birthtDay,
        monthBirthtDay: this.state.selectedPersona.monthBirthtDay,
        address: this.state.selectedPersona.address,
        cellPhone: this.state.selectedPersona.cellPhone,
        email: this.state.selectedPersona.email,
        password: this.state.selectedPersona.password,
        zone: this.state.selectedPersona.zone,
        type: this.state.selectedPersona.type
      }
    });
  }

}

export default UsuariosCRUD;