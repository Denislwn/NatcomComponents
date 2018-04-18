import axios from 'axios';

export class BaseApi {
    baseUrl = 'http://188.225.25.85/api/';

    getUrl(url) {
        return this.baseUrl + url;
    }

    post(url, data) {
        return axios
            .post(this.getUrl(url), data, {
                headers: {'Authorization': 'token ' + this.getToken()}
            });
    }

    get(url) {
        return axios
            .get(this.getUrl(url), {
                headers: {'Authorization': 'token ' + this.getToken()}
            });
    }

    put(url, data) {
        return axios
            .put(this.getUrl(url), data, {
                headers: {'Authorization': 'token ' + this.getToken()}
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }
}