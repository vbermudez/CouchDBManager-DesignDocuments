function(doc) {
	
	if ("car" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description });
	}

	if ("car_device" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.car.id, doc.car.version, 101], value);
		
		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car
			};  
			
			emit([doc.car.id, doc.car.version, 1], value_car);
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
			
			emit([doc.car.id, doc.car.version, 1], value_device);
		}
		
		
		
	}
	
	if ("ut_car" === doc.collection) {
    
		var value = {
			_id: doc._id, 
			position: doc.position
		};
		
		emit([doc.car.id, doc.car.version, 102], value);
		
		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car,
				position: doc.position
			};  
			
			emit([doc.car.id, doc.car.version, 2], value_car);
		}
			
		if (doc.ut)
		{
			var value_ut= {
				_id: doc.ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ut.version,
				ut : doc.ut,
				position: doc.position
			};
			
			emit([doc.car.id, doc.car.version, 2], value_ut);
		}
	}

	if ("bus_car" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.car.id, doc.car.version, 103], value);

		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car
			}; 

			emit([doc.car.id, doc.car.version, 3], value_car);			
		}
		
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
			
			emit([doc.car.id, doc.car.version, 3], value_bus);
		}
		
	}  	

}