import {loginFormByName} from "../api/login";
import {setToken} from "../util/auth";


let actions = {
    loginForm({commit}, userInfo) {
        let obj = {
            userName: userInfo.userName.trim(),
            password: userInfo.password
        };
        return new Promise((resolve, reject) => {
            loginFormByName(obj).then(res => {
                commit('SET_TOKEN', res.data.token);
                setToken(res.data.token);
            })
        }).catch(err => {
            reject(err);
        })
    }
};


export default actions
