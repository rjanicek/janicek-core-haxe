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

import jasmine.J;

using co.janicek.core.NullCore;
using Reflect;

/**
 * NullCore specs.
 * @author Richard Janicek
 */

class NullCoreSpec {

	public function new() {
		J.describe("NullCore", function() {
			
			J.describe("isNull()", function () {
				J.it("should test nullable type for null", function() {
					var nullable : Bool = null;
					J.expect(nullable.isNull()).toBeTruthy();
					nullable = true;
					J.expect(nullable.isNull()).toBeFalsy();
					
					J.expect(true.isNull()).toBeFalsy();
					J.expect(1.isNull()).toBeFalsy();
					J.expect(1.0.isNull()).toBeFalsy();
					var object = { };
					J.expect(object.isNull()).toBeFalsy();
				});
				
				J.it("should test reflected nullable type for null", function() {
					var o = { property:null };
					J.expect(o.field("property").isNull()).toBeTruthy();
				});
			});
			
			J.describe("isNotNull()", function () {
				J.it("should test nullable type for not null", function() {
					var nullable : Bool = null;
					J.expect(nullable.isNotNull()).toBeFalsy();
					nullable = true;
					J.expect(nullable.isNotNull()).toBeTruthy();
					
					J.expect(true.isNotNull()).toBeTruthy();
					J.expect(1.isNotNull()).toBeTruthy();
					J.expect(1.0.isNotNull()).toBeTruthy();
					var object = { };
					J.expect(object.isNotNull()).toBeTruthy();
					
				});
				
				J.it("should test reflected nullable type for not null", function() {
					var o = { property:null };
					J.expect(o.field("property").isNotNull()).toBeFalsy();
				});				
			});	
			
			J.describe("coalesce()", function () {
				J.it("should coalesce a nullable by returning default value if nullable is null", function() {
					var nullable : Int = null;
					J.expect(nullable.coalesce(1)).toEqual(1);
					nullable = 0;
					J.expect(nullable.coalesce(1)).toEqual(0);
				});
			});
			
			J.describe("coalesceIter()", function () {
				J.it("should return null for empty iterable", function() {
					J.expect([].coalesceIter()).toEqual(null);
				});
				J.it("should return null if no value in iterable", function() {
					J.expect([null].coalesceIter()).toEqual(null);
				});
				J.it("should return first non null value in iterable", function() {
					J.expect([null, 1].coalesceIter()).toEqual(1);
				});
			});
			
		});

	}
	
}