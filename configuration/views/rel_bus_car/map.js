function(doc) {
    if (doc.collection == "bus_car") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.car != null) {
            emit([doc._id, 1], { _id: doc.car.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.car.version });	
        }

        if (doc.bus != null) {
            emit([doc._id, 2], { _id: doc.bus.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.bus.version });
        }
    }
}