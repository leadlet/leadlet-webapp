import { ORM } from 'redux-orm';
import {Pipeline, Stage, Deal, SearchFilter} from './models';
import {Activity} from "./Activity";
import {Sort} from "./Sort";

const orm = new ORM();
orm.register(Pipeline, Stage, Deal, SearchFilter, Activity, Sort);

export default orm;