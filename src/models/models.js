
import {attr, fk, many, Model} from "redux-orm";
import {pipelineConstants} from "../constants/pipeline.constants";
import {stageConstants} from "../constants/stage.constants";
import {dealConstants} from "../constants/deal.constants";
import {searchConstants} from "../constants/search.constants";
import * as _ from "lodash";

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
                Deal.all().toModelArray().forEach(deal => deal.delete());
                deals.forEach(stage => Deal.create(stage));
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


/* SearchFilter */
export class SearchFilter extends Model {

    static reducer(action, SearchFilter, session) {
        switch (action.type) {
            case searchConstants.FACET_GET_SUCCESS:
                SearchFilter.upsert(Object.assign(action.payload, action.filter));
                break;
            case searchConstants.FACET_TERM_SELECTED:
                var oldSelectedOptions = SearchFilter.withId(action.payload.facetId).selectedOptions || [];
                var newSelectedOptions = _.concat( oldSelectedOptions, action.payload.term );
                SearchFilter.withId(action.payload.facetId).set("selectedOptions",newSelectedOptions);
                break;
            case searchConstants.FACET_TERM_UNSELECTED:
                var oldSelectedOptions = SearchFilter.withId(action.payload.facetId).selectedOptions;
                var index = oldSelectedOptions.indexOf(action.payload.term);
                var newSelectedOptions = oldSelectedOptions.slice(0,index).concat(oldSelectedOptions.slice(index+1));

                SearchFilter.withId(action.payload.facetId).set("selectedOptions",newSelectedOptions);
                break;
            case searchConstants.REGISTER_FILTER:
                SearchFilter.create(action.payload);
                break;
        }
        // Return value is ignored.
        return undefined;
    }

}
SearchFilter.modelName = 'SearchFilter';

SearchFilter.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    type: attr(),
    options: attr(),
    operator: attr(),
    selectedOptions: attr()
    //, stages: many('Stage')
};


/*
       case searchConstants.FACET_GETALL_SUCCESS:
            const items = normalize(action.payload, facetListSchema);
            return {
                ...state,
                items: items.entities.facets,
                ids: items.result
            };
        case searchConstants.FACET_TERM_SELECTED:
            var facetTerm = action.payload;
            var modifiedFilters = state.selectedFilters;

            if ( modifiedFilters[facetTerm.facetId] === undefined ){
                modifiedFilters[facetTerm.facetId] = [facetTerm.term];
            }else{
                modifiedFilters[facetTerm.facetId].push(facetTerm.term);
            }

            return {
                ...state,
                selectedFilters: modifiedFilters
            };

        case searchConstants.FACET_TERM_UNSELECTED:
            var facetTerm = action.payload;
            var modifiedFilters = state.selectedFilters;

            if ( modifiedFilters[facetTerm.facetId] === undefined ){
                // not possible
            }else{
                modifiedFilters[facetTerm.facetId] = modifiedFilters[facetTerm.facetId].filter( elem => (elem !== facetTerm.term));
            }

            return {
                ...state,
                selectedFilters: modifiedFilters
            };

 */