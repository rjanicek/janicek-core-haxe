/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package specs.co.janicek.core;

import js.mocha.Mocha;

using co.janicek.core.HashTableCore;
using js.expect.Expect;
using Lambda;

class HashTableCoreSpec {

	public function new() {
		M.describe("HashTableCore", function() {
			
			M.describe("parseHashTable()", function () {
				M.it("should return empty hashtable from empty string", function() {
					var ht = "".parseHashTable();
					ht.count().should().equal(0);
				});
				M.it("should parse one key / value pair", function() {
					var ht = "key=value".parseHashTable();
					ht.get("key").should().equal("value");
				});
				M.it("should parse multiple key / value pairs", function() {
					var ht = "key1=value1&key2=value2".parseHashTable();
					ht.get("key1").should().equal("value1");
					ht.get("key2").should().equal("value2");
				});
				M.it("should parse keys without values as empty", function() {
					var ht = "key".parseHashTable();
					ht.count().should().equal(1);
					ht.exists("key").should().be.ok();
					ht.get("key").should().equal("");
					
					ht = "key&key2".parseHashTable();
					ht.count().should().equal(2);
					ht.get("key").should().equal("");
					ht.get("key2").should().equal("");
				});
				M.it("should parse hash table with empty pair seperator pattern", function() {
					var ht = "key=value".parseHashTable("=", "");
					ht.get("key").should().equal("value");
				});
			});
			
			M.describe("stringifyHashTable()", function () {
				M.it("should return empty string from empty hash table", function() {
					var ht = new Map();
					ht.stringifyHashTable().should().equal("");
				});
				M.it("should return a key / value pair string", function() {
					var ht = new Map();
					ht.set("key", "value");
					ht.stringifyHashTable().should().equal("key=value");
				});
				M.it("should return multiple key / value pairs string", function() {
					var ht = new Map();
					ht.set("key", "value");
					ht.set("key2", "value2");
					ht.stringifyHashTable().should().equal("key=value&key2=value2");
				});
				M.it("should return key with empty value without key value delimeter", function() {
					var ht = new Map();
					ht.set("key", "");
					ht.stringifyHashTable().should().equal("key");
					ht.set("key2", "");
					ht.stringifyHashTable().should().equal("key&key2");
				});
			});
			
		});
	}
	
}