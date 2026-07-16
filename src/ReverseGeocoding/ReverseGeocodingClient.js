import BaseClient from "../Advanced/BaseClient";

class ReverseGeocodingClient extends BaseClient {
    constructor(apiKey) {
        super(apiKey);
    }

    search(options, callback) {
        let opts = options || {};

        let pointX = opts['pointX'];
        let pointY = opts['pointY'];
        let body = opts['body'];
        let placeId = opts['placeId'];

        if (pointX != undefined && pointY != undefined) {
            this.searchPlaceByPoint(pointY, pointX, callback, opts);
        }
        else if (body != undefined) {
            this.searchPlaceByPoints(opts, callback);
        }
        else if (placeId != undefined) {
            this.searchPlaceById(placeId, callback, opts);
        }
    }

    searchPlaceByPoint(pointY, pointX, callback, options) {
        let opts = options || {};

        if (pointY === undefined || pointY === null || pointY === '') {
            throw new Error("Missing the required parameter 'pointY' when calling searchPlaceByPoint");
        }
        if (pointX === undefined || pointX === null || pointX === '') {
            throw new Error("Missing the required parameter 'pointX' when calling searchPlaceByPoint");
        }

        let path = '/api/v2/location/reverse-geocode/{pointY},{pointX}';
        let httpMethod = 'GET';
        let pathParams = {
            'pointY': pointY,
            'pointX': pointX
        };
        let queryParams = {
            'Srid': opts['srid'],
            'Proj4String': opts['proj4String'],
            'Lang': opts['lang'],
            'SearchRadius': opts['searchRadius'],
            'SearchRadiusUnit': opts['searchRadiusUnit'],
            'MaxResults': opts['maxResults'],
            'LocationTypes': opts['locationTypes'],
            'VerboseResults': opts['verboseResults'],
            'DistanceFromQueryFeatureUnit': opts['distanceFromQueryFeatureUnit'],
            'DataSources': opts['dataSources'],
        };
        let bodyParam = null;
        let contentTypes = [];
        let returnType = 'json';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }

    searchPlaceByPoints(options, callback) {
        let opts = options || {};

        let path = '/api/v2/location/reverse-geocode/multi';
        let httpMethod = 'POST';
        let pathParams = {};
        let queryParams = {
            'Srid': opts['srid'],
            'Proj4String': opts['proj4String'],
            'Lang': opts['lang'],
            'SearchRadius': opts['searchRadius'],
            'SearchRadiusUnit': opts['searchRadiusUnit'],
            'MaxResults': opts['maxResults'],
            'LocationTypes': opts['locationTypes'],
            'VerboseResults': opts['verboseResults'],
            'DistanceFromQueryFeatureUnit': opts['distanceFromQueryFeatureUnit'],
            'DataSources': opts['dataSources'],
        };
        let bodyParam = JSON.stringify(opts['body']);
        var contentTypes = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
        let returnType = 'json';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }

    searchPlaceById(placeId, callback, options) {
        let opts = options || {};

        if (placeId === undefined || placeId === null || placeId === '') {
            throw new Error("Missing the required parameter 'placeId' when calling searchPlaceById");
        }

        let path = '/api/v2/location/place/{placeId}';
        let httpMethod = 'GET';
        let pathParams = {
            'placeId': placeId
        };
        let queryParams = {
            'lang': opts['lang'],
            'verbose': opts['verbose'],
        };
        let bodyParam = null;
        let contentTypes = [];
        let returnType = 'json';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }
}

export default ReverseGeocodingClient;
