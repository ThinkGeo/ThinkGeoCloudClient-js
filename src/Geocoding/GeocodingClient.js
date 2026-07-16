import BaseClient from "../Advanced/BaseClient";

class GeocodingClient extends BaseClient {
    constructor(apiKey) {
        super(apiKey);
    }

    search(options, callback) {
        let opts = options || {};
        let location = opts['location'];
        let body = opts['body'];
        if (location != undefined) {
            this.searchByPoint(location, callback, opts);
        }
        else if (body != undefined) {
            this.searchBatch(opts, callback);
        }
    }

    searchByPoint(location, callback, options) {
        if (location === undefined || location === null || location === '') {
            throw new Error("Missing the required parameter 'searchText' when calling searchByPoint");
        }

        let opts = options || {};

        let path = '/api/v3/location/geocode/{searchText}';
        let httpMethod = 'GET';
        let pathParams = {
            'searchText': location
        };
        let queryParams = {
            'Autocomplete': opts['autocomplete'],
            'CountryCodes': opts['countryCodes'],
            'Language': opts['language'],
            'BoundingBox': opts['boundingBox'],
            'Srid': opts['srid'],
            'MaxResults': opts['maxResults'],
            'OutputFormat': opts['outputFormat'],
        };
        let bodyParam = null;
        let contentTypes = [];
        let returnType = 'json';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }

    searchBatch(options, callback) {
        let opts = options || {};

        let path = '/api/v3/location/multi-geocode';
        let httpMethod = 'POST';
        let pathParams = {};
        let queryParams = {};
        let bodyParam = JSON.stringify(opts['body']);
        let contentTypes = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
        let returnType = 'json';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }
}

export default GeocodingClient;
