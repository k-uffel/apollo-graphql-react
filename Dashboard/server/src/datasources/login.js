const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { RESTDataSource } = require('apollo-datasource-rest');
const utils = require("../utils/utils");

class Login extends RESTDataSource{
    constructor() {
        super();
        this.baseURL = 'https://s4h.sap.octavia.de:44300/rest/';
        this.basicAuth = 'init';
    }
    async authenticate({userName, password}) {
        if (this.basicAuth === 'init'){
            this.basicAuth = Buffer.from(userName + ':' + password, 'utf-8' ).toString('base64');
            utils.storeBasicAuth.setAuth( this.basicAuth )
        }

        const res = await fetch(this.baseURL + 'genericapi', {
            auth: 'X',
            headers: {'Authorization': 'Basic ' + this.basicAuth}
        })

        return this.authReducer(res);
    }

    authReducer(auth) {
        return {
            status: auth.status,
            statusText: auth.statusText
        }
    }
}

module.exports = Login;