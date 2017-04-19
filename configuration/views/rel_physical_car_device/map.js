function(doc) {
    if (doc.collection == "physical_car_device") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.physical_car != null) {
            emit([doc._id, 1], { _id: doc.physical_car.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.physical_car.version });	
        }

        if (doc.physical_device != null) {
            emit([doc._id, 2], { _id: doc.physical_device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.physical_device.version });
        }
    }
}