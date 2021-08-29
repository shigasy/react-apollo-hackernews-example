import { gql } from "@apollo/client"
import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import {usePostMutationMutation} from "./../graphql/gen/graphql-client-api"
import { LINKS_PER_PAGE } from '../constants';
import { FeedLinksDocument } from '../graphql/gen/graphql-client-api';
gql`
mutation PostMutation($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    description
    url
  }
}
`

const CreateLink = () => {

  const history = useHistory()

  const [formState, setFormState] = useState({
    url: '',
    description: ''
  })

  const [createLink] = usePostMutationMutation({
    variables: {
      description: formState.description,
      url: formState.url
    },
    update: (cache, { data: { post } }: any) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const data = cache.readQuery({
        query: FeedLinksDocument,
        variables: {
          take,
          skip,
          orderBy
        }
      }) as any;

      cache.writeQuery({
        query: FeedLinksDocument,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
        variables: {
          take,
          skip,
          orderBy
        }
      });
    },
    onCompleted: () => history.push('/new/1')
  })

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        createLink().then(({data, errors}) => {
          console.log(data)
          console.log(errors)
        }).catch((e) => {
          console.log(e)
        })
      }}>
      <div className="flex flex-column mt3">
        <input className="mb2" value={formState.description} onChange={(e) => {
          setFormState({
          ...formState,
          description: e.target.value
        })}} type="text" placeholder="A description for the link" />
        <input className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
      </div>
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateLink
