function(doc) {
    if (doc.collection == "container_variable") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.container != null) {
            emit([doc._id, 1], { _id: doc.container.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.container.version, offset: doc.offset });	
        }

        if (doc.variable != null) {
            emit([doc._id, 2], { _id: doc.variable.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.variable.version, offset: doc.offset });
        }
    }
}