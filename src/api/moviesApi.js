import {
    serverConfig,
    elasticSearch
} from '../config';
const host = `${serverConfig.ssl ? 'https://' : 'http://'}${serverConfig.host}:${serverConfig.port}`;
const esHost = `${elasticSearch.ssl ? 'https://' : 'http://'}${elasticSearch.host}:${elasticSearch.port}/${elasticSearch.index}/_search/`;
class moviesApi {
    static list(page) {
        return fetch(`${host}/movies?p=${page}`, {
            headers: {
                'Accept': 'application/json'
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => err);
    }
    static get(movieid) {
        return fetch(`${host}/movies/${movieid}`, {
            headers: {
                'Accept': 'application/json'
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => err);
    }
    static search(query) {
        return fetch(`${host}/search?q=${query}`, {
            headers: {
                'Accept': 'application/json'
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => err);
    }
    static esAutoComplete(query) {
        const state = {
            "_source": {
                "includes": ["original_title"]
            },
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["original_title", "overview", "genres", "imdb_id", "production_companies"]
                }
            }
        };
        return fetch(`${esHost}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(state)
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => err);
    }
    static esSearch(query) {
        const state = {
            "_source": {
                "includes": ["original_title", "belongs_to_collection", "release_date"]
            },
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["original_title", "overview", "genres", "imdb_id", "production_companies"]
                }
            }
        };
        return fetch(`${esHost}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(state)
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => err);
    }
}

export default moviesApi;