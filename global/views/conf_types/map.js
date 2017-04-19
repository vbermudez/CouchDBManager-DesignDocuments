function(doc) {
	
	if ("conf_types" === doc.collection) {
		emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });
		
		if (doc.system_types) {
		  for (var i in doc.system_types) {
			var system_type = doc.system_types[i];
			emit([doc._id, 1], { name: system_type.name, description: system_type.description});
		  }
		}
		
		if (doc.bus_types) {
		  for (var i in doc.bus_types) {
			var bus_type = doc.bus_types[i];
			emit([doc._id, 2], { name: bus_type.name, description: bus_type.description});
		  }
		}
	}
}