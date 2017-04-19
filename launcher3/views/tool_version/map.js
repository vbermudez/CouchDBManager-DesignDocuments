function(doc) {
  if ("tool_version" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name, type: doc.type });
  }
}