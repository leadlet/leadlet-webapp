import {normalize, schema} from 'normalizr';
import {dealConstants} from "../constants/deal.constants";

const dealSchema = new schema.Entity('deals');

// or use shorthand syntax:
const dealListSchema = [dealSchema];

export function dealStore(state = { ids: [], items: {}}, action) {
    switch (action.type) {

        case dealConstants.APPEND_STAGE_DEALS_SUCCESS:
            var deals = normalize(action.payload.deals, dealListSchema);
            // TODO append here
            return {
                ...state,
                items:Object.assign (state.items, deals.entities.deals),
                ids: [
                    ...state.ids,
                    ...deals.result
                ]
            };

        case dealConstants.LOAD_STAGE_DEALS_SUCCESS:
            var deals = normalize(action.payload.deals, dealListSchema);
            var stageId = action.payload.stageId;
            var cleanedState = deleteDealsFromStage(state, stageId);
            return {
                ...state,
                items: Object.assign (cleanedState.items, deals.entities.deals),
                ids: [
                    ...cleanedState.ids,
                    ...deals.result
                ]
            };

        case dealConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [ ...state.ids, action.payload.id]
            };
        case dealConstants.UPDATE_SUCCESS:
        case dealConstants.GET_SUCCESS:

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [ ...state.ids, action.payload.id]

            };
        case dealConstants.DELETE_SUCCESS:

            // TODO
            break;
        default:
            return state
    }
}

function deleteDealsFromStage(state, stageId) {
    var filteredIds = [];
    var filteredItems = {};
    if (state.ids) {

        filteredIds = state.ids.filter( dealId => {
            return state.items[dealId].stage.id !== stageId
        });

        state.ids.forEach( dealId => {
            if(  state.items[dealId].stage.id === stageId ){
                delete state.items[dealId];
            }
        });

        filteredItems = Object.assign({}, state.items);
    }
    return { ids: filteredIds, items: filteredItems };
}