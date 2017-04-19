function(newDoc, oldDoc, userCtx, secObj) {
    function required(field, msg) {
        msg = msg || 'Document mal-formed. All Entities must have a ' + field + ' property.';
        
        if (!newDoc[field]) {
            throw({forbidden : msg});
        }
    }

    function has_property(field) {
        return typeof newDoc[field] !== 'undefined'
    }

    function unchanged(field) {
        if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field])) {
            throw({forbidden : "Field can't be changed: " + field});
        }
    }

    function user_is(role) {
        return userCtx.roles.indexOf(role) >= 0;
    }

	var del_collection = [
		"updown_config",
		"monit_config"
	]
	
    if (oldDoc && newDoc._deleted === true && del_collection.indexOf(oldDoc.collection) == -1) {
        if (!user_is('_admin') && !user_is('admins')) {
			msg = 'Collection: ' + oldDoc.collection;
            throw({forbidden: 'Only admins may delete documents.'});
        }
		
		return;
    }
	
	/*
	if (oldDoc[name]=="Commons CouchApp")
	{
		if (!user_is('_admin') && !user_is('admins')) {
            throw({forbidden: 'Only admins may access to design documents.'});
        }
	}
	*/


	//Colleciones a borrar
    if (newDoc._deleted === false)
	{
		required('collection');
		required('name');
	}

    if (newDoc.collection == 'bus') {
        
    }
    // required('description');
}