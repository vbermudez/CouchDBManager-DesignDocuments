function(doc) {
  if ("user" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, username: doc.username, firstname: doc.firstname, lastname: doc.lastname, email: doc.email });
    emit([doc._id, 1], { _id: doc.role, role: doc.role });
    emit([doc._id, 2], { _id: doc.organization, organization: doc.organization });
  }
}