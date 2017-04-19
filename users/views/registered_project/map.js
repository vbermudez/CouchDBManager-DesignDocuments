function(doc) {
  if ("registered_project" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, db_name: doc.db_name});
  }
}