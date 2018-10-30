import {productConstants} from "../constants/product.constants";
import {normalize, schema} from 'normalizr';

const productSchema = new schema.Entity('products');

// or use shorthand syntax:
const productListSchema = [productSchema];

export function products(state = {items: {}, ids: []}, action) {
    switch (action.type) {
        /* get by id */
        case productConstants.GET_REQUEST:
            return {
                loading: true
            };
        case productConstants.GET_SUCCESS:
            return {
                ...state,
                viewedProduct: action.product
            };
        case productConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL productS */
        case productConstants.GETALL_REQUEST:
            return {
                ...state
            };
        case productConstants.GETALL_SUCCESS:
            const _items = normalize(action.data, productListSchema);
            return {
                ...state,
                items: _items.entities.products,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case productConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW product */
        case productConstants.CREATE_REQUEST:
            return state;
        case productConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...state.ids, action.payload.id],
                dataTotalSize: state.dataTotalSize + 1
            };

            return _state;

        case productConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE product */
        case productConstants.UPDATE_REQUEST:
            return state;
        case productConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.product.id]: action.product
                }
            };

            return _state;
        case productConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE product */
        case productConstants.DELETE_REQUEST:
            return state;
        case productConstants.DELETE_SUCCESS:
            delete state.items[action.id];

            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(id => action.id !== id)
            };

        default:
            return state
    }
}
