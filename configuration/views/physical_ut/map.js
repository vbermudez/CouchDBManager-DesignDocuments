function(doc) {

	if ("physical_ut" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description });
	}

  	if ("physical_ut_car" === doc.collection) {
    
		var value = {
			_id: doc._id, 
			position: doc.position
		};
		
		emit([doc.physical_ut.id, doc.physical_ut.version, 101], value);
		
		if (doc.physical_car)
		{
			var value_ph_car = {
				_id: doc.physical_car.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.physical_car.version,
				physical_car : doc.physical_car,
				position: doc.position
			};  
			
			emit([doc.physical_ut.id, doc.physical_ut.version, 1], value_ph_car);
		}
			
		if (doc.physical_ut)
		{
			var value_ph_ut= {
				_id: doc.physical_ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.physical_ut.version,
				physical_ut : doc.physical_ut,
				position: doc.position
			};	

			emit([doc.physical_ut.id, doc.physical_ut.version, 1], value_ph_ut);
		}


	}	
	
  	if ("project_physical_ut" === doc.collection) {
    
		var value = {
			_id: doc._id, 
			position: doc.position
		};
		
		emit([doc.physical_ut.id, doc.physical_ut.version, 102], value);
			
		if (doc.project)
		{			
			var value_project = {
				_id: doc.project.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.project.version,
				project : doc.project,
				position: doc.position
			}; 
			
			emit([doc.physical_ut.id, doc.physical_ut.version, 2], value_project);
		}			
		
		if (doc.physical_ut)
		{
			var value_ph_ut= {
				_id: doc.physical_ut.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.physical_ut.version,
				physical_ut : doc.physical_ut,
				position: doc.position
			};	

			emit([doc.physical_ut.id, doc.physical_ut.version, 2], value_ph_ut);
		}
		


	}		
	

}