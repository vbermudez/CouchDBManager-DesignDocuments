function(doc) {
	
    if (doc.collection == "system_device") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.system != null) {
            emit([doc._id, 1], { _id: doc.system.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.system.version });
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version });
        }
    }
	
}