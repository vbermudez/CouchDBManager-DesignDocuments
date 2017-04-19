function(doc) {
  if ("project_tool_version" == doc.collection) {
    emit([doc._id, 0], doc);
  }
}