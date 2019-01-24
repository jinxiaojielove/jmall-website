import request from "../util/request";

/**
 *
 * obj = {userName, password}
 *
 * */

export function loginFormByName(obj) {
    return request({
        url: 'api/users/login',
        method: 'post',
        data: obj
    })
}

