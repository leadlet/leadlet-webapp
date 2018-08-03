
import {attr, fk, many, Model} from "redux-orm";
import {pipelineConstants} from "../constants/pipeline.constants";
import {stageConstants} from "../constants/stage.constants";
import {dealConstants} from "../constants/deal.constants";

/* Pipeline */
export class Pipeline extends Model {

    static reducer(action, Pipeline, session) {
        switch (action.type) {
            case pipelineConstants.GETALL_SUCCESS:
                const pipelines = action.payload;
                pipelines.forEach(pipeline => Pipeline.upsert(pipeline));
                break;
            case pipelineConstants.CREATE_SUCCESS:
                Pipeline.create(action.payload);
                break;
            case pipelineConstants.UPDATE_SUCCESS:
                Pipeline.withId(action.payload.id).update(action.payload);
                break;
            case pipelineConstants.DELETE_SUCCESS:
                Pipeline.withId(action.payload).delete();
                break;
        }
        // Return value is ignored.
        return undefined;
    }

}
Pipeline.modelName = 'Pipeline';

Pipeline.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr()
    //, stages: many('Stage')
};

/* Stage */

export class Stage extends Model {
    static reducer(action, Stage, session) {
        switch (action.type) {
            case stageConstants.GETALL_SUCCESS:
                const stages = action.payload;
                stages.forEach(stage => Stage.upsert(stage));       // upsert ???
                break;
            case stageConstants.CREATE_SUCCESS:
                Stage.create(action.payload);
                break;
            case stageConstants.UPDATE_SUCCESS:
                Stage.withId(action.payload.id).update(action.payload);
                break;
            case stageConstants.DELETE_SUCCESS:
                Stage.withId(action.payload).delete();
                break;
        }
        // Return value is ignored.
        return undefined;
    }
}
Stage.modelName = 'Stage';

Stage.fields = {
    id: attr(),
    name: attr(),
    color: attr(),
    pipelineId: fk('Pipeline')
};

/* Deal */

export class Deal extends Model {
    static reducer(action, Deal, session) {
        switch (action.type) {
            case dealConstants.GET_ALL_SUCCESS:
                const deals = action.payload;
                deals.forEach(stage => Deal.upsert(stage));
                break;

            case dealConstants.GET_SUCCESS:
                const deal = action.payload;
                Deal.upsert(deal);
                break;

            case dealConstants.CREATE_SUCCESS:
                Deal.create(action.payload);
                break;
            case dealConstants.UPDATE_SUCCESS:
                Deal.withId(action.payload.id).update(action.payload);
                break;
            case dealConstants.DELETE_SUCCESS:
                Deal.withId(action.payload).delete();
                break;
        }
        // Return value is ignored.
        return undefined;
    }
}
Deal.modelName = 'Deal';

Deal.fields = {
    id: attr(),
    title: attr(),
    priority: attr(),
    dealValue: attr(),
    possibleCloseDate: attr(),

    pipelineId: fk('Pipeline'),
    stageId: fk('Stage')
};
