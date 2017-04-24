function(doc) {
	
	if ("bus" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}

    if ("bus_device" === doc.collection) {

		var value = {
			_id: doc._id,        
			address : doc.address,
			position : doc.position
		};

		emit([doc.bus.id, doc.bus.version, 101], value);	  
		
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
			
			emit([doc.bus.id, doc.bus.version, 1], value_bus);
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
			
			emit([doc.bus.id, doc.bus.version, 1], value_device);	
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
			
			emit([doc.bus.id, doc.bus.version, 1], value_ba);	
		}
			  
		  
		

	}
	
	if ("device_container" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			is_source : doc.is_source
		};

		emit([doc.bus.id, doc.bus.version, 102], value);	
		
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
			
			emit([doc.bus.id, doc.bus.version, 2], value_bus);
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

			emit([doc.bus.id, doc.bus.version, 2], value_device);			
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
			
			emit([doc.bus.id, doc.bus.version, 2], value_distributed_container);
		}		  
	}
	
	if ("bus_car" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.bus.id, doc.bus.version, 103], value);
		
		if (doc.bus)
		{		
			var value_bus = {
				_id: doc.bus.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.bus.version,
				bus : doc.bus
			};  
			
			emit([doc.bus.id, doc.bus.version, 3], value_bus);
		}
		
		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car
			}; 

			emit([doc.bus.id, doc.bus.version, 3], value_car);			
		}
		
	}
	
	if ("bus_ut" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.bus.id, doc.bus.version, 104], value);
		
		if (doc.bus)
		{		
			var value_bus = {
				_id: doc.bus.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.bus.version,
				bus : doc.bus
			};  
			
			emit([doc.bus.id, doc.bus.version, 4], value_bus);
		}
		
		if (doc.ut)
		{
			var value_ut = {
				_id: doc.ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ut.version,
				ut : doc.ut
			}; 

			emit([doc.bus.id, doc.bus.version, 4], value_ut);			
		}		
	}	
}