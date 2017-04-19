function(doc) {
    if (doc.collection == "checkvar_variable") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.checkvar != null) {
            emit([doc._id, 1], { _id: doc.checkvar.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.checkvar.version, type: doc.type });	
        }

        if (doc.variable != null) {
            emit([doc._id, 2], { _id: doc.variable.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.variable.version, type: doc.type });
        }
    }
}