function(doc) {
	
	if ("task" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description });
	}

	if ("device_task" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.task.id, doc.task.version, 101], value);
		
		if (doc.task)
		{
			var value_task = {
				_id: doc.task.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.task.version,
				task : doc.task
			};  
			
			emit([doc.task.id, doc.task.version, 1], value_task);
		}
			
		if (doc.device)
		{
			var value_device= {
				_id: doc.device.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.device.version,
				device : doc.device
			};
			
			emit([doc.task.id, doc.task.version, 1], value_device);
		}
	}
	

	if ("task_localvar" === doc.collection) {
    
		var value = {
			_id: doc._id
		};
		
		emit([doc.task.id, doc.task.version, 102], value);
		
		if (doc.task)
		{
			var value_task = {
				_id: doc.task.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.task.version,
				task : doc.task
			};  
			
			emit([doc.task.id, doc.task.version, 2], value_task);
		}
			
		if (doc.localvar)
		{
			var value_localvar= {
				_id: doc.localvar.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.localvar.version,
				localvar : doc.localvar
			};
			
			emit([doc.task.id, doc.task.version, 2], value_localvar);
		}
	}

	
	if ("task_parameter" === doc.collection) {
    
		var value_doc = {
			_id: doc._id,
			value: doc.value
		};
		
		emit([doc.task.id, doc.task.version, 103], value_doc);
		
		if (doc.task)
		{
			var value_task = {
				_id: doc.task.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.task.version,
				task : doc.task,
				position: doc.position,
				value : doc.value
			};  
			
			emit([doc.task.id, doc.task.version, 3], value_task);
		}
			
		if (doc.parameter)
		{
			var value_parameter= {
				_id: doc.parameter.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.parameter.version,
				parameter : doc.parameter,
				value : doc.value
			};
			
			emit([doc.task.id, doc.task.version, 3], value_parameter);
		}
	}

	
	if ("task_inputvar" === doc.collection) {
    
		var value = {
			_id: doc._id,
			offset: doc.offset
		};
		
		emit([doc.task.id, doc.task.version, 104], value);
		
		if (doc.task)
		{
			var value_task = {
				_id: doc.task.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.task.version,
				task : doc.task,
				position: doc.position,
				offset : doc.offset
			};  
			
			emit([doc.task.id, doc.task.version, 4], value_task);
		}
			
		if (doc.inputvar)
		{
			var value_inputvar= {
				_id: doc.inputvar.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.inputvar.version,
				inputvar : doc.inputvar,
				offset : doc.offset
			};
			
			emit([doc.task.id, doc.task.version, 4], value_inputvar);
		}
	}
	
	if ("task_outputvar" === doc.collection) {
    
		var value = {
			_id: doc._id,
			offset: doc.offset
		};
		
		emit([doc.task.id, doc.task.version, 105], value);
		
		if (doc.task)
		{
			var value_task = {
				_id: doc.task.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.task.version,
				task : doc.task,
				position: doc.position,
				offset : doc.offset
			};  
			
			emit([doc.task.id, doc.task.version, 5], value_task);
		}
			
		if (doc.outputvar)
		{
			var value_outputvar= {
				_id: doc.outputvar.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.outputvar.version,
				outputvar : doc.outputvar,
				offset : doc.offset
			};
			
			emit([doc.task.id, doc.task.version, 5], value_outputvar);
		}
	}	
	
}