import axios from 'axios';

export class ProductosService{
    baseUrl=process.env.REACT_APP_URL_PRODUCTOS;
    
    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data);

    }

    save(persona){
        //console.log(persona);
        return axios.post(this.baseUrl + "save",persona).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl + id).then(res => res.data);
    }

    

}