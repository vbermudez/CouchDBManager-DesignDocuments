function(doc) {
	
    if (doc.collection == "redundantvar_variable") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.variable != null) {
            emit([doc._id, 1], { _id: doc.variable.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.variable.version });
        }

        if (doc.redundant_variable != null) {
            emit([doc._id, 2], { _id: doc.redundant_variable.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.redundant_variable.version });
        }
    }
	
}