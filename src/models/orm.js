import { ORM } from 'redux-orm';
import { SearchFilter} from './models';
import {Sort} from "./Sort";
import {Timeline} from "./Timeline";

const orm = new ORM();
orm.register(SearchFilter, Sort, Timeline);

export default orm;