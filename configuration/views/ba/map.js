function(doc) {
	if ("ba" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}

	if ("ba_container" === doc.collection) {
	  
		var value = {
			_id: doc._id,
			slot : doc.slot
		};  
	  
		emit([doc.ba.id, doc.ba.version, 101], value);
		
		if (doc.distributed_container_ba_part)
		{
			var value_distributed_container_ba_part = {
				_id: doc.ba.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container_ba_part.version,
				distributed_container_ba_part : doc.distributed_container_ba_part,
				slot : doc.slot
			};  
			
			emit([doc.ba.id, doc.ba.version, 1], value_distributed_container_ba_part);
		}
		
		if (doc.ba)
		{
			var value_ba = {
				_id: doc.ba.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ba.version,
				ba : doc.ba,
				slot : doc.slot
			};  
			
			emit([doc.ba.id, doc.ba.version, 1], value_ba);
		}		
	}

	if ("bus_device" === doc.collection) {

		var value = {
			_id: doc._id,        
			address : doc.address,
			position : doc.position
		};
		
		emit([doc.ba.id, doc.ba.version, 102], value);	

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
			
			emit([doc.ba.id, doc.ba.version, 2], value_bus);
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
			
			emit([doc.ba.id, doc.ba.version, 2], value_device);	  
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
			
			emit([doc.ba.id, doc.ba.version, 2], value_ba);	
		}		
  }
}