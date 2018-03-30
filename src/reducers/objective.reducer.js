import {normalize, schema} from 'normalizr';
import {objectiveConstants} from "../constants/objective.constants";

const objectiveSchema = new schema.Entity('objectives');

// or use shorthand syntax:
const objectiveListSchema = [objectiveSchema];

export function objectives(state = {teamObjectives: [], userObjectives: []}, action) {
    switch (action.type) {

        /* get by id */
        case objectiveConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GET_SUCCESS:
            let _state2 = {
                ...state,
                items: {
                    ...state.items,
                    [action.objective.id]: action.objective
                },
                ids: [...state.ids, action.objective.id]
            };
            return _state2;

        case objectiveConstants.GET_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* get objectives by team id*/

        case objectiveConstants.GET_OBJ_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GET_OBJ_SUCCESS:

            let teamObjectives = state.teamObjectives;

            teamObjectives[action.data.teamId] = {items: []};
            teamObjectives[action.data.teamId].items = action.data.objectives;

            return {
                ...state,
                teamObjectives: teamObjectives
            };

        case objectiveConstants.GET_OBJ_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* get objectives by user id*/

        case objectiveConstants.GET_OBJ_USER_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GET_OBJ_USER_SUCCESS:

            let userObjectives = state.userObjectives;

            userObjectives[action.data.userId] = {items: []};
            userObjectives[action.data.userId].items = action.data.objectives;

            return {
                ...state,
                userObjectives: userObjectives
            };

        case objectiveConstants.GET_OBJ_USER_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* ALL objectiveS */
        case objectiveConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, objectiveListSchema);
            return {
                ...state,
                items: _items.entities.objectives,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };

        case objectiveConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* NEW objective for team*/
        case objectiveConstants.CREATE_REQUEST:
            return state;

        case objectiveConstants.CREATE_SUCCESS:
            let teamObjectives2 = state.teamObjectives;
            if (teamObjectives2[action.response.teamId] === undefined) {
                teamObjectives2[action.response.teamId] = {items: []};
            }

            var found = false;
            for (var i = 0; i < teamObjectives2[action.response.teamId].items.length; i++) {
                if (teamObjectives2[action.response.teamId].items[i].name === action.response.name) {
                    teamObjectives2[action.response.teamId].items[i] = action.response;
                    found = true;
                }
            }
            if (!found) {
                teamObjectives2[action.response.teamId].items.push(action.response);
            }

            return {
                ...state,
                teamObjectives: teamObjectives2
            };
        case objectiveConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* NEW objective for user*/
        case objectiveConstants.CREATE_REQUEST_FOR_USER:
            return state;

        case objectiveConstants.CREATE_SUCCESS_FOR_USER:
            let userObjectives2 = state.userObjectives;
            if (userObjectives2[action.response.userId] === undefined) {
                userObjectives2[action.response.userId] = {items: []};
            }

            var found = false;
            for (var i = 0; i < userObjectives2[action.response.userId].items.length; i++) {
                if (userObjectives2[action.response.userId].items[i].name === action.response.name) {
                    userObjectives2[action.response.userId].items[i] = action.response;
                    found = true;
                }
            }
            if (!found) {
                userObjectives2[action.response.userId].items.push(action.response);
            }

            return {
                ...state,
                userObjectives: userObjectives2
            };
        case objectiveConstants.CREATE_FAILURE_FOR_USER:
            return {
                ...state,
                error: action.error
            };


        /* UPDATE objective */
        case objectiveConstants.UPDATE_REQUEST:
            return state;

        case objectiveConstants.UPDATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.objective.id]: action.objective
                }
            };
            return _state;

        case objectiveConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* DELETE objective */
        case objectiveConstants.DELETE_REQUEST:
            return state;

        case objectiveConstants.DELETE_SUCCESS:
            action.ids.forEach(id => {
                delete state.items[id];
            })
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(id => !action.ids.includes(id)),
            };

        default:
            return state
    }
}
