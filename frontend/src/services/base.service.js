import axios from "axios";
import constants from "./../helpers/constants.js";
require("dotenv").config();

function serviceResolve(response) {
    return Promise.resolve(response.data);
}

class BaseService {

    baseURL;

    constructor(path) {
        this.baseURL = constants.SERVER_LOCAL_URL + path;
        this.getOne = this.getOne.bind(this);
        console.log(process.env);
    }

    getOne() {
        return axios.get(this.baseURL + '/').then(serviceResolve, err => console.log(err));
    }
}

export default BaseService;