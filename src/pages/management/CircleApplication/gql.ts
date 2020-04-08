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
                    _id
                    name
                    imageKey
                }
            }
            interviewTime
            status
            circle {
                _id
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
                appliedCircles {
                    _id
                    name
                    imageKey
                }
            }
            interviewTime
            status
            form
            circle {
                name
            }
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

export const SET_INTERVIEW_TIME = gql`
    mutation($applierId: ID!, $interviewTime: String!) {
        setApplicationInterviewTime(input: {
            applierId: $applierId,
            interviewTime: $interviewTime
        }) {
            _id
            status
            interviewTime
            applier {
                _id
                name
            }
        }
    }
`;

export const GET_FINAL_APPLICATIONS = gql`
    query {
        finalApplications {
            _id
            applier {
                _id
            }
            circle {
                imageKey
                name
            }
        }
    }
`;
