
import {attr, fk, many, Model} from "redux-orm";
import {pipelineConstants} from "../constants/pipeline.constants";
import {stageConstants} from "../constants/stage.constants";
import {dealConstants} from "../constants/deal.constants";
import {searchConstants} from "../constants/search.constants";
import * as _ from "lodash";



/* SearchFilter */
export class SearchFilter extends Model {

    static reducer(action, SearchFilter, session) {
        switch (action.type) {

            case searchConstants.FACET_PIPELINE_SELECTED:
                SearchFilter.upsert({ id: action.payload.id, group: action.payload.group, selected : {pipeline: action.payload.pipeline}});
                break;

            case searchConstants.FACET_CLEAR:
                SearchFilter.withId(action.payload.facetId).set("selected",null);
                break;

            case searchConstants.FACET_GET_SUCCESS:
                SearchFilter.upsert(Object.assign(action.payload, action.filter));
                break;
            case searchConstants.FACET_TERM_SELECTED:
                var oldSelectedOptions = [];
                if( !action.payload.clear){
                    var oldSelected = SearchFilter.withId(action.payload.facetId).selected;
                    oldSelectedOptions = (oldSelected && oldSelected.options) || [];
                }

                var newSelectedOptions = _.concat( oldSelectedOptions, action.payload.terms );
                SearchFilter.withId(action.payload.facetId).set("selected", {options: newSelectedOptions});
                break;
            case searchConstants.FACET_TERM_UNSELECTED:
                var oldSelected = SearchFilter.withId(action.payload.facetId).selected;
                var oldSelectedOptions = (oldSelected && oldSelected.options) || [];

                var newSelectedOptions = oldSelectedOptions.filter(item => !action.payload.terms.includes(item));

                SearchFilter.withId(action.payload.facetId).set("selected", {options: newSelectedOptions});
                break;
            case searchConstants.FACET_RANGE_CHANGED:
                var oldSelected = SearchFilter.withId(action.payload.facetId).selected || {};

                if(action.payload.min){
                    oldSelected.min = action.payload.min;
                }
                if(action.payload.max){
                    oldSelected.max = action.payload.max;
                }

                var newSelected = Object.assign({}, oldSelected);
                SearchFilter.withId(action.payload.facetId).set("selected", newSelected);
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
};
