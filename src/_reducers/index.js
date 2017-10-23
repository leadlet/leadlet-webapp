import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';
import {contacts} from "./contacts.reducer";
import {pipelines} from "./pipelines.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    contacts,
    form: formReducer,
    pipelines
});

export default rootReducer;