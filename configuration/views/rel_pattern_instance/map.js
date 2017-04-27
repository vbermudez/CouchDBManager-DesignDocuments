function(doc) {
    if (doc.collection == "pattern_instance") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.bus != null) {
            emit([doc._id, 1], { _id: doc.bus.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.bus.version, address: doc.address, position: doc.position });	
        }

        if (doc.ut != null) {
            emit([doc._id, 3], { _id: doc.ut.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.ut.version, address: doc.address, position: doc.position });
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version, address: doc.address, position: doc.position });
        }

    }
}