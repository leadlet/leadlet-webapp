import { ORM } from 'redux-orm';
import {Pipeline, Stage, Deal, SearchFilter} from './models';
import {Activity} from "./Activity";

const orm = new ORM();
orm.register(Pipeline, Stage, Deal, SearchFilter, Activity);

export default orm;