function(doc) {
	
	if ("project" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description });
	}

  	if ("project_ut" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.project.id, doc.project.version, 101], value);
		
		if (doc.project)
		{
			var value_project_ut = {
				_id: doc.project.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.project.version,
				project : doc.project
			};  
			
			emit([doc.project.id, doc.project.version, 1], value_project_ut);
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
			
			emit([doc.project.id, doc.project.version, 1], value_ut);
		}
		
	}	

	if ("project_external_tools" === doc.collection) {
	  
		var value = {
			_id: doc._id
		};
		
		emit([doc.project.id, doc.project.version, 102], value);
		
		if (doc.external_tools)
		{
			var value_external_tools= {
				_id: doc.external_tools.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.external_tools.version,
				external_tools : doc.external_tools
			};
			
			emit([doc.project.id, doc.project.version, 2], value_external_tools);
		}
		
		if (doc.external_version_tools)
		{
			var value_external_version_tools= {
				_id: doc.external_version_tools.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.external_version_tools.version,
				external_version_tools : doc.external_version_tools
			};
			
			emit([doc.project.id, doc.project.version, 2], value_external_version_tools);
		}
		
		if (doc.project)
		{
			var value_project= {
				_id: doc.project.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.project.version,
				project : doc.project
			};
			
			emit([doc.project.id, doc.project.version, 2], value_project);
		}

  }

	if ("user_project_role" === doc.collection) {
		
		var value = {
			_id: doc._id
		};
		
		emit([doc.project.id, doc.project.version, 103], value);
		
		if (doc.user)
		{
			var value_user= {
				_id: doc.user.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.user.version,
				user : doc.user
			};
			
			emit([doc.project.id, doc.project.version, 3], value_user);
		}
		
		if (doc.role)
		{
			var value_role= {
				_id: doc.role.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.role.version,
				role : doc.role
			};
			
			emit([doc.project.id, doc.project.version, 3], value_role);
		}	
		
		if (doc.project)
		{
			var value_project= {
				_id: doc.project.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.project.version,
				project : doc.project
			};
			
			emit([doc.project.id, doc.project.version, 2], value_project);
		}
	}
}