import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';
import {contacts} from "./contacts.reducer";
import {pipelines} from "./pipelines.reducer";
import {stages} from "./stages.reducer";
import {chats} from './chats.reducer';
import {activities} from './activities.reducer';
import {deals} from './deals.reducer';
import lists from "./lists";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    contacts,
    form: formReducer,
    pipelines,
    stages,
    chats,
    activities,
    deals,
    lists
});

export default rootReducer;