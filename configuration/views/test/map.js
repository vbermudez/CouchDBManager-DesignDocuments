function(doc) {
  if ("MyTest" === doc.collection) {
    emit([doc._id, doc.version, 0], { _id: doc._id, name: doc.name, type: doc.type});
  }
}