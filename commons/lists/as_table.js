function(head, req) {
  provides('html', function() {
    var html = '<!DOCTYPE html><html><head><title>VIEW_AS_TABLE</title>' +
      '<style>td { border-bottom: 1px solid black; padding: 4px; }</style></head>' +
      '<body><table><tbody><thead>';
    var table_header = '';
    var table_rows = '';
    
    while (row = getRow()) {
      var idx = row.key.length > 2 ? row.key[2] : row.key[1];
      var doc = row.doc;
      
      if (idx == 0) {
        if (table_header == '') {
          table_header = '<tr>';
        } else {
          if (table_header.indexOf('</tr>') == -1) {
            table_header += '</tr>';
          }
        }
        
        if (table_rows == '') {
          table_rows = '<tr>';
        } else {
          table_rows += '</tr><tr>';
        }
      }
      
      if (table_header.indexOf('</tr>') == -1) {
        table_header += '<th>' + doc.collection + '</th>';
      }
      
      table_rows += '<td>' + (doc.name ? doc.name : doc._id) + '</td>';
    }
    
    html += table_header + '</thead>' + table_rows + '</tbody></table></body></html>';
    
    return html;
  });
}