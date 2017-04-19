var Parser = function() {
    return ({
        name: 'Parser',
        version: '0.0.1',
        
        parse_list: function(getRow, groupRelations, req_query) {
            log('> Parser.parse_list');
            log('# filters: ' + req_query.filters)
            
            // var qs_ignore = [
            //     'format', 'conflicts', 'descending', 'endkey', 'end_key', 'endkey_docid', 'end_key_doc_id', 
            //     'group', 'group_level', 'include_docs', 'attachments', 'att_encoding_info', 'inclusive_end',
            //     'key', 'keys', 'limit', 'reduce', 'skip', 'stale', 'startkey', 'start_key', 'startkey_docid',
            //     'start_key_doc_id', 'update_seq'
            // ];
            var documents = [];
            var relations = [];
            var row = null;
            var filter = false;
            var filters = req_query.filters ? JSON.parse(req_query.filters) : {};
    
            // for (var key in req_query) {
            //     if (req_query.hasOwnProperty(key) && qs_ignore.indexOf(key) == -1) {
            //         filters[key] = req_query[key];
            //     }
            // }
            
            if (Object.keys(filters).length) {
                filter = true;
                
                if (typeof filters['and'] === 'undefined') {
                    filters['and'] = {};
                }
                
                if (typeof filters['or'] === 'undefined') {
                    filters['or'] = {};
                }
            }
            
            while (row = getRow()) {
                var last = documents.length - 1;
                var key = row.key;
                var value = row.value;
                var doc = row.doc;
                var idx = key.length > 2 ? key[2] : key[1];
                
                if (last < 0) {
                    last = 0;
                }
                
                if (idx == 0) {
                    doc['has_relations'] = false;
                    
                    if (filter) {
                        var filter_and_keys = Object.keys(filters.and || {});
                        var filter_or_keys = Object.keys(filters.or || {});
                        var doc_keys = Object.keys(doc);
                        var common_keys = doc_keys.filter(function(k) {
                            return filter_and_keys.indexOf(k) != -1 || filter_or_keys.indexOf(k) != -1;
                        });
                        
                        log('# filter "and" keys: ' + toJSON(filter_and_keys));
                        log('# filter "or" keys: ' + toJSON(filter_or_keys));
                        log('# document keys: ' + toJSON(doc_keys));
                        log('# common keys: ' + toJSON(common_keys));
                        
                        if (common_keys.length) {
                            var found = true;
                            
                            for(var i = 0, len = common_keys.length; i < len; i++) {
                                var key = common_keys[i];
                                var is_and = (typeof filters.and[key] !== 'undefined');
                                var filter_value = is_and ? filters.and[key] : filters.or[key]; 

                                log('# Testing document._id: ' + doc._id);
                                log('# Testing field "' + key + '" using filter [' + (is_and ? 'and' : 'or')  + '], comparing to: ' + filter_value);
                                
                                var regex = new RegExp(filter_value, 'i');
                                var match = regex.test(doc[key]);
                                
                                if (i = 0 && !is_and) {
                                    found = false;
                                }

                                log('# match: ' + match);
                                log('# doc value for ' + key + ': ' + doc[key]);
                                log('# filter "' + (is_and ? 'and' : 'or') + '" value for ' + key + ': ' + filters[is_and ? 'and' : 'or'][key]);
                                
                                found = is_and ? match && found : match || found;
                            }
                            
                            if (found) {
                                log('# found!');
                                    
                                documents.push(doc);
                            }
                        }
                        
                        // if (typeof filters['version'] === 'undefined' || filters['version'] == null) {
                        //     if ( doc._id == id ) {
                        //         documents.push(doc);
                        //     }
                        // } else {
                        //     var id_ver = id + '::' + version;
                        
                        //     if ( (doc._id == id && doc.version == version) || doc._id == id_ver ) {
                        //         documents.push(doc);
                        //     }
                        // }
                    } else {
                        documents.push(doc);
                    }
                } else {
                    if (typeof documents[last] === 'undefined' || typeof documents[last] == null || documents[last]._id != key[0]) {
                        continue;
                    }
                    
                    documents[last].has_relations = true;
                    
                    if (groupRelations) {
                        if (typeof documents[last]['relations'] === 'undefined') {
                            documents[last]['relations'] = [];
                        }
                        
                        documents[last].relations.push(doc);
                    } else {
                        if (idx > 100) {
                            if (typeof documents[last][doc.collection] === 'undefined') {
                                documents[last][doc.collection] = [];
                            }
                            
                            documents[last][doc.collection].push(doc);
                        } else {
                            if (typeof relations[last] === 'undefined') {
                                relations[last] = {};
                            }

                            if (typeof relations[last][value.rel_coll] === 'undefined') {
                                relations[last][value.rel_coll] = {};
                            }
                            
                            relations[last][value.rel_coll][doc._id + '::' + doc.version] = doc;
                        }
                        
                    }
                }
            }

            if (groupRelations) {
                return documents;
            } else {
                return documents.map(function(itm, idx, arr) {
                    var rel = relations[idx];

                    log('# Procesando: ' + itm.collection + '::' + itm._id);
                    
                    for (var collection in rel) {
                        log('## Comprobando relaciones: ' + collection);

                        if (rel.hasOwnProperty(collection) && itm.hasOwnProperty(collection)) {
                            log('## Propiedad de relacion encontrada');

                            for (var i = 0, len = itm[collection].length; i < len; i++) {
                                var rel_doc = itm[collection][i];

                                log('### Comprobando relacion: ' + rel_doc.collection + '::' + rel_doc._id);

                                for (var prop in rel_doc) {
                                    log('#### Comprobando la propiedad ' + prop + '. Valor: ' + rel_doc[prop]);
                                    
                                    if (prop == itm.collection) {
                                        log('#### La propiedad ' + prop + ' crea un referencia circular. Eliminada.');

                                        delete rel_doc[prop];
                                        continue;
                                    }

                                    if (rel_doc.hasOwnProperty(prop) && typeof rel_doc[prop] === 'object') {
                                        log('#### La propiedad ' + prop + ' es una posible relacion');

                                        var id = rel_doc[prop].id + '::' + rel_doc[prop].version;

                                        if (typeof rel[collection][id] !== 'undefined') {
                                            log('#### Relacion encontrada!');

                                            rel_doc[prop] = rel[collection][id];
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return itm;
                });
            }
        },
        
        parse_document: function(doc) {
            var parsed = [];
            
            if (typeof doc === 'object') {
                for (var key in doc) {
                    if (doc.hasOwnProperty(key)) {
                        var value = doc[key];
                        var is_array = isArray(doc[key]);
                        var is_object = (typeof value === 'object');
                        
                        if (is_array) {
                            value = doc[key].map(Parser.parse_document);
                        } else if (is_object) {
                            value = Parser.parse_document(doc[key]);
                        }
                        
                        parsed.push({
                            key: key,
                            value: value,
                            is_array: is_array,
                            is_object: is_object
                        });
                    }
                }
                
                return parsed;
            }
            
            return doc;
        }
    });
}();

exports.name = Parser.name;
exports.version = Parser.version;
exports.parse_list = Parser.parse_list;
exports.parse_document = Parser.parse_document;
