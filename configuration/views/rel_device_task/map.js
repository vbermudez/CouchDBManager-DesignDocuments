function(doc) {
    if (doc.collection == "device_task") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.task != null) {
            emit([doc._id, 1], { _id: doc.task.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.task.version });	
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version });
        }
    }
}