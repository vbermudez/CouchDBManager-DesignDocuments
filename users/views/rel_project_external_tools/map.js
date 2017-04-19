function(doc) {
	
    if (doc.collection == "project") {
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.project != null) {
            emit([doc._id, 1], { _id: doc.project.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.project.version });
        }

        if (doc.external_tools != null) {
            emit([doc._id, 2], { _id: doc.external_tools.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.external_tools.version });
        }

        if (doc.external_version_tools != null) {
            emit([doc._id, 3], { _id: doc.external_version_tools.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.external_version_tools.version });
        }		
    }
}