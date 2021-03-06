describe('Connection View', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    
    var view_name = 'actions/connection';
    var db;
    
    beforeAll(function() {
        db = $.couch.db('aunia');
    });
    
    it('deberia existir al menos un documento', function(done) {
        db.view(view_name).then(function(docs) {
            expect(docs).not.toBeNull();
            expect(docs.total_rows).toBeDefined();
            expect(docs.total_rows).toBeGreaterThan(0);
            done();
        });
    });
});