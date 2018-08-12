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
import {timeLines} from "./timelines.reducer";
import {boards} from "./board.reducer";
import {teams} from "./team.reducer";
import {objectives} from "./objective.reducer";
import {account} from "./account.reducer";
import {documents} from "./document.reducer";
import {products} from "./product.reducer";

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
    timeLines,
    teams,
    boards,
    objectives,
    account,
    documents,
    products
});

export default rootReducer;