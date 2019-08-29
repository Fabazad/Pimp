import axios from "axios";
import constants from "./../helpers/constants.js";
require("dotenv").config();

function serviceResolve(response) {
    return Promise.resolve(response.data);
}

class BaseService {

    baseURL;

    constructor(path) {
        this.baseURL = (process.env.NODE_ENV === 'development' ? constants.SERVER_DEV_URL : constants.SERVER_PROD_URL) + path;
        this.getOne = this.getOne.bind(this);
    }

    getOne(itemId) {
        itemId = itemId ? itemId : '';
        return axios.get(this.baseURL + '/' + itemId).then(serviceResolve, err => console.log(err));
    }

    create(item, options = {}) {
        return axios.post(this.baseURL + "/create", {item, options}).then(serviceResolve, err => console.log(err));
    }
}

export default BaseService;