function(doc) {
	
	if ("device" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}
  
	if ("bus_device" === doc.collection) {
    
		var value = {
			_id: doc._id,        
			address : doc.address,
			position : doc.position
		};
		
		emit([doc.device.id, doc.device.version, 101], value);	
		
		if (doc.bus)
		{
			var value_bus = {
				_id: doc.bus.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.bus.version,
				bus : doc.bus,
				address : doc.address,
				position : doc.position
			};  
			
			emit([doc.device.id, doc.device.version, 1], value_bus);
		}
		
		if (doc.device)
		{
			var value_device = {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device,
				address : doc.address,
				position : doc.position
			};	
			
			emit([doc.device.id, doc.device.version, 1], value_device);
		}		
		
		if (doc.ba)
		{
			var value_ba = {
				_id: doc.ba.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ba.version,
				ba : doc.ba,
				address : doc.address,
				position : doc.position
			};
			
			emit([doc.device.id, doc.device.version, 1], value_ba);
		}
		
	}
	
	if ("device_container" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			is_source : doc.is_source
		};
		
		emit([doc.device.id, doc.device.version, 102], value);
		
		if (doc.bus)
		{
			var value_bus = {
				_id: doc.bus.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.bus.version,
				bus : doc.bus,
				is_source : doc.is_source
			};  
			
			emit([doc.device.id, doc.device.version, 2], value_bus);
		}
		
		if (doc.device)
		{
			var value_device = {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device,
				is_source : doc.is_source
			};	
			
			emit([doc.device.id, doc.device.version, 2], value_device);
		}		
		
		if (doc.distributed_container)
		{
			var value_distributed_container = {
				_id: doc.distributed_container.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container.version,
				distributed_container : doc.distributed_container,
				is_source : doc.is_source
			};
			
			emit([doc.device.id, doc.device.version, 2], value_distributed_container);
		}

			  
					
	}	
  
	if ("car_device" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.device.id, doc.device.version, 103], value);
		
		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car
			}; 

			emit([doc.device.id, doc.device.version, 3], value_car);			
		}
		
		if (doc.device)
		{
			var value_device = {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device
			};
			
			emit([doc.device.id, doc.device.version, 3], value_device);
		}
		
		
		
		
	}  

	if ("redundantdev_device" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		var value_redundant_device = {
			_id: doc.redundant_device.id,
			rel_id: doc._id, 
			rel_coll: doc.collection,
			version: doc.redundant_device.version,
			redundant_device : doc.redundant_device
		};  
		
		var value_device = {
			_id: doc.device.id,
			rel_id: doc._id, 
			rel_coll: doc.collection,
			version: doc.device.version,
			device : doc.device
		};
		
		emit([doc.device.id, doc.device.version, 104], value);
		emit([doc.device.id, doc.device.version, 4], value_redundant_device);
		emit([doc.device.id, doc.device.version, 4], value_device);
	}  
	
	if ("system_device" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.device.id, doc.device.version, 105], value);
		
		if (doc.system)
		{
			var value_system_device = {
				_id: doc.system.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.system.version,
				system : doc.system
			};  
			
			emit([doc.device.id, doc.device.version, 5], value_system_device);
			
		}
		
		if (doc.device)
		{
			var value_device = {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device
			};
			
			emit([doc.device.id, doc.device.version, 5], value_device);
		
		}
	}  
	
}