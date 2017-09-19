export default function (server) {

	const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');	

	server.route({
		path: '/api/es-status-sao/indices',
		method: 'GET',
		handler(req, reply) {
			callWithRequest(req, 'cluster.state').then(function (response) {
				reply(
          				Object.keys(response.metadata.indices)
        			);
      			});
    		}
  	});
}	
