
Kothic.utils = {
    transformPoint: function (point, ws, hs) {
        return [ws * point[0], hs * point[1]];
    },

    transformPoints: function (points, ws, hs) {
        var transformed = [], i;
        for (i = 0, len = points.length; i < len; i++) {
            transformed.push(this.transformPoint(points[i], ws, hs));
        }
        return transformed;
    },

    getReprPoint: function (feature) {
        var point, len;
        switch (feature.type) {
            case 'Point':
                point = feature.coordinates;
                break;
            case 'Polygon':
                point = feature.reprpoint;
                break;
            case 'LineString':
                len = Kothic.geomops.getPolyLength(feature.coordinates);
                point = Kothic.geomops.getAngleAndCoordsAtLength(feature.coordinates, len / 2, 0);
                point = [point[1], point[2]];
                break;
            case 'GeometryCollection':
                //TODO: Disassemble geometry collection
                return;
            case 'MultiPoint':
                //TODO: Disassemble multi point
                return;
            case 'MultiPolygon':
                point = feature.reprpoint;
                break;
            case 'MultiLineString':
                //TODO: Disassemble geometry collection
                return;
        }
        return point;
    }
};

