function(doc) {
  if ("project_lc_info" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name });
  }
}