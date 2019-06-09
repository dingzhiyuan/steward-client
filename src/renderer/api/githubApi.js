import { request_get, request_post, request_put, request_delete, request_post_headers } from '../config/request'

export function doLogin(code) {
    return request_post(
        "https://github.com/login/oauth/access_token",
        {
            code: code,
            client_id: "8a736a73dc49028beb67",
            client_secret: "bad68883caf7e1fd6da21681aad5b753de43da62"
        }
    );
}

export function getAccountInfo(accessToken) {
    return request_get("https://api.github.com/user", {
        access_token: accessToken
    });
}

export function getStarItems(accessToken, endCursor) {
    let cursor = "";
    if (endCursor) {
        cursor = ",after:\"" + endCursor + "\"";
    }
    return request_post_headers(
        {
            Authorization: "bearer " + accessToken,
            "Content-Type": "application/json;charset=UTF-8"
        },
        "https://api.github.com/graphql",
        {
            query:
                '{viewer {starredRepositories(first:100' + cursor + ') {totalCount edges {node {  id  nameWithOwner  description  url  databaseId primaryLanguage {   name } stargazers {   totalCount  }  forkCount  } }pageInfo {  endCursor  hasNextPage}}}}'
        }
    );
}