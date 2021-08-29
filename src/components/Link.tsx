import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import {timeDifferenceForDate} from '../utils'
import { Link as LinkType, FeedLinksDocument } from '../graphql/gen/graphql-client-api';
import React from 'react'
import { gql, useMutation } from '@apollo/client';

type Props = {
  link: LinkType,
  index: number
}

const Link = (props: Props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const VOTE_MUTATION = gql`
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

const [vote] = useMutation(VOTE_MUTATION, {
  variables: {
    linkId: link.id
  },
  update(cache, { data: { vote }}) {
    const { feed } = cache.readQuery({
      query: FeedLinksDocument
    }) as any

    const updatedLinks = feed.links.map((feedLink: any) => {
      if (feedLink.id === link.id) {
        return {
          ...feedLink,
          votes: [...feedLink.votes, vote]
        }
      }
      return feedLink
    })

    cache.writeQuery({
      query: FeedLinksDocument,
      data: {
        feed: {
          links: updatedLinks
        }
      }
    })
  }
}) as any;


  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link
