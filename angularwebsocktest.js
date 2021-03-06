<script src="http://www.binaryhaven.co.za/mobile/angular.min.js"></script>
  <script src="http://www.binaryhaven.co.za/mobile/angular-websocket.js"></script>
  <section ng-controller="SomeController">
    <ul ng-repeat="data in MyData.collection track by $index" >
      <li> {{ data }} </li>
    </ul>
  </section>
  <script>
    angular.module('YOUR_APP', [
      'ngWebSocket' // you may also use 'angular-websocket' if you prefer
    ])
    //                          WebSocket works as well
    .factory('MyData', function($websocket) {
      // Open a WebSocket connection
      var dataStream = $websocket('ws://website.com/data');

      var collection = [];

      dataStream.onMessage(function(message) {
        collection.push(JSON.parse(message.data));
      });

      var methods = {
        collection: collection,
        get: function() {
          dataStream.send(JSON.stringify({ action: 'get' }));
        }
      };

      return methods;
    })
    .controller('SomeController', function ($scope, MyData) {
      $scope.MyData = MyData;
    });
  </script>