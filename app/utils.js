'use strict';
var apiBase = 'http://api.seriedb.com/';
var apiPath = {
    search: 'search/movie/:query/en/:page/all.js'
};

function buildURL(path, regex) {
    if (regex) {
        var finalUrl = apiPath[path];
        angular.forEach(regex, function(param, key){
            var regExp = new RegExp(':'+key);
            finalUrl = finalUrl.replace(regExp, param);
        });
        return apiBase + finalUrl;
    }
    return apiBase + apiPath[path];
}

function tmpData($rootScope) {
    var tmpDataObject = {};
    $rootScope.tmpData = function (method, key, value) {
        switch (method) {
            case 'add' :
                tmpDataObject[key] = value;
                break;
            case 'remove' :
                delete tmpDataObject[key];
                break;
            case 'get' :
                return tmpDataObject[key];
        }
    };
}