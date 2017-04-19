var Parser = function() {
    return ({
        name: 'Parser',
        version: '0.0.2',
        
        parse_list: function(getRow, groupRelations, req_query) {
            // log('> Parser.parse_list');
            // log('# where: ' + req_query.where);
            // log('# load simple relations: ' + req_query.simple_relations);

            var Pillow = require('lib/pillow');
            
            // var qs_ignore = [
            //     'format', 'conflicts', 'descending', 'endkey', 'end_key', 'endkey_docid', 'end_key_doc_id', 
            //     'group', 'group_level', 'include_docs', 'attachments', 'att_encoding_info', 'inclusive_end',
            //     'key', 'keys', 'limit', 'reduce', 'skip', 'stale', 'startkey', 'start_key', 'startkey_docid',
            //     'start_key_doc_id', 'update_seq'
            // ];

            var documents = [];
            var relations = [];
            var row = null;
            var pql = Pillow.parse(req_query.where);
            var simple_rels = typeof req_query.simple_relations !== 'undefined' && req_query.simple_relations == 'true';
            var filter = typeof req_query.where !== 'undefined' && req_query.where != '';
            
            while (row = getRow()) {
                var last = documents.length - 1;
                var key = row.key;
                var value = row.value;
                var doc = row.doc;
                var idx = key.length > 2 ? key[2] : key[1];
                
                if (doc == null || typeof doc === 'undefined') {
                    continue;
                }

                if (last < 0) {
                    last = 0;
                }
                
                if (idx == 0) {
                    doc['has_relations'] = false;
                    
                    if (filter) {
                        // log('# Consulting with Pillow! -> ' + pql.query + (pql.related ? ', relations -> ' + pql.related : '') );
                        
                        var found = Pillow.match(doc, pql.query);

                        if (found) {
                            // log('# found!');
                                
                            documents.push(doc);
                        }
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
                        if (idx > 100 || simple_rels) {
                            if (typeof documents[last][doc.collection] === 'undefined') {
                                if (simple_rels) {
                                    documents[last][doc.collection] = {};
                                } else {
                                    documents[last][doc.collection] = [];
                                }
                            }
                            
                            if (simple_rels) {
                                documents[last][doc.collection] = doc;
                            } else {
                                documents[last][doc.collection].push(doc);
                            }
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
                if (filter && pql.related) {
                    documents = documents.filter(function(itm, idx) {
                        var rels = [];

                        if (itm.relations && itm.relations.length > 0) {
                            rels = itm.relations.filter(function(rel) {
                                if (rel.collection == pql.relation) {
                                    return Pillow.match(rel, pql.related);
                                }
                                
                                return false;
                            });
                        }
                        
                        return rels.length > 0;
                    });
                }
                
                return documents;
            } else {
                var docs = documents.map(function(itm, idx, arr) {
                    var rel = relations[idx];

                    // log('# Procesando: ' + itm.collection + '::' + itm._id);
                    
                    for (var collection in rel) {
                        // log('## Comprobando relaciones: ' + collection);

                        if (rel.hasOwnProperty(collection) && itm.hasOwnProperty(collection)) {
                            // log('## Propiedad de relacion encontrada');

                            for (var i = 0, len = itm[collection].length; i < len; i++) {
                                var rel_doc = itm[collection][i];

                                // log('### Comprobando relacion: ' + rel_doc.collection + '::' + rel_doc._id);

                                for (var prop in rel_doc) {
                                    // log('#### Comprobando la propiedad ' + prop + '. Valor: ' + JSON.stringify(rel_doc[prop]) );
                                    
                                    // if (prop == itm.collection) {
                                    //     // log('#### La propiedad ' + prop + ' crea un referencia circular. Eliminada.');

                                    //     delete rel_doc[prop];
                                    //     continue;
                                    // }

                                    if (typeof rel_doc !== 'undefined' && rel_doc != null && typeof rel_doc[prop] !== 'undefined' && rel_doc.hasOwnProperty(prop) && 
                                            rel_doc[prop] != null && typeof rel_doc[prop] === 'object') {
                                        // log('#### La propiedad ' + prop + ' es una posible relacion');

                                        var id = rel_doc[prop].id + '::' + rel_doc[prop].version;

                                        if (typeof rel[collection][id] !== 'undefined') {
                                            // log('#### Relacion encontrada!');

                                            rel_doc[prop] = rel[collection][id];
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return itm;
                });

                if (filter && pql.related) {
                    // log('# Aplicando filtro por relacion');

                    docs = docs.filter(function(itm) {
                        var rels = [];

                        for (prop in itm) {
                            if (prop == pql.relation) {
                                // log('## Encontrada relacion');
                                  
                                if (itm[prop] instanceof Array) {
                                    rels = itm[prop].filter(function(rel) {
                                        if (typeof rel === 'object') {
                                            // // log('### (Array) Comparando relacion ' + pql.relation + ': ' + JSON.stringify(rel) + ', con: ' + pql.related);
                                            
                                            return Pillow.match(rel, pql.related);
                                        }

                                        return false;
                                    });
                                } else if (itm[prop] instanceof Object) {
                                    // // log('### (Object) Comparando relacion ' + pql.relation + ': ' + JSON.stringify(itm[prop]) + ', con: ' + pql.related);

                                    return Pillow.match(itm[prop], pql.related);
                                }
                            }
                        }
                        
                        return rels.length > 0;
                    });
                }

                return docs;
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
