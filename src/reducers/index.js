import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as formReducer } from 'redux-form';
import {persons} from "./person.reducer";
import {teams} from "./team.reducer";
import {account} from "./account.reducer";
import {products} from "./product.reducer";
import {timeLine} from "./timelines.reducer";
import {dealStore} from "./dealStore.reducer";
import {pipelineStore} from "./pipelineStore.reducer";
import {stageStore} from "./stageStore.reducer";
import {activityStore} from "./activityStore.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    persons,
    form: formReducer,
    timeLine,
    activityStore,
    dealStore,
    teams,
    account,
    products,
    pipelineStore,
    stageStore
});

export default rootReducer;