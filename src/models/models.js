
import {attr, many, Model} from "redux-orm";
import {pipelineConstants} from "../constants/pipeline.constants";

/* Pipeline */
export class Pipeline extends Model {

    static reducer(action, Pipeline, session) {
        switch (action.type) {
            case pipelineConstants.GETALL_SUCCESS:
                const pipelines = action.payload;
                pipelines.forEach(pipeline => Pipeline.create(pipeline));
                break;
            case pipelineConstants.CREATE_SUCCESS:
                Pipeline.create(action.payload);
                break;
            case pipelineConstants.UPDATE_SUCCESS:
                Pipeline.withId(action.payload.id).update(action.payload);
                break;
            case pipelineConstants.DELETE_SUCCESS:
                Pipeline.withId(action.payload.id).delete();
                break;
        }
        // Return value is ignored.
        return undefined;
    }

}
Pipeline.modelName = 'Pipeline';

Pipeline.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    stages: many('Stage', 'pipeline')
};

/* Stage */

export class Stage extends Model {

}
Stage.modelName = 'Stage';

Stage.fields = {
    id: attr(),
    name: attr()
};