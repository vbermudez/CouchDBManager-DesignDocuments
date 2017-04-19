function(doc) {
	
    if (doc.collection == "project_physical_ut") {
		
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.project != null) {
            emit([doc._id, 1], { _id: doc.project.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.project.version });
        }

        if (doc.physical_ut != null) {
            emit([doc._id, 2], { _id: doc.physical_ut.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.physical_ut.version });
        }
    }
	
}