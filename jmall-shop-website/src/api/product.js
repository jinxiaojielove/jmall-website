import request from "../util/request";

export function queryCategories() {
    return request({
        url: 'api/product/category/all',
        method: 'get'
    })
}

export function queryBrands() {
    return request({
        url: 'api/product/brand/all',
        method: 'get'
    })
}

export function queryAttributeByCategoryId(categoryId) {
    return request({
        url: 'api/product/category/' + categoryId + '/attribute',
        method: 'get'
    })
}

export function querySaleAttributeByCategoryId(categoryId) {
    return request({
        url: 'api/product/category/' + categoryId + '/sale-attribute',
        method: 'get'
    })
}
