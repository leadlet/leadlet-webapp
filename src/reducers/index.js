import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';
import {persons} from "./person.reducer";
import {activities} from './activities.reducer';
import {teams} from "./team.reducer";
import {account} from "./account.reducer";

import { schema } from './../models/models';
import {db} from "./orm.reducers";
import {products} from "./product.reducer";
import {timelines} from "./timelines.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    persons,
    form: formReducer,
    db,
    timelines,
    activities,
    teams,
    account,
    products
});

export default rootReducer;