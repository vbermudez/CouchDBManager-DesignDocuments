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

    function is_locked_by_user() {
        if (!oldDoc) return true;

        var old_locked = typeof oldDoc['locked'] !== 'undefined' ? oldDoc.locked === true : false;
        var old_locked_by = typeof oldDoc['locked_by'] !== 'undefined' ? oldDoc.locked_by : '';
        var new_locked = newDoc && typeof newDoc['locked'] !== 'undefined' ? newDoc.locked === true : false;
        var new_locked_by = newDoc && typeof newDoc['locked_by'] !== 'undefined' ? newDoc.locked_by : '';
        var current_usr = userCtx.name;
        
        if (!old_locked) return true;
        if (new_locked && new_locked_by === old_locked_by) return true;
        if (new_locked && old_locked_by === '') return true;
        if (new_locked && new_locked_by !== old_locked_by) return false;
        if (!new_locked && new_locked_by === old_locked_by) {
            newDoc.locked_by = '';
            return true;
        }
        if (!new_locked && new_locked_by !== old_locked_by) return false;

        return false;
    }

    if (!is_locked_by_user()) {
        // throw({forbidden: 'Destination document is locked.'});
        throw({unauthorized: 'Destination document is locked.'});
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