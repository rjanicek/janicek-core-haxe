package specs.co.janicek.core;

import jasmine.J;

using co.janicek.core.HashTableCore;
using Lambda;

/**
 * @author Richard Janicek
 */

class HashTableCoreSpec {

	public function new() {
		J.describe("HashTableCore", function() {
			
			J.describe("parseHashTable()", function () {
				J.it("should return empty hashtable from empty string", function() {
					var ht = "".parseHashTable();
					J.expect(ht.count()).toEqual(0);
				});
				J.it("should parse one key / value pair", function() {
					var ht = "key=value".parseHashTable();
					J.expect(ht.get("key")).toEqual("value");
				});
				J.it("should parse multiple key / value pairs", function() {
					var ht = "key1=value1&key2=value2".parseHashTable();
					J.expect(ht.get("key1")).toEqual("value1");
					J.expect(ht.get("key2")).toEqual("value2");
				});
				J.it("should parse keys without values as empty", function() {
					var ht = "key".parseHashTable();
					J.expect(ht.count()).toEqual(1);
					J.expect(ht.exists("key")).toBeTruthy();
					J.expect(ht.get("key")).toEqual("");
					
					ht = "key&key2".parseHashTable();
					J.expect(ht.count()).toEqual(2);
					J.expect(ht.get("key")).toEqual("");
					J.expect(ht.get("key2")).toEqual("");
				});
			});
			
			J.describe("stringifyHashTable()", function () {
				J.it("should return empty string from empty hash table", function() {
					var ht = new Hash<String>();
					J.expect(ht.stringifyHashTable()).toEqual("");
				});
				J.it("should return a key / value pair string", function() {
					var ht = new Hash<String>();
					ht.set("key", "value");
					J.expect(ht.stringifyHashTable()).toEqual("key=value");
				});
				J.it("should return multiple key / value pairs string", function() {
					var ht = new Hash<String>();
					ht.set("key", "value");
					ht.set("key2", "value2");
					J.expect(ht.stringifyHashTable()).toEqual("key=value&key2=value2");
				});
				J.it("should return key with empty value without key value delimeter", function() {
					var ht = new Hash<String>();
					ht.set("key", "");
					J.expect(ht.stringifyHashTable()).toEqual("key");
					ht.set("key2", "");
					J.expect(ht.stringifyHashTable()).toEqual("key&key2");
				});
			});
			
		});
	}
	
}