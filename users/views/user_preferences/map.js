function(doc) {
  if ("user_preferences" == doc.collection) {
    emit([doc._id, 0], { _id: doc._id, language_code: doc.language_code });
    emit([doc._id, 1], { _id: doc.user.id, user: doc.user.id });
  }
}