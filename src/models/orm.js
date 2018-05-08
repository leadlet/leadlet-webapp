import { ORM } from 'redux-orm';
import { Pipeline, Stage } from './models';

const orm = new ORM();
orm.register(Pipeline, Stage);

export default orm;