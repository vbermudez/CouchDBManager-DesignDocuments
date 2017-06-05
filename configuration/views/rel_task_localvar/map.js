function(doc) {
    if (doc.collection == "task_var") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.task != null) {
            emit([doc._id, 1], { _id: doc.task.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.task.version });	
        }

        if (doc.var != null) {
            emit([doc._id, 2], { _id: doc.var.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.var.version });
        }
    }
}