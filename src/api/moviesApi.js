import {
    serverConfig
} from '../config';
const host = `${serverConfig.ssl?'https://':'http://'}${serverConfig.host}:${serverConfig.port}`;

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
}

export default moviesApi;