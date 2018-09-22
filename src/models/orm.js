import { ORM } from 'redux-orm';
import { SearchFilter} from './models';
import {Sort} from "./Sort";

const orm = new ORM();
orm.register(SearchFilter, Sort);

export default orm;