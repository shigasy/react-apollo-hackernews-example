import { gql} from "@apollo/client";
import Link from "./Link";
import { FeedLinksDocument, FeedLinksQuery, useFeedLinksQuery, useNew_Links_SubscriptionSubscription } from "./../graphql/gen/graphql-client-api"
gql`
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

const LinkList = () => {
  // const { data, error } = useQuery<FeedLinksQuery>(FEED_QUERY)

  // typescript-react-apollo pluginでhooksができている
  const { data, error, subscribeToMore } = useFeedLinksQuery()

  const NEW_LINKS_SUBSCRIPTION = gql`
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
  `

  useNew_Links_SubscriptionSubscription({
    onSubscriptionData: ({client, subscriptionData}) => {
      const feedRes = client.cache.readQuery<FeedLinksQuery>({
        query: FeedLinksDocument
      })

      const newLink = subscriptionData.data?.newLink
      if (!newLink) {
        return feedRes
      }

      const exists = feedRes?.feed.links.find(({id}) => {
        return id === newLink.id
      })

      if (exists) return feedRes
      if (!feedRes) {
        return
      }
      const newFeed = feedRes?.feed.links.map((item) => item);

      newFeed?.push(newLink);

      return client.cache.writeQuery({
        query: FeedLinksDocument,
        data: {
          feed: newFeed
        }
      })
    }
  })

  // subscribeToMore({
  //   document: NEW_LINKS_SUBSCRIPTION,
  //   updateQuery: (prev: { feed: { links: any[]; }; }, {subscriptionData}) => {
  //     console.log(subscriptionData)
  //     const newLink = subscriptionData.data.newLink
  //     console.log(newLink)
  //     const exists = prev.feed.links.find(({id}) => {
  //       return id === newLink.links
  //     })
  //     return Object.assign({}, {feed: {
  //       links: [newLink],
  //     }
  //   })
  //   }
  // })

  return (
    <div>
      {data && data.feed.links.map((link: any, index: number) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  )
}

export default LinkList
