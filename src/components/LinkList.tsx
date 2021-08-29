import { gql} from "@apollo/client";
import Link from "./Link";
import { useFeedLinksQuery } from "./../graphql/gen/graphql-client-api"
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
  const { data, error } = useFeedLinksQuery()

  return (
    <div>
      {data && data.feed.links.map((link: any, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  )
}

export default LinkList
