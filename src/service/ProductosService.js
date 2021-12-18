import axios from 'axios';

export class ProductosService{
    baseUrl=process.env.REACT_APP_URL_PRODUCTOS;
    
    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data);

    }

    save(persona){
        //console.log(persona);
        return axios.post(this.baseUrl + "new",persona).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl + id).then(res => res.data);
    }

    // This method get a product by price
    getByPrice(price){
        return axios.get(this.baseUrl + "price/" + price).then(res => res.data);
    }
    // This method get a product by description
    getByDescription(description){
        return axios.get(this.baseUrl + "description/" + description).then(res => res.data);
    }
    // This method get a product by id
    getById(id){
        return axios.get(this.baseUrl + id).then(res => res.data);
    }
    

}