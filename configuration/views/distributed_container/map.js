function(doc) {
	if ("distributed_container" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}

	if ("container_variable" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			offset: doc.offset
		};		
		
		emit([doc.distributed_container.id, doc.distributed_container.version, 101], value);
		
		if (doc.variable)
		{
			var value_variable = {
				_id: doc.variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.variable.version,
				variable : doc.variable,
				offset: doc.offset
			};		
			
			emit([doc.distributed_container.id, doc.distributed_container.version, 1], value_variable);
		}
		
		if (doc.distributed_container)
		{			
			var value_distributed_container = {
				_id: doc.distributed_container.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container.version,
				distributed_container : doc.distributed_container,
				offset: doc.offset
			};		  
				  
			emit([doc.distributed_container.id, doc.distributed_container.version, 1], value_distributed_container);		
		}			
	}	
    
  	if ("device_container" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			is_source: doc.is_source
		};
		
		emit([doc.distributed_container.id, doc.distributed_container.version, 102], value);
		
		if (doc.bus)
		{
			var value_bus = {
				_id: doc.bus.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.bus.version,
				bus : doc.bus,
				is_source: doc.is_source
			};  
				  
			emit([doc.distributed_container.id, doc.distributed_container.version, 2], value_bus);
		}			
			
		if (doc.device)
		{
			var value_device = {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device,
				is_source: doc.is_source
			};			
			  
			emit([doc.distributed_container.id, doc.distributed_container.version, 2], value_device);	
		}
		
		if (doc.distributed_container)
		{
			var value_distributed_container = {
				_id: doc.distributed_container.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container.version,
				distributed_container : doc.distributed_container,
				is_source: doc.is_source
			};
			  
			emit([doc.distributed_container.id, doc.distributed_container.version, 2], value_distributed_container);	
		}			
	}	

}