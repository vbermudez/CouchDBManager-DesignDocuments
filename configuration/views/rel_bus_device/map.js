function(doc) {
    if (doc.collection == "bus_device") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.bus != null) {
            emit([doc._id, 1], { _id: doc.bus.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.bus.version, address: doc.address, position: doc.position });	
        }

        if (doc.device != null) {
            emit([doc._id, 2], { _id: doc.device.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.device.version, address: doc.address, position: doc.position });
        }

        if (doc.ba != null) {
            emit([doc._id, 3], { _id: doc.ba.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.ba.version, address: doc.address, position: doc.position });
        }
    }
}