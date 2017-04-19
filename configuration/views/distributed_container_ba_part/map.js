function(doc) {

	if ("distributed_container_ba_part" === doc.collection) {
		emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, description: doc.description, type: doc.type });
	}
	
	if ("ba_container" === doc.collection) {
	  
		var value = {
			_id: doc._id,
			slot : doc.slot
		};  
	  
		emit([doc.distributed_container_ba_part.id, doc.distributed_container_ba_part.version, 101], value);
		
		if (doc.distributed_container_ba_part)
		{
			var value_distributed_container_ba_part = {
				_id: doc.ba.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.distributed_container_ba_part.version,
				distributed_container_ba_part : doc.distributed_container_ba_part,
				slot : doc.slot
			};  
			
			emit([doc.distributed_container_ba_part.id, doc.distributed_container_ba_part.version, 1], value_distributed_container_ba_part);
		}
		
		if (doc.ba)
		{
			var value_ba = {
				_id: doc.ba.id,
				rel_id: doc._id, 
				rel_coll: doc.collection,
				version: doc.ba.version,
				ba : doc.ba,
				slot : doc.slot
			};  
			
			emit([doc.distributed_container_ba_part.id, doc.distributed_container_ba_part.version, 1], value_ba);
		}		
	}

	
}