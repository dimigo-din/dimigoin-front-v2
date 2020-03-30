import gql from 'graphql-tag';

export const GET_ALL_APPLICATIONS = gql`
    query getAllApplications($page: Int!) {
        allApplications(page: $page) {
            _id
            applier {
                _id
                name
                serial
                appliedCircles {
                    name
                    imageKey
                }
            }
            status
            circle {
                name
            }
            form
        }
    }
`;

export const GET_APPLICATIONS_BY_CIRCLE = gql`
    query getApplicationsByCircle {
        applications {
            _id
            applier {
                _id
                name
                serial
                # appliedCircles {
                #     name
                #     imageKey
                # }
            }
            status
            form
        }
    }
`;

export const SET_APPLIER_STATUS = gql`
    mutation($status: String!, $applierId: ID!) {
        setApplicationStatus(input: {
            status: $status,
            applierId: $applierId
        }) {
            _id
        }
    }
`;
