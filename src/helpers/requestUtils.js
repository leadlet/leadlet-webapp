import {isEmpty} from "lodash";

export function buildRequestString(query, sort, page, size) {

    let params = [];

    if( !isEmpty(query)){
        params.push(`q=${query}`);
    }
    if( !isEmpty(sort)){
        params.push(`sort=${sort}`);
    }
    if( !isEmpty(page)){
        params.push(`page=${page}`);
    }
    if( !isEmpty(size)){
        params.push(`size=${size}`);
    }

    return params.join("&");
}