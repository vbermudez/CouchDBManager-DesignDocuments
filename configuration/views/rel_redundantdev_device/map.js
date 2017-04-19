function(doc) {
    if (doc.collection == "redundantdev_device") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.device != null) {
            emit([doc._id, 1], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version });
        }

        if (doc.redundant_device != null) {
            emit([doc._id, 2], { _id: doc.redundant_device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.redundant_device.version });
        }
    }
}