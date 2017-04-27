var Pillow = function() {
    return ({
        name: 'Pillow',
        version: '0.0.1',

        
        query: function(arr, pql) {
            var query = Pillow.parse(pql);

            return items.filter(function(item) {
                return Pillow.match(item, query.query);
            });
        },

        match: function(item, pql) {
            var func_body = 'return ' + pql + ';';
            
            return (new Function('item', 'Pillow', func_body)).call(this, item, Pillow);
        },

        indexOf: function(str, re, ini) {
            var idx = str.substring(ini || 0).search(re);

            return (idx >= 0) ? (idx + (ini || 0)) : idx;
        },
        
        indexOfArray: function(arr, re) {
            var idx = -1;
            
            for (var i = 0, len = arr.length; i < len; i++) {
                if ( Pillow.indexOf(arr[i], re, 0) >= 0 ) {
                    idx = i;
                    
                    break;
                }
            }
            
            return idx;
        },

        parse: function(pql) {
            if (typeof pql === 'undefined' || pql == null || pql == '') {
                return true;
            }

            var pql_copy = pql;
            var pql_related = false;
            var pql_relation = false;

            if (pql_copy.toLowerCase().indexOf('related with') != -1) {
                var pql_parts = pql_copy.split('related with');

                pql_copy = pql_parts[0].trim();
                pql_related = pql_parts[1].trim();
                pql_parts = pql_related.split('by');
                pql_relation = pql_parts[0].trim();
                pql_related = pql_parts[1].trim();
            }

            var pairs_re = /([\w.-]+(?:\s+|)(?:like|contains|[<>!=]{1,2})(?:\s+|)(?:[\d.]+|true|false|null|'(?:[^'\\]+(?:\\.[^'\\]+)*)'))/g;
            var vars_re = /([\w.-]+)(?:\s*)(?:like|contains|[<>!=]{1,2})/g;
            var values_re = /(?:like|contains|[<>!=]{1,2})(?:\s*)(?!'undefined')([\d.]+|true|false|null|'(?:[^'\\]+(?:\\.[^'\\]+)*)')/g;
            var parsed_related = false;
            var parsed = pql_copy.replace(/([']|)\s(and)\s(\w*[^'])/gi, function(m, g1, i, s) {
                // log('# AND repl:' + m);
                return m.replace(/and/i, '&&');
            }).replace(/([']|)\s(or)\s(\w*[^'])/gi, function(m, g1, i, s) {
                // log('# OR repl:' + m);
                return m.replace(/or/i, '||');
            }).replace(pairs_re, function(m, g1, i, s) {
                // log('# pairs: ' + m);
                
                var tmp = g1.replace(vars_re, function(_m, _g1, _i, _s) {
                    var type_val = '';
                    var name = '';
                    
                    // log('## vars: ' + _m);

                    if (_g1.indexOf('.') != -1) {
                       var parts = _g1.split('.');
                       var type_vals = [];
                       var last_p = '';
                        
                       for (var i = 0, len = parts.length; i < len; i++) {
                           var p = parts[i];
                           
                           type_vals.push("typeof item" + name + "['" + p + "'] !== 'undefined'");
                           name += "['" + p + "']";
                       }
                       
                       type_val = type_vals.join(' && ');
                    } else {
                        name = "['" + _g1 + "']";
                        type_val = "typeof item"+ name + " !== 'undefined'";
                    }
                    
                    if (_m.toLowerCase().indexOf('like') != -1) {
                        return type_val + ' && (item' + name + ' like';
                    }
                  
                    if (_m.toLowerCase().indexOf('contains') != -1) {
                        return type_val + ' && (Pillow.indexOfArray(item' + name + ' contains';
                    }

                    return type_val + ' && item' + name + ' ' + _m.replace(_g1, '').trim();
                }).replace(values_re, function(_m, _g1, _i, _s) {
                    // log('## values: ' + _m);

                    if (_g1 && _g1.trim() != '') {
                        if (_m.toLowerCase().indexOf('like') != -1) {
                            return '.match(/' + _g1.replace(/'/g, '') + '/gi) ? true : false)';
                        }
                    
                        if (_m.toLowerCase().indexOf('contains') != -1) {
                            return ', /' + _g1.replace(/'/g, '') + '/gi) > -1 ? true : false)'
                        }
                    }
                    
                    return _m;
                }).replace(/(\s+)(?:\.match)/g, function(_m, _g1, _i, _s) {
                    // log('## spaces: ' + _m);

                    return _m.replace(/\s+/g, '');
                });

                // log('# end: ' + tmp);

                return '(' + tmp + ')';
            });

            // log('# PARSED: ' + parsed);

            if (pql_related) {
                parsed_related = Pillow.parse(pql_related).query;
            }
            
            return { query: parsed.replace(/[^!<>=]=/g, ' =='), related: parsed_related, relation: pql_relation };
        }
    });
}();

exports.name = Pillow.name;
exports.version = Pillow.version;
exports.indexOf = Pillow.indexOf;
exports.parse = Pillow.parse;
exports.match = Pillow.match;
exports.query = Pillow.query;


