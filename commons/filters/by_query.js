function(doc, req) {
    var filter = typeof req.query.where !== 'undefined' && req.query.where != '';

    if (filter) {
        var Pillow = require('lib/pillow');
        var pql = Pillow.parse(req.query.where);

        if (typeof doc.doc !== 'undefined') {
            return Pillow.match(doc.doc, pql.query);
        } else {
            return Pillow.match(doc, pql.query);
        }
        
    }
    
    return true;
}

/* http://root:root@localhost:5984/aunia/_changes?include_docs=true&filter=commons/by_query&where=collection = 'bus' */