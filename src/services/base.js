import axios from 'axios';

export class BaseApi {
    baseUrl = 'http://188.225.25.85/api/';
    headers = {'Authorization': 'token ' + this.getToken()};

    getUrl(url) {
        return this.baseUrl + url;
    }

    post(url, data) {
        return axios
            .post(this.getUrl(url), data, {
                headers: this.headers
            });
    }

    get(url) {
        return axios
            .get(this.getUrl(url), {
                headers: this.headers
            });
    }

    put(url, data) {
        return axios
            .put(this.getUrl(url), data, {
                headers: this.headers
            });
    }

    delete(url) {
        return axios
            .delete(this.getUrl(url), {
                headers: this.headers
            });
    }

    getToken() {
        return localStorage.getItem('token');
    }
}