import {getToken} from "../util/auth";


let state = {
    token: getToken('my-cookies') || ''
};

export default state;
