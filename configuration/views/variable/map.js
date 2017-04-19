function(doc) {
	
	if ("variable" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, type: doc.type});
	}

  	if ("container_variable" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			offset: doc.offset
		};		

		emit([doc.variable.id, doc.variable.version, 101], value);	  		
		
		if (doc.variable)
		{
			var value_variable = {
				_id: doc.variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.variable.version,
				variable : doc.variable,
				offset: doc.offset
			};			

			emit([doc.variable.id, doc.variable.version, 1], value_variable);	
		}

		if (doc.distributed_container)
		{			
			var value_distributed_container = {
				_id: doc.distributed_container.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container.version,
				distributed_container : doc.distributed_container,
				offset: doc.offset
			};
			  
			emit([doc.variable.id, doc.variable.version, 1], value_distributed_container);	
		}			
	}	
  
  	if ("checkvar_variable" === doc.collection) {
		
		var value = {
			_id: doc._id,        
			type: doc.type
		};		

		emit([doc.variable.id, doc.variable.version, 102], value);	
		
		if (doc.variable)
		{		
			var value_variable = {
				_id: doc.variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.variable.version,
				variable : doc.variable,
				type: doc.type
			};			
			
			emit([doc.variable.id, doc.variable.version, 2], value_variable);	
		}
		
		if (doc.protected_variable)
		{			
			var protected_variable = {
				_id: doc.protected_variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.protected_variable.version,
				protected_variable : doc.protected_variable,
				type: doc.type
			};
		  
			emit([doc.variable.id, doc.variable.version, 2], value_distributed_container);	
		}			
		
	}	
  
  	if ("redundantvar_variable" === doc.collection) {
		
		var value = {
			_id: doc._id
		};		

		emit([doc.variable.id, doc.variable.version, 103], value);	
		
		if (doc.variable)
		{		
			var value_variable = {
				_id: doc.variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.variable.version,
				variable : doc.variable
			};			
	  
			emit([doc.variable.id, doc.variable.version, 3], value_variable);	
		}
		
		if (doc.redundantvar_variable)
		{			
			var value_redundantvar_variable = {
				_id: doc.redundantvar_variable.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.redundantvar_variable.version,
				protected_variable : doc.redundantvar_variable
			}; 
			
			emit([doc.variable.id, doc.variable.version, 3], value_redundantvar_variable);	
		}
					
	}	  
 

}