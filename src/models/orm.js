import { ORM } from 'redux-orm';
import { Pipeline, Stage, Deal } from './models';

const orm = new ORM();
orm.register(Pipeline, Stage, Deal);

export default orm;