import {isEmpty} from "lodash";

export function buildRequestString(query, sort, page, size=10) {

    let params = [];

    if( !isEmpty(query)){
        params.push(`q=${query}`);
    }
    if( !isEmpty(sort)){
        params.push(`${sort}`);
    }
    if( page !== undefined ){
        params.push(`page=${page}`);
    }
    if( size !== undefined){
        params.push(`size=${size}`);
    }

    return params.join("&");
}