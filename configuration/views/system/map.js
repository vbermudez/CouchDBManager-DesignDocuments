function(doc) {
	if ("system" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}

  	if ("system_device" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.system.id, doc.system.version, 101], value);		
		
		if (doc.system) {
			var value_system = {
				_id: doc.system.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.system.version,
				system : doc.system
			};  

			emit([doc.system.id, doc.system.version, 1], value_system);	
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

			emit([doc.system.id, doc.system.version, 1], value_device);
		}
	}  
}