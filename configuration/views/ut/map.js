function(doc) {
  if ("ut" === doc.collection) {
    emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description });
  }

  	if ("ut_car" === doc.collection) {
    
		var value = {
			_id: doc._id, 
			position: doc.position
		};
		
		emit([doc.ut.id, doc.ut.version, 101], value);		
		
		if (doc.car)
		{
			var value_car = {
				_id: doc.car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.car.version,
				car : doc.car,
				position: doc.position
			};  

			emit([doc.ut.id, doc.ut.version, 1], value_car);	
		}
			
		if (doc.ut)
		{
			var value_ut= {
				_id: doc.ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ut.version,
				ut : doc.ut,
				position: doc.position
			};

			emit([doc.ut.id, doc.ut.version, 1], value_ut);		
		}
	}	  

	if ("project_ut" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.ut.id, doc.ut.version, 102], value);	

		if (doc.project)
		{
			var value_project_ut = {
				_id: doc.project.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.project.version,
				project : doc.project
			};  

			emit([doc.ut.id, doc.ut.version, 2], value_project_ut);	
		}

		if (doc.ut)
		{
			var value_ut= {
				_id: doc.ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ut.version,
				ut : doc.ut
			};

			emit([doc.ut.id, doc.ut.version, 2], value_ut);
		}
	}	
	
}