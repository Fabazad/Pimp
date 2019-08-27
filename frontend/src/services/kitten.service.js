import axios from "axios";
import constants from "./../helpers/constants.js"

function serviceResolve(response) {
    return Promise.resolve(response.data);
}

class KittenService {
    get() {
        return axios.get(constants.SERVER_URL + '/').then(serviceResolve, err => console.log(err));
    }
}

export default KittenService;