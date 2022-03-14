const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

class sapAPI {
    constructor({userName: userName, password: password}) {
        this.url = new URL('https://s4h.sap.octavia.de:44300/rest/genericapi');
        this.url.search = new URLSearchParams({auth: 'X'}).toString();
        this.url.username = userName;
        this.url.password = password;
    }

    async buildAPI({payload: payload}) {
        let authResponse = await this.authAtServer();
        if (authResponse.status !== 200) {
            return null;
        }
        let csrfToken = authResponse.headers.get('x-csrf-token');
        let cookies = this.buildCookie(authResponse.headers);

        let pushStructureResponse = await this.pushStructureToSAP({
            csrfToken: csrfToken,
            cookies: cookies,
            payload: payload
        });

        return pushStructureResponse.status === 200 ? {
            status: pushStructureResponse.status,
            data: pushStructureResponse.headers.get('api_id')
        } : {status: pushStructureResponse.status, data: pushStructureResponse.statusText};

    }

    async authAtServer() {
        let response;
        return response = await fetch(this.url, {
            method: 'get',
            headers: {'X-CSRF-Token': 'fetch'},
        });
    }

    async pushStructureToSAP({csrfToken: csrfToken, cookies: cookies, payload: payload}) {
        this.url.search = '';
        let response;
        return response = await fetch(
            this.url, {
                method: 'post',
                headers: {'X-CSRF-Token': csrfToken, 'cookie': cookies, 'content-type': 'application/json'},
                body: JSON.stringify(payload),
            });
    }

    buildCookie(headers) {
        let cookies = headers.raw()['set-cookie'];
        let UserContext = cookies[0].split(';');
        let SessionId = cookies[1].split(';');
        return cookies = UserContext[0] + ';' + SessionId[0];
    }


}

module.exports = sapAPI;