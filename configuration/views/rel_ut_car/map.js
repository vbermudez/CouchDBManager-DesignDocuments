function(doc) {

	if (doc.collection == "ut_car") {
		
        emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });	
        
        if (doc.ut != null) {
            emit([doc._id, 1], { _id: doc.ut.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.ut.version, position: doc.position });
        }

        if (doc.car != null) {
            emit([doc._id, 2], { _id: doc.car.id, rel_id: doc._id, rel_coll: doc.collection, version: doc.car.version, position: doc.position });
        }
    }
	
}