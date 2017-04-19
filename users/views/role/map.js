function(doc) {
  if ("role" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, name: doc.name, description: doc.description });

    if (doc.organization) {
      emit([doc._id, 1], { _id: doc.organization, organization: doc.organization });
    }
  }
}