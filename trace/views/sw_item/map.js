function(doc) {
  if ("sw_item" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name });
  }
}