function(doc) {
    if (doc.collection == "ba_container") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.ba != null) {
            emit([doc._id, 1], { _id: doc.ba.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.ba.version, slot: doc.slot });
        }

        if (doc.distributed_container_ba_part != null) {
            emit([doc._id, 2], { _id: doc.distributed_container_ba_part.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.distributed_container_ba_part.version, slot: doc.slot });
        }
    }
}