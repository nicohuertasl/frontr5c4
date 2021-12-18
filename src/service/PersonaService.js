import axios from 'axios';

export class PersonaService{
    baseUrl=process.env.REACT_APP_URL_PERSONA;
    
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

    // this method is used to get the persona by birthday
    getByBirthday(birthday){
        return axios.get(this.baseUrl + "birthday/" + birthday).then(res => res.data);
    }

    /*getMail(mail){
        //console.log(this.baseUrl+ "mail/" + mail);
        return axios.get(this.baseUrl+ "mail/" + mail).then(res => res.data);
    }*/

}