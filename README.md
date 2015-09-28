# ng-grid-column-picker
An angular-ui based modal column picker for ng-grid that allows one to hide and show columns

Installation:

Add a reference to ng-grid-column-picker in app.js

```
var app = angular.module('myApp', [..., 'ng-grid-column-picker'])
```


Add an html button to trigger the column picker modal, passing in a reference to your grid options:

```
<button title="hide/show columns" class="btn btn btn-default" column-picker="gridOptions"><i class="glyphicon glyphicon-option-horizontal"></i></button>
```