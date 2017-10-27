import { pipelineConstants } from '../_constants';
import {stageConstants} from "../_constants/stage.constants";

export function pipelines(state = {}, action) {
  switch (action.type) {
    case pipelineConstants.GETALL_REQUEST:
        return {
          loading: true
        };
    case pipelineConstants.GETALL_SUCCESS:
        return {
          items: [
              {
                id: 1,
                name: 'PreSales',
                order: 1,
                stages: [
                    {
                      id: 1,
                      name: 'Untouched',
                        deleting: true
                    },
                    {
                      id: 2,
                      name: 'Contact Made'
                    },
                    {
                      id: 3,
                      name: 'Qualified'
                    },
                    {
                      id: 4,
                      name: 'Proposal Presented'
                    },
                    {
                      id: 5,
                      name: 'Completed'
                    }
                ]

              },
              {
                  id: 2,
                  name: 'PostSales',
                  order: 2,
                  stages: [
                      {
                          id: 6,
                          name: 'Visited'
                      },
                      {
                          id: 7,
                          name: 'Support Contract'
                      },
                      {
                          id: 8,
                          name: 'License Upgrade'
                      },
                      {
                          id: 9,
                          name: 'Billed'
                      }
                  ]

              }
          ]
        };
    case pipelineConstants.GETALL_FAILURE:
        return {
          error: action.error
        };

    case stageConstants.DELETE_REQUEST:
        let _items = state.items;

        for( let i=0; i < _items.length; i++){
            for(let j=0; j < _items[i].stages.length; j++){
                if(_items[i].stages[j].id === action.id){
                    _items[i].stages[j].deleting = true;
                }
            }
        }
        return {
            items: _items
        };
    case stageConstants.DELETE_SUCCESS:
        _items = state.items;

        for( let i=0; i < _items.length; i++){
            for(let j=0; j < _items[i].stages.length; j++){
                if(_items[i].stages[j].id === action.id){
                    _items[i].stages.splice(j,1);
                }
            }
        }
        return {
            items: _items
        };
    case stageConstants.DELETE_FAILURE:
        return {
            error: action.error
        };

    default:
      return state
  }
}