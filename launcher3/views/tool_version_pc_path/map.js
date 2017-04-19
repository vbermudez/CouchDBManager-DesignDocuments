function(doc) {
  if ("tool_version_pc_path" == doc.collection) {
    emit([doc._id, 0], doc);
  }
}