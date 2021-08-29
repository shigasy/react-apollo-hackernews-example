import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { useLoginMutationMutation, useSignupMutationMutation } from '../graphql/gen/graphql-client-api';

const Login = () => {
  const history = useHistory()
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    name: '',
    password: ''
  })

  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(
        email: $email
        password: $password
        name: $name
      ) {
        token
      }
    }
  `

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const [signup] = useSignupMutationMutation({
  variables: {
    name: formState.name,
    email: formState.email,
    password: formState.password
  },
  onCompleted: ({ signup }) => {
    signup?.token && localStorage.setItem(AUTH_TOKEN, signup.token);
    history.push('/');
  }
}) as any

const [login] = useLoginMutationMutation({
  variables: {
    email: formState.email,
    password: formState.password
  },
  onCompleted: ({login}) => {
    login?.token && localStorage.setItem(AUTH_TOKEN, login.token)
    history.push('/')
  }
}) as any

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? () => console.log('') : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  )
}

export default Login
