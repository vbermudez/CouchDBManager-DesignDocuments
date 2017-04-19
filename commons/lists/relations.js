function(head, req) {
    log('> _list/relations');
    var ddoc = this;
    var Parser = require('lib/parser');
    //var Pillow = require('lib/pillow');
    
    provides('json', function() {
        var documents = Parser.parse_list(getRow, false, req.query);
    
        log('# Documents: ' + documents.length);
        log('< _list/relations as json');
        
        return toJSON({ total_rows: documents.length, rows: documents });
    });
    
    provides('html', function() {
        var Mustache = require('lib/mustache');
        var documents = Parser.parse_list(getRow, true, req.query);
    
        log('# Documents: ' + documents.length);
        log('< _list/relations as html');
        
        return Mustache.to_html(ddoc.templates.relations, { 
            documents: documents, 
            title: 'Listado relacional', 
            contextRoot: '/' + req.info.db_name + '/_design/commons',
            collection: documents[0] ? documents[0].collection || 'None' : 'None'
        });
    });
}