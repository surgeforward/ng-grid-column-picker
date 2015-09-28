angular
  .module('ng-grid-column-picker', [])
  .controller('columnPickerController', ['$scope', '$timeout', 'grid', 'columns', function (scope, $timeout, grid, columns) {
      var pickerVm = this;
      pickerVm.columns = columns;
      pickerVm.ok = function () {
          scope.$close();
      };

      pickerVm.setVisibility = function (index, visible) {
          grid.$gridScope.columns[index].toggleVisible();
      };
  }])
  .directive('columnPicker', [
    '$modal',
    function ($modal) {
        return {
            restrict: 'A',
            scope: {
                'columnPicker': '='
            },
            link: function ($scope, $element, $attrs) {
                $scope.grid = $scope.columnPicker;
                $scope.columns = $scope.columnPicker.columnDefs;                

                function open() {
                    var modalInstance = $modal.open({
                        backdrop: true,
                        animation: true,
                        controller: 'columnPickerController',
                        controllerAs: 'pickerVm',
                        resolve: { columns: function () { return $scope.columns; }, grid: function () { return $scope.grid; } },
                        template: '<div class="modal-header"> \
                                        <h3 class="modal-title">Select columns to display</h3> \
                                   </div> \
                                   <div class="modal-body"> \
                                        <div class="row"> \
                                            <div class="col-xs-12"> \
                                                <table class="table table-striped table-bordered"> \
                                                    <tr ng-repeat="c in pickerVm.columns"> \
                                                        <td width="75%"> \
                                                            {{c.displayName}} \
                                                        </td> \
                                                        <td> \
                                                            <div class="btn-group"> \
                                                                <button ng-click="pickerVm.setVisibility($index)" ng-class="c.visible? \'btn-primary\' : \'btn-default\'" class="btn btn-sm" ng-model="c.visible" btn-radio="true">Show</button> \
                                                                <button ng-click="pickerVm.setVisibility($index)" ng-class="c.visible? \'btn-default\' : \'btn-primary\'" class="btn btn-sm" ng-model="c.visible" btn-radio="false">Hide</button> \
                                                            </div> \
                                                        </td> \
                                                    </tr> \
                                                </table> \
                                            </div> \
                                        </div> \
                                    </div> \
                                    <div class="modal-footer"> \
                                        <button class="btn btn-primary" ng-click="pickerVm.ok()">Done</button> \
                                    </div>',
                        size: 'md'
                    });
                }

                $element.bind('click', function (event) {
                    open();
                });
            }
        };
    }
  ]);