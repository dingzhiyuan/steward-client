import { Request_get, Request_post, Request_put, Request_delete, Request_post_headers } from '../../utils/utils.js'

export function getStarItems(accessToken) {
    return Request_post_headers(
        {
            Authorization: "bearer " + accessToken,
            "Content-Type": "application/json;charset=UTF-8"
        },
        "https://api.github.com/graphql",
        {
            query:
                '{viewer {starredRepositories(first:100) {totalCount edges {node {  id  nameWithOwner  description  url  databaseId primaryLanguage {   name } stargazers {   totalCount  }  forkCount  } }pageInfo {  endCursor  hasNextPage}}}}'
        }
    );
}