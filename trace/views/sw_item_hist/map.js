function(doc) {
  if ("sw_item_hist" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name });
  }
}