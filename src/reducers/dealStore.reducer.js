import {normalize, schema} from 'normalizr';
import {dealConstants} from "../constants/deal.constants";

const dealSchema = new schema.Entity('deals');
const dealListSchema = [dealSchema];

export function dealStore(state = { ids: [], items: {}}, action) {
    let deals;
    switch (action.type) {

        case dealConstants.APPEND_STAGE_DEALS_SUCCESS:
            deals = normalize(action.payload.deals, dealListSchema);
            return {
                ...state,
                items:Object.assign (state.items, deals.entities.deals),
                ids: [...new Set([...state.ids,...deals.result])]
            };

        case dealConstants.LOAD_STAGE_DEALS_SUCCESS:
            deals = normalize(action.payload.deals, dealListSchema);
            let stageId = action.payload.stageId;
            let cleanedState = deleteDealsFromStage(state, stageId);
            return {
                ...state,
                items: Object.assign (cleanedState.items, deals.entities.deals),
                ids: [...new Set([...cleanedState.ids,...deals.result])]
            };

        case dealConstants.UPDATE_SUCCESS:
        case dealConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...new Set([...state.ids, action.payload.id])]
            };
        case dealConstants.GET_SUCCESS:

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...new Set([...state.ids, action.payload.id])]

            };

        case dealConstants.DELETE_SUCCESS:

            const id = action.payload;
            delete state.items[id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(stateId => stateId!==id),
            };
        default:
            return state
    }
}

function deleteDealsFromStage(state, stageId) {
    let filteredIds = [];
    let filteredItems = {};
    if (state.ids) {

        filteredIds = state.ids.filter( dealId => {

            if( state.items[dealId] === undefined ){
                console.log("test");
            }
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