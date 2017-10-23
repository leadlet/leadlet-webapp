import { pipelineConstants } from '../_constants';

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
                name: 'PreSales Pipeline',
                order: 1,
                stages: [
                    {
                      id: 1,
                      name: 'Untouched'
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
                  name: 'PostSales Pipeline',
                  order: 2,
                  stages: [
                      {
                          id: 1,
                          name: 'Visited'
                      },
                      {
                          id: 2,
                          name: 'Support Contract'
                      },
                      {
                          id: 3,
                          name: 'License Upgrade'
                      },
                      {
                          id: 4,
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
    default:
      return state
  }
}