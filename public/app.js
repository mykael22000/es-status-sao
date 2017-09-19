import moment from 'moment';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';

import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template: overviewTemplate,
  controller: 'elasticsearchStatusController',
  controllerAs: 'ctrl'
})
.when('/index/:name', {
  template: detailTemplate,
  controller: 'elasticsearchDetailController',
  controllerAs: 'ctrl'
});

uiModules

.get('app/elasticsearch_status')

.controller('elasticsearchStatusController', function ($http) {
  $http.get('../api/es-status-sao/indices').then((response) => {
    this.indices = response.data;
  });
})

.controller('elasticsearchDetailController', function($routeParams, $http) {
  this.index = $routeParams.name;

	//  Note the funny quotes around the bit that gets substituted.  
	//  THEY ARE REQUIRED - using normal quotes breaks the substitution
    $http.get('../api/es-status-sao/index/' + `${this.index}`).then((response) => {
    this.status = response.data;
  });
});
