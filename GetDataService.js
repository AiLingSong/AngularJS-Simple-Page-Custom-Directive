/**
 * GetDataService
 * get data http calls go here
 * @author: Grace Song
 */
function GetDataService($http) {
  this.getData = function() {
    var req = $http({
      method: "GET",
      url: "people.json"
    });

    return req;
  };

}