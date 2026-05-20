import BaseClient from "../Advanced/BaseClient";
import RasterMapType from "./RasterMapType";
class MapsClient extends BaseClient {
    constructor(apiKey) {
        super(apiKey);
    }

    getRasterTile(options, callback) {
        let opts = options || {};
        let z = opts['z'];
        let x = opts['x'];
        let y = opts['y'];
        let projection = opts['projection'];
        let mapType = opts['mapType'];
        let tileSize = opts['tileSize'];
        let tileResolution = opts['tileResolution'];

        // verify the required parameter 'style' is set
        if (mapType === undefined || mapType === null || mapType === '') {
            throw new Error("Missing the required parameter 'mapType' when calling getRasterTile");
        }
        else {
            switch (mapType) {
                case RasterMapType.Default:
                    mapType = "light";
                    break;
                case RasterMapType.Light:
                case RasterMapType.Dark:
                case RasterMapType.Hybrid:
                case RasterMapType.Aerial:
                case RasterMapType.Aerial2:
                    break;
                case RasterMapType.TransparentBackground:
                    mapType = "transparent-background";
                    break;
                default:
                    throw new Error("The 'style' didn't match any RasterMapType");
            }
        }

        // verify the required parameter 'resolution' is set
        if (tileResolution === undefined || tileResolution === null || tileResolution === '') {
            throw new Error("Missing the required parameter 'tileResolution' when calling getRasterTile");
        }

        // verify the required parameter 'srid' is set
        if (projection === undefined || projection === null || projection === '') {
            throw new Error("Missing the required parameter 'projection' when calling getRasterTile");
        }

        // verify the required parameter 'tileSize' is set
        if (tileSize === undefined || tileSize === null || tileSize === '') {
            throw new Error("Missing the required parameter 'tileSize' when calling getRasterTile");
        }

        // verify the required parameter 'tileZ' is set
        if (z === undefined || z === null || z === '') {
            throw new Error("Missing the required parameter 'z' when calling getRasterTile");
        }

        // verify the required parameter 'tileX' is set
        if (x === undefined || x === null || x === '') {
            throw new Error("Missing the required parameter 'x' when calling getRasterTile");
        }

        // verify the required parameter 'tileY' is set
        if (y === undefined || y === null || y === '') {
            throw new Error("Missing the required parameter 'y' when calling getRasterTile");
        }

        var fileExtension = "jpeg";
        switch (style) {
            case RasterMapType.Aerial:
            case RasterMapType.Aerial2:
            case RasterMapType.Hybrid:
                fileExtension = "jpeg";
                break;
            case RasterMapType.Light:
            case RasterMapType.Dark:
            case RasterMapType.TransparentBackground:
            default:
                fileExtension = "png";
                break;
        }

        let path = '/api/v1/maps/raster/{style}/x{resolution}/{srid}/{tileSize}/{tileZ}/{tileX}/{tileY}.{fileExtension}';
        let httpMethod = 'GET';
        let pathParams = {
            'style': mapType,
            'resolution': tileResolution,
            'srid': projection,
            'tileSize': tileSize,
            'tileZ': z,
            'tileX': x,
            'tileY': y,
            'fileExtension': fileExtension
        };
        let queryParams = {};
        let bodyParam = {};
        let contentTypes = [];
        let returnType = 'Blob';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }

    getVectorTile(options, callback) {
        let opts = options || {};
        let z = opts['z'];
        let x = opts['x'];
        let y = opts['y'];
        let projection = opts['projection'];

        // verify the required parameter 'srid' is set
        if (projection === undefined || projection === null || projection === '') {
            throw new Error("Missing the required parameter 'projection' when calling getVectorTile");
        }

        // verify the required parameter 'tileZ' is set
        if (z === undefined || z === null || z === '') {
            throw new Error("Missing the required parameter 'z' when calling getVectorTile");
        }

        // verify the required parameter 'tileX' is set
        if (x === undefined || x === null || x === '') {
            throw new Error("Missing the required parameter 'x' when calling getVectorTile");
        }

        // verify the required parameter 'tileY' is set
        if (y === undefined || y === null || y === '') {
            throw new Error("Missing the required parameter 'y' when calling getVectorTile");
        }

        let path = '/api/v1/maps/vector/streets/{srid}/{tileZ}/{tileX}/{tileY}.pbf';
        let httpMethod = 'GET';
        let pathParams = {
            'srid': projection,
            'tileZ': z,
            'tileX': x,
            'tileY': y
        };
        let queryParams = {};
        let bodyParam = {};
        let contentTypes = [];
        let returnType = 'arrayBuffer';

        this.callApi(path, httpMethod, pathParams, queryParams, bodyParam, undefined, contentTypes, returnType, callback);
    }
}

export default MapsClient;