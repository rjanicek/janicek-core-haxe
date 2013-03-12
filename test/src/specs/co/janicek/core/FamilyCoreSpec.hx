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

import js.mocha.Mocha.M.*;

using js.expect.Expect;
using co.janicek.core.FamilyCore;
using Lambda;

class FamilyCoreSpec {

	public function new() {
		describe("FamilyCore", function() {
			
			describe("isRoot()", function () {
				it("should test node for parent that is null", function() {
					{parent : null }.isRoot().should().equal(true);
					{parent : { parent : null } }.isRoot().should().equal(false);
				});
			});
			
			describe("root()", function () {
				it("should find the root node in a lineage", function() {
					{id : 1, parent : null }
						.root().id.should().equal(1);
						
					{id : 1, parent : { id : 2, parent : null } }
						.root().id.should().equal(2);
				});
			});
			
			describe("lineage()", function () {
				it("should iterate a node's lineage", function() {
					{id : 1, parent : { id : 2, parent : null } }
						.lineage().count().should().equal(2);
				});
			});
			
			describe("family()", function () {
				it("should iterate a node's family tree including parent node", function() {
					{ children : [{ name : "child" }] }
						.family().count().should().equal(2);
				});
			});
			
			describe("descendants()", function () {
				it("should iterate a node's descendants", function() {
					{ children : [{ name : "child" }] }
						.descendants().count().should().equal(1);
				});
			});
			
		});
	}
	
}