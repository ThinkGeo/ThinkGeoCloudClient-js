import Eventable from './Eventable';
import Util from '../shared/Util';
import AccessToken from '../shared/AccessToken';

class BaseClient extends Eventable {
    constructor(opt_options) {
        const options = opt_options ? opt_options : ({});
        if (new.target === BaseClient) {
            throw new Error("BaseClient is an abstract class, so cannot instantiated.");
        }
        super();

        this.baseUrls = options["urls"];
        this.baseUrlIndex = -1;
        this.authNames = [];
        this.authentications = {
            'API Key': {
                type: 'apiKey',
                in: 'query',
                name: 'ApiKey',
                // apiKey:
            },
            'Client Credentials': {
                type: 'oauth2',
                // clientSecret:
                // clientId:
                // accessToken: 
                // 
            }
        };

        if (options["apiKey"]) {
            this.authentications["API Key"]["apiKey"] = options["apiKey"];
            this.authNames.push("API Key");
        }
        else {
            if (options["clientId"] && options["clientSecret"]) {
                this.authentications["Client Credentials"]["clientId"] = options["clientId"];
                this.authentications["Client Credentials"]["clientSecret"] = options["clientSecret"];
                this.authNames.push("Client Credentials");

                // TODO: make sure the token url 
                this.tokenUrl = 'https://cloud.thinkgeo.com/identity/connect/token';

                // TODO:REMOVE
                // this.authentications["Client Credentials"]["accessToken"] = {
                //     "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiZTNiZDczLWViN2QtNDI4MC1hNzg4LTcxMjYyMjZkMGU3YyIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1NDY1MTQ2OTcsImV4cCI6MTU0NjUxODI5NywiaXNzIjoiaHR0cHM6Ly9jbG91ZC50aGlua2dlby5jb20vaWRlbnRpdHkiLCJhdWQiOlsiaHR0cHM6Ly9jbG91ZC50aGlua2dlby5jb20vaWRlbnRpdHkvcmVzb3VyY2VzIiwiVGhpbmtHZW9DbG91ZEFQSXMiXSwiY2xpZW50X2lkIjoiSEcxdFlBc0FGY1JqSFV3MkI4cXJPdHg5ZTVlTFpWZU5jNko2cnhQVWpvNH4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiYXBpS2V5IjoiSEcxdFlBc0FGY1JqSFV3MkI4cXJPdHg5ZTVlTFpWZU5jNko2cnhQVWpvNH4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkMzM1NjUwLTlkYTQtNDNmNS04YWI5LTAyODE3NDFiMzMzNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJQcm9mZXNzaW9uYWwgU3ViIFRlc3QgQWNjb3VudCIsIlNoYXJlZE1vZGUiOiJJcEFkZHJlc3MiLCJjbGllbnRJZCI6IjBlMzRlMTE5LTlhNDItNDI5Ny04ODMxLTI5YTllNTFiZjg1NSIsImNsaWVudE5hbWUiOiJTYW1wbGUgTmF0aXZlIENsaWVudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjliZWI5MjQ1LTcwODAtNGRhMy1hZDM0LWIzZmYxNzk5YzFjYiIsIklwQWRkcmVzcyI6IiouKi4qLioiLCJzY29wZSI6WyJUaGlua0dlb0Nsb3VkQVBJcyJdfQ.hj5CYv6XfmlwFqjh623Bgp-2-mxWFSoJum6RyvfkZgsZLdgv39xv6Sl5LJj4rwX9IuGxMo1kzV_JJbLKOMQ9FRHUbUMmE38mCutYX_n2Q1EZrbYBINDpF8iowMvkCoAYO67bdM4sjfE7HbhhcwPOEzIkLWlhKz-SF0mExYbItK1TwvTKBJSJm8TLfxQhPpMS1NoVx0T4x32zPjHP5Lj0R7OAZfl6HLCemIvsp_drAki-BmTPIl0dTjpy1FUTCQWvafTyHU6fvRPF_4Gdc7wJj0BW0zA9Eg0crJQ-t3_F4U8insBZXzK1mtEnoNDr0vluYGSwWVHlZImihivGrQk9OA",
                //     "expires_in": 3600,
                //     "token_type": "Bearer"
                // }

                // TODO:REMOVE for testing we are hoad code the token.
                let tokenInfo = {
                    accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiZTNiZDczLWViN2QtNDI4MC1hNzg4LTcxMjYyMjZkMGU3YyIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1NDY4Mjc5NTMsImV4cCI6MTU0NjgzMTU1MywiaXNzIjoiaHR0cHM6Ly9jbG91ZC50aGlua2dlby5jb20vaWRlbnRpdHkiLCJhdWQiOlsiaHR0cHM6Ly9jbG91ZC50aGlua2dlby5jb20vaWRlbnRpdHkvcmVzb3VyY2VzIiwiVGhpbmtHZW9DbG91ZEFQSXMiXSwiY2xpZW50X2lkIjoiSEcxdFlBc0FGY1JqSFV3MkI4cXJPdHg5ZTVlTFpWZU5jNko2cnhQVWpvNH4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiYXBpS2V5IjoiSEcxdFlBc0FGY1JqSFV3MkI4cXJPdHg5ZTVlTFpWZU5jNko2cnhQVWpvNH4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkMzM1NjUwLTlkYTQtNDNmNS04YWI5LTAyODE3NDFiMzMzNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJQcm9mZXNzaW9uYWwgU3ViIFRlc3QgQWNjb3VudCIsIlNoYXJlZE1vZGUiOiJJcEFkZHJlc3MiLCJjbGllbnRJZCI6IjBlMzRlMTE5LTlhNDItNDI5Ny04ODMxLTI5YTllNTFiZjg1NSIsImNsaWVudE5hbWUiOiJTYW1wbGUgTmF0aXZlIENsaWVudCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjliZWI5MjQ1LTcwODAtNGRhMy1hZDM0LWIzZmYxNzk5YzFjYiIsIklwQWRkcmVzcyI6IiouKi4qLioiLCJzY29wZSI6WyJUaGlua0dlb0Nsb3VkQVBJcyJdfQ.d-q8PPleUTevIVbzUZk9TrzTF2PDMpv35I2vSxC2GHDhMW-tFn2L8btcAnrDkKsHvJUukjpqcuMQACD21P3QbmVYVpF1WLYTrkHahKT3YlhAmwnx_VT54qbQyxMvbMwMBSNu0egp-2JPrbFiEtu2X4JLrRVH4zU9DG-_8xK0maH3aZ6iBIS2mLq7hAeGlsf35pg7FZWmKrEK3FYAqiYyxiNFWDyfMADXt-APM8dtyBmOyQaSl5YARllNI3xEQ79dk5zCPjoFZKPLKzy0F15C3sC-pqGcIHkzeOWBv1sc10bacr_unR6BuVbY1x3ILuWXgefAAfZOMXLgSp7KrfC3sw",
                    tokenType: "Bearer",
                    expiresTime: Date.now() + 3600000
                }
                let testAccessToken = new AccessToken(tokenInfo.accessToken, tokenInfo.tokenType, tokenInfo.expiresTime)
                Util.setAccessTokenToLocalStorage(testAccessToken);
            }
        }
    }

    GetNextCandidateBaseUri() {
        return this.GetNextCandidateBaseUriCore();
    }

    GetNextCandidateBaseUriCore() {
        this.baseUrlIndex++;
        let baseUrlsLength = this.baseUrls.length;
        if (this.baseUrlIndex > baseUrlsLength - 1) {
            this.baseUrlIndex = 0;
        }
        return this.baseUrls[this.baseUrlIndex];
    }

    callApi(path, httpMethod, pathParams, queryParams, bodyParam, authNames, contentTypes, returnType, callback) {
        let params = {
            queryObj: queryParams,
            setHeaderObj: {
                "Content-type": contentTypes
            }
        }
        let applyAuthNames = authNames === undefined ? this.authNames : authNames;

        let xhr = new XMLHttpRequest();

        params = this.applyAuthToRequest(applyAuthNames, params);

        let url = this.buildUrl(path, pathParams, params.queryObj);

        xhr.open(httpMethod, url, true);

        this.setHeader(xhr, params.setHeaderObj);

        if (returnType) {
            if (returnType.toLowerCase() === 'blob') {
                xhr.responseType = "blob";
            } else if (returnType.toLowerCase() === 'arrayBuffer') {
                xhr.responseType = "arrayBuffer";
            } else if (returnType.toLowerCase() === 'json') {
                xhr.responseType = "json";
            }
        }

        let sendingWebRequestObj = {
            type: "sendingWebRequest",
            xhr: xhr,
            cancel: false
        };

        this.fire(sendingWebRequestObj);

        if (!sendingWebRequestObj.cancel) {
            if (callback) {
                sendingWebRequestObj.xhr.onload = (event) => {
                    if (callback) {
                        callback(xhr.status, xhr.response);
                    }
                }
                sendingWebRequestObj.xhr.onerror = (error) => {
                    if (callback) {
                        callback("error", error.type);
                    }
                }
            }

            if (bodyParam) {
                sendingWebRequestObj.xhr.send(bodyParam);
            } else {
                sendingWebRequestObj.xhr.send();
            }
        }
    }

    setHeader(xhr, setHeaderObj) {
        Object.keys(setHeaderObj).forEach(function (key) {
            xhr.setRequestHeader(key, setHeaderObj[key]);
        });
    }

    buildUrl(path, pathParams, queryParams) {
        if (!path.match(/^\//)) {
            path = '/' + path;
        }
        let url = this.GetNextCandidateBaseUri() + path;
        url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
            let value;
            if (pathParams.hasOwnProperty(key)) {
                value = this.paramToString(pathParams[key]);
            } else {
                value = fullMatch;
            }
            return encodeURIComponent(value);
        });

        let queryString = '';
        let keysArr = Object.keys(queryParams);
        keysArr.forEach((key) => {
            if (queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== '') {
                if (queryString === '') {
                    queryString += `?${key}=${queryParams[key]}`
                } else {
                    queryString += `&${key}=${queryParams[key]}`
                }
            }
        });
        url += queryString;
        return url;
    }

    paramToString(param) {
        if (param === undefined || param === null) {
            return '';
        }
        if (param instanceof Date) {
            return param.toJSON();
        }
        return param.toString();
    }

    getAccessToken() {
        let accessToken = new AccessToken();
        Util.getAccessTokenFromLocalStorage(accessToken);
        if (accessToken) {
            var now = Date.now();
            var expiresTime = accessToken.expiresTime;

            // expiresTime buffer is 3000 millis
            if (now > expiresTime - 3000) {
                accessToken = undefined;
            }
        }

        if (!accessToken) {
            accessToken = this.requestAccessToken();
            if (accessToken) {
                Util.setAccessTokenToLocalStorage(accessToken);
            }
        }
        return accessToken;
    }

    requestAccessToken() {
        let requestTokenTime = Date.now();
        let accessTokenObject = undefined;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.tokenUrl, false);
        xhr.setRequestHeader(
            'X-Custom-Header', 'value');
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let accessToken = JSON.stringify(xhr.response.access_token);
                accessTokenObject = new AccessToken(accessToken.accessToken, accessToken.tokenType, requestTokenTime + (accessToken.expires_in * 1000));
            }
        };
        let body = 'client_id=' + this.authentications["Client Credentials"].clientId + '&client_secret=' + this.authentications["Client Credentials"].clientSecret + '&grant_type=client_credentials';

        let GettingAccessTokenObj = {
            type: "GettingAccessTokenObj",
            xhr: xhr,
            cancel: false
        };
        this.fire(GettingAccessTokenObj);

        xhr.send(body);


        return accessTokenObject;
    }

    applyAuthToRequest(authNames, params) {
        authNames.forEach((authName) => {
            let auth = this.authentications[authName];
            switch (auth.type) {
                case 'basic':
                    if (auth.username || auth.password) {
                        let username = auth.username || '';
                        let password = auth.password || '';
                        params.setHeaderObj['Authorization'] = "Basic " + btoa(`${username}:${password}`);
                    }
                    break;
                case 'apiKey':
                    if (auth.apiKey) {
                        let data = {};
                        if (auth.apiKeyPrefix) {
                            data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
                        } else {
                            data[auth.name] = auth.apiKey;
                        }
                        if (auth['in'] === 'header') {
                            params.setHeaderObj['X-API-Key'] = data[auth.name]; //data[auth.name] -> apiKey
                        } else { //apiKey in query
                            params.queryObj['apikey'] = data[auth.name];
                        }
                    }
                    break;
                case 'oauth2':
                    let accessToken = this.getAccessToken();
                    if (accessToken) {
                        params.setHeaderObj['Authorization'] = accessToken["tokenType"] + ' ' + accessToken["accessToken"];
                    } else {
                        params.setHeaderObj['Authorization'] = accessToken["tokenType"] + ' ' + accessToken["accessToken"];
                    }
                    break;
                default:
                    throw new Error('Unknown authentication type: ' + auth.type);
            }
        });

        return params
    }

    formatResponse(response) {
        return this.formatResponseCore(response);
    }

    formatResponseCore(response) {
        return response;
    }

    disposeCore() {
    }
}

export default BaseClient;