import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {reducer as formReducer} from 'redux-form';
import {contacts} from "./contact.reducer";
import {account} from "./account.reducer";
import {products} from "./product.reducer";
import {timeLineStore} from "./timeLineStore.reducer";
import {dealStore} from "./dealStore.reducer";
import {pipelineStore} from "./pipelineStore.reducer";
import {stageStore} from "./stageStore.reducer";
import {activityStore} from "./activityStore.reducer";
import {filterStore} from "./filterStore.reducer";
import {sortStore} from "./sortStore.reducer";
import {activityTypes} from "./activityType.reducer";
import {channels} from "./channel.reducer";
import {sources} from "./source.reducer";
import {queryStore} from "./queryStore.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    contacts,
    form: formReducer,
    activityStore,
    dealStore,
    account,
    products,
    pipelineStore,
    stageStore,
    timeLineStore,
    filterStore,
    queryStore,
    sortStore,
    activityTypes,
    channels,
    sources
});

export default rootReducer;