import axios from "axios";

const instance = axios.create({
    // baseURL:'http://localhost:8080/api',
    baseURL:'http://localhost:3000/',
    withCredentials:true,
    headers:{
        
    }
})

export default instance