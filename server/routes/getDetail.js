export default function (server) {

	const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');	

	server.route({
		path: '/api/es-status-sao/index/{name}',
		method: 'GET',
		handler(req, reply) {
			// console.log(req.params);
			callWithRequest(req, 'cluster.state', {
				                metric: 'metadata', 
				                //metric: '_all' 
       	 					// metric: 'metadata,nodes,version,master_node,routing_table,blocks',
        					index: req.params.name
      					}).then(function (response) {
        			reply(
					response.metadata.indices[req.params.name]
					// response
					// req.parms
				);
      			});
    		}
  	});
}	
