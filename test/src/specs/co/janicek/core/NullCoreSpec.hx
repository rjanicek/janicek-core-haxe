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

using co.janicek.core.NullCore;
using js.expect.Expect;
using Reflect;

/**
 * NullCore specs.
 * @author Richard Janicek
 */

class NullCoreSpec {

	public function new() {
		M.describe("NullCore", function() {
			
			M.describe("isNull()", function () {
				M.it("should test nullable type for null", function() {
					var nullable : Bool = null;
					nullable.isNull().should().be.ok();
					nullable = true;
					nullable.isNull().should().not.be.ok();
					
					true.isNull().should().not.be.ok();
					1.isNull().should().not.be.ok();
					1.0.isNull().should().not.be.ok();
					var object = { };
					object.isNull().should().not.be.ok();
				});
				
				M.it("should test reflected nullable type for null", function() {
					var o = { property:null };
					o.field("property").isNull().should().be.ok();
				});
			});
			
			M.describe("isNotNull()", function () {
				M.it("should test nullable type for not null", function() {
					var nullable : Bool = null;
					nullable.isNotNull().should().not.be.ok();
					nullable = true;
					nullable.isNotNull().should().be.ok();
					
					true.isNotNull().should().be.ok();
					1.isNotNull().should().be.ok();
					1.0.isNotNull().should().be.ok();
					var object = { };
					object.isNotNull().should().be.ok();
					
				});
				
				M.it("should test reflected nullable type for not null", function() {
					var o = { property:null };
					o.field("property").isNotNull().should().not.be.ok();
				});				
			});	
			
			M.describe("coalesce()", function () {
				M.it("should coalesce a nullable by returning default value if nullable is null", function() {
					var nullable : Int = null;
					nullable.coalesce(1).should().equal(1);
					nullable = 0;
					nullable.coalesce(1).should().equal(0);
				});
			});
			
			M.describe("coalesceIter()", function () {
				M.it("should return null for empty iterable", function() {
					E.expect([].coalesceIter()).to.equal(null);
				});
				M.it("should return null if no value in iterable", function() {
					E.expect([null].coalesceIter()).to.equal(null);
				});
				M.it("should return first non null value in iterable", function() {
					[null, 1].coalesceIter().should().equal(1);
				});
			});
			
		});

	}
	
}