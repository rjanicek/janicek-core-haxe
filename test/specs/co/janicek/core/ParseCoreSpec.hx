package specs.co.janicek.core;

import jasmine.J;

using co.janicek.core.ParseCore;
using Lambda;

/**
 * @author Richard Janicek
 */

class ParseCoreSpec {

	public function new() {
		J.describe("ParseCore", function() {
			
			J.describe("parseHashTable()", function () {
				J.it("should return empty hashtable from empty string", function() {
					var ht = ParseCore.parseHashTable("", "");
					J.expect(ht.count()).toEqual(0);
				});
				J.it("should parse one key / value pair", function() {
					var ht = ParseCore.parseHashTable("key=value", "=");
					J.expect(ht.get("key")).toEqual("value");
				});
				J.it("should parse multiple key / value pairs", function() {
					var ht = ParseCore.parseHashTable("key1=value1,key2=value2", "=", ",");
					J.expect(ht.get("key1")).toEqual("value1");
					J.expect(ht.get("key2")).toEqual("value2");
				});
				J.it("should parse keys without values as empty", function() {
					var ht = "key".parseHashTable("=");
					J.expect(ht.count()).toEqual(1);
					J.expect(ht.exists("key")).toBeTruthy();
					J.expect(ht.get("key")).toEqual("");
					
					ht = "key&key2".parseHashTable("=", "&");
					J.expect(ht.count()).toEqual(2);
					J.expect(ht.get("key")).toEqual("");
					J.expect(ht.get("key2")).toEqual("");
				});
			});
			
		});
	}
	
}