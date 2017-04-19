function(doc) {
    if (doc.collection == "user_project_role") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.user != null) {
            emit([doc._id, 1], { _id: doc.user.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.user.version });
        }

        if (doc.project != null) {
            emit([doc._id, 2], { _id: doc.project.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.project.version });
        }
		
		if (doc.role != null) {
            emit([doc._id, 3], { _id: doc.role.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.role.version });
        }
    }
}