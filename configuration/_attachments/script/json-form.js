function to_form(doc) {
    var html = $('<div></div>');
    
    for (var key in doc) {
        if (doc.hasOwnProperty(key)) {
            var group = $('<div class="form-group"></div>');
            
            if (doc[key] instanceof Array) {
                if (typeof doc[key][0] === 'object') {
                    $('<label>' + key + '</label>').appendTo(html);
                    
                    var div = $('<div class="well"></div>');
                    var res = doc[key].map(to_form);
                    
                    res.forEach(function(itm) {
                        itm.appendTo(div);
                    });
                    
                    div.appendTo(html);
                } else {
                    $('<label for="' + key + '">' + key + '</label>').appendTo(group);
                    
                    var select = $('<select rows="4" multiple="multiple"></select>');
                    
                    for (var i = 0, len = doc[key].length; i < len; i++) {
                        $('<option value="' + doc[key][i] + '">' + doc[key][i] + '</option>').appendTo(select);
                    }
                    
                    select.appendTo(group);
                    group.appendTo(html);
                }
            } else if (typeof doc[key] === 'object') {
                $('<label>' + key + '</label>').appendTo(html);
                
                var div = $('<div class="well"></div>');
                
                to_form(doc[key]).appendTo(div);
                
                div.appendTo(html);
            } else {
                $('<label for="' + key + '">' + key + '</label>').appendTo(group);
                $('<input type="text" class="form-control" value="' + doc[key] + '">').appendTo(group);
                group.appendTo(html);
            }
        }
    }
    
    return html;
}