import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Feed = {
  __typename?: 'Feed';
  links: Array<Link>;
  count: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  description: Scalars['String'];
  url: Scalars['String'];
  postedBy?: Maybe<User>;
  votes: Array<Vote>;
};

export type LinkOrderByInput = {
  description?: Maybe<Sort>;
  url?: Maybe<Sort>;
  createdAt?: Maybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  post: Link;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote: Vote;
};


export type MutationPostArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  info: Scalars['String'];
  feed: Feed;
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  links: Array<Link>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link: Link;
  user: User;
};

export type PostMutationMutationVariables = Exact<{
  description: Scalars['String'];
  url: Scalars['String'];
}>;


export type PostMutationMutation = { __typename?: 'Mutation', post: { __typename?: 'Link', id: string, description: string, url: string } };

export type VoteMutationMutationVariables = Exact<{
  linkId: Scalars['ID'];
}>;


export type VoteMutationMutation = { __typename?: 'Mutation', vote: { __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } } };

export type FeedLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedLinksQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', links: Array<{ __typename?: 'Link', id: string, url: string, description: string, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }>, postedBy?: Maybe<{ __typename?: 'User', id: string, name: string }> }> } };

export type New_Links_SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type New_Links_SubscriptionSubscription = { __typename?: 'Subscription', newLink?: Maybe<{ __typename?: 'Link', id: string, url: string, description: string, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }>, postedBy?: Maybe<{ __typename?: 'User', id: string, name: string }> }> };

export type SignupMutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutationMutation = { __typename?: 'Mutation', signup?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string> }> };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string> }> };


export const PostMutationDocument = gql`
    mutation PostMutation($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    description
    url
  }
}
    `;
export type PostMutationMutationFn = Apollo.MutationFunction<PostMutationMutation, PostMutationMutationVariables>;

/**
 * __usePostMutationMutation__
 *
 * To run a mutation, you first call `usePostMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutationMutation, { data, loading, error }] = usePostMutationMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function usePostMutationMutation(baseOptions?: Apollo.MutationHookOptions<PostMutationMutation, PostMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMutationMutation, PostMutationMutationVariables>(PostMutationDocument, options);
      }
export type PostMutationMutationHookResult = ReturnType<typeof usePostMutationMutation>;
export type PostMutationMutationResult = Apollo.MutationResult<PostMutationMutation>;
export type PostMutationMutationOptions = Apollo.BaseMutationOptions<PostMutationMutation, PostMutationMutationVariables>;
export const VoteMutationDocument = gql`
    mutation VoteMutation($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      id
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
    `;
export type VoteMutationMutationFn = Apollo.MutationFunction<VoteMutationMutation, VoteMutationMutationVariables>;

/**
 * __useVoteMutationMutation__
 *
 * To run a mutation, you first call `useVoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutationMutation, { data, loading, error }] = useVoteMutationMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useVoteMutationMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutationMutation, VoteMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutationMutation, VoteMutationMutationVariables>(VoteMutationDocument, options);
      }
export type VoteMutationMutationHookResult = ReturnType<typeof useVoteMutationMutation>;
export type VoteMutationMutationResult = Apollo.MutationResult<VoteMutationMutation>;
export type VoteMutationMutationOptions = Apollo.BaseMutationOptions<VoteMutationMutation, VoteMutationMutationVariables>;
export const FeedLinksDocument = gql`
    query FeedLinks {
  feed {
    links {
      id
      url
      description
      votes {
        id
        user {
          id
        }
      }
      postedBy {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useFeedLinksQuery__
 *
 * To run a query within a React component, call `useFeedLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedLinksQuery(baseOptions?: Apollo.QueryHookOptions<FeedLinksQuery, FeedLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedLinksQuery, FeedLinksQueryVariables>(FeedLinksDocument, options);
      }
export function useFeedLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedLinksQuery, FeedLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedLinksQuery, FeedLinksQueryVariables>(FeedLinksDocument, options);
        }
export type FeedLinksQueryHookResult = ReturnType<typeof useFeedLinksQuery>;
export type FeedLinksLazyQueryHookResult = ReturnType<typeof useFeedLinksLazyQuery>;
export type FeedLinksQueryResult = Apollo.QueryResult<FeedLinksQuery, FeedLinksQueryVariables>;
export const New_Links_SubscriptionDocument = gql`
    subscription NEW_LINKS_SUBSCRIPTION {
  newLink {
    id
    url
    description
    votes {
      id
      user {
        id
      }
    }
    postedBy {
      id
      name
    }
  }
}
    `;

/**
 * __useNew_Links_SubscriptionSubscription__
 *
 * To run a query within a React component, call `useNew_Links_SubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNew_Links_SubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNew_Links_SubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNew_Links_SubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<New_Links_SubscriptionSubscription, New_Links_SubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<New_Links_SubscriptionSubscription, New_Links_SubscriptionSubscriptionVariables>(New_Links_SubscriptionDocument, options);
      }
export type New_Links_SubscriptionSubscriptionHookResult = ReturnType<typeof useNew_Links_SubscriptionSubscription>;
export type New_Links_SubscriptionSubscriptionResult = Apollo.SubscriptionResult<New_Links_SubscriptionSubscription>;
export const SignupMutationDocument = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
    `;
export type SignupMutationMutationFn = Apollo.MutationFunction<SignupMutationMutation, SignupMutationMutationVariables>;

/**
 * __useSignupMutationMutation__
 *
 * To run a mutation, you first call `useSignupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutationMutation, { data, loading, error }] = useSignupMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutationMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutationMutation, SignupMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutationMutation, SignupMutationMutationVariables>(SignupMutationDocument, options);
      }
export type SignupMutationMutationHookResult = ReturnType<typeof useSignupMutationMutation>;
export type SignupMutationMutationResult = Apollo.MutationResult<SignupMutationMutation>;
export type SignupMutationMutationOptions = Apollo.BaseMutationOptions<SignupMutationMutation, SignupMutationMutationVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, options);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;