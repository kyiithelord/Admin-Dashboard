import gql from 'graphql-tag';

// Query to get Total Company,Contact and Deal Counts
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
            query DashboardTotalCounts {
                companies {
                    totalCount
                }
                
                contacts {
                    totalCount
                }

                deals {
                    totalCount
                }
            }
`;

// Query to get upcoming events
export const DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY = gql `
    query DashboardCalenderUpcomingEvents (
        $filter:EventFilter!
        $sorting: [EventSort!]
        $paging: OffsetPaging!
    ) {
       events (filter:$filter,sorting:$sorting,paging:$paging){
            totalCount
            nodes {
                id
                title
                color
                startDate
                endDate
            }
       }
    }
`;


// Query to get deals chart

