function(doc) {
    if (doc.collection == "car_device") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.car != null) {
            emit([doc._id, 1], { _id: doc.car.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.car.version });	
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version });
        }
    }
}