function(doc) {
  if ("tool" === doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });
  }
}