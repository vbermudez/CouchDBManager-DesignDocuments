function(doc) {
  if ("ut_daily_sw_status" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name });
  }
}