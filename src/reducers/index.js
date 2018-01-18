import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';
import {persons} from "./person.reducer";
import {organizations} from "./organization.reducer";
import {pipelines} from "./pipelines.reducer";
import {stages} from "./stages.reducer";
import {chats} from './chats.reducer';
import {activities} from './activities.reducer';
import {deals} from './deals.reducer';
import lists from "./lists";
import {timeLines} from "./timelines.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    persons,
    organizations,
    form: formReducer,
    pipelines,
    stages,
    chats,
    activities,
    deals,
    lists,
    timeLines
});

export default rootReducer;