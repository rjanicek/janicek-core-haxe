/**
 * Janicek Core Haxe
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek <r@janicek.co>
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

import jasmine.J;

using co.janicek.core.HashTableCore;
using Lambda;

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
				J.it("should parse hash table with empty pair seperator pattern", function() {
					var ht = "key=value".parseHashTable("=", "");
					J.expect(ht.get("key")).toEqual("value");
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