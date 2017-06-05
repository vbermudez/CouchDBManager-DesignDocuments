function(doc) {
    if (doc.collection == "task_parameter") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.task != null) {
            emit([doc._id, 1], { _id: doc.task.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.task.version });	
        }

        if (doc.parameter != null) {
            emit([doc._id, 2], { _id: doc.parameter.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.parameter.version });
        }
    }
}