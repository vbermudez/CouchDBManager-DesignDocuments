function(doc) {
  if ("connection" === doc.collection) {
    emit([doc._id, doc.version, 0], { _id: doc._id, name:doc.name, description: doc.description });
  }
  
  if ("physical_device_connection" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.connection.id, doc.connection.version, 101], value);
				
		if (doc.connection)
		{			
			var value_conn = {
				_id: doc.connection.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.connection.version,
				connection : doc.connection
			};  

			emit([doc.connection.id, doc.connection.version, 1], value_conn);	
		}
		
		if (doc.physical_device)
		{			
			var value_ph_device = {
				_id: doc.physical_device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.physical_device.version,
				physical_device : doc.physical_device
			};
			
			emit([doc.connection.id, doc.connection.version, 1], value_ph_device);
		}
	}	
}