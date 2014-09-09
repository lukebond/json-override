var assert = require('assert'),
    override = require('../json-override');

describe('json-override', function() {
    describe('#overwriteKeys()', function() {
        it('should preserve values that aren\'t in the override object', function() {
            var baseObject = {
                a: 1,
                b: 2,
                c: 3
            };
            var overrideObject = {
                b: -1
            };
            var result = override(baseObject, overrideObject, true);
            assert.equal(Object.keys(result).length, 3);
            assert.equal(result.a, 1);
            assert.equal(result.c, 3);
        });
        it('should recurse into sub-objects, again preserving existing keys', function() {
            var baseObject = {
                a: 1,
                b: {
                    x: 9,
                    y: 8,
                    z: 7
                }
            };
            var overrideObject = {
                b: {
                    z: 99
                }
            };
            var result = override(baseObject, overrideObject, true);
            assert.equal(Object.keys(result).length, 2);
            assert.equal(Object.keys(result.b).length, 3);
            assert.equal(result.b.x, 9);
            assert.equal(result.b.y, 8);
            assert.equal(result.b.z, 99);
        });
        it('should leave baseObject untouched when createNew is true', function() {
            var baseObject = {
                a: 1,
                b: 2
            };
            var overrideObject = {
                a: -1,
                b: -1
            };
            override(baseObject, overrideObject, true);
            assert.equal(baseObject.a, 1);
            assert.equal(baseObject.b, 2);
        });
        it('should modify baseObject when createNew is false', function() {
            var baseObject = {
                a: 1,
                b: 2
            };
            var overrideObject = {
                a: -1,
                b: -1
            };
            override(baseObject, overrideObject, false);
            assert.equal(baseObject.a, -1);
            assert.equal(baseObject.b, -1);
        });
        it('should default to modifying baseObject', function() {
            var baseObject = {
                a: 1,
                b: 2
            };
            var overrideObject = {
                a: -1,
                b: -1
            };
            override(baseObject, overrideObject);
            assert.equal(baseObject.a, -1);
            assert.equal(baseObject.b, -1);
        });
        it('should handle baseObject being null', function() {
            var baseObject = null;
            var overrideObject = {
                a: -1,
                b: -1
            };
            var newBaseObject = override(baseObject, overrideObject);
            assert.equal(newBaseObject.a, -1);
            assert.equal(newBaseObject.b, -1);
        });
    });
});
