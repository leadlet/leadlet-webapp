import { ORM } from 'redux-orm';
import {Pipeline, Stage, Deal, SearchFilter} from './models';

const orm = new ORM();
orm.register(Pipeline, Stage, Deal, SearchFilter);

export default orm;