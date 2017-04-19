function(doc) {
  if ("monit_config" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name, type: doc.type });
    
    if (doc.variables) {
      for (var i in doc.variables) {
        var variable = doc.variables[i];

        if (variable.id && variable.version) {
          emit([doc._id, 1], { _id: variable.id, variable: { id: variable.id, version: variable.version } });
        }
      }
    }
  }
}