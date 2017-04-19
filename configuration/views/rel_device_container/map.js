function(doc) {
	
	if (doc.collection == "device_container") {
		
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.distributed_container != null) {
            emit([doc._id, 1], { _id: doc.distributed_container.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.distributed_container.version, is_source: doc.is_source });	
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version, is_source: doc.is_source });
        }
		
		if (doc.bus != null) {
            emit([doc._id, 3], { _id: doc.bus.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.bus.version, is_source: doc.is_source });
        }
    }	
}