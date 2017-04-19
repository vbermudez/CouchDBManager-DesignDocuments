function(doc, req) { 
    log('> _show/detail');
    
    if (!doc) {
        log('# No document');
        log('< _show/detail');
        
        return 'Non-existent';
    } else {
        var ddoc = this;
        var Parser = require('lib/parser');
        var Mustache = require('lib/mustache');
        var parsed = Parser.parse_document(doc);
        
        // log('# original doc');
        // log(doc);
        // log('# parsed doc');
        // log(parsed);
        
        provides('html', function() {
            log('< _show/detail');
            
            return Mustache.to_html(ddoc.templates.detail, { 
                document: toJSON(doc), 
                title: 'Detalle', 
                contextRoot: '/' + req.info.db_name + '/_design/configuration'
            });  
        });  
    }
}
