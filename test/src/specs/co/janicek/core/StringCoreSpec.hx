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

import co.janicek.core.Constants;
import co.janicek.core.math.MathCore;
import co.janicek.core.StringCore;
import js.expect.Expect;
import js.mocha.Mocha;

using co.janicek.core.math.MathCore;
using co.janicek.core.StringCore;
using js.expect.Expect;

/**
 * StringCore specs.
 * @author Richard Janicek
 */

class StringCoreSpec {

	public function new() {
		M.describe("StringCore", function() {
			
			M.describe("removeFromEnd()", function () {
				M.it("should remove one string from the end of another string", function() {
					StringCore.removeFromEnd("ab", "b").should().equal("a");
				});
			});
			
			M.describe("isNullOrEmpty()", function () {
				M.it("should check if string is null or empty", function() {
					StringCore.isNullOrEmpty(null).should().be.ok();
					StringCore.isNullOrEmpty("").should().be.ok();
					StringCore.isNullOrEmpty("not null or empty").should().not.be.ok();
				});
			});
			
			M.describe("isNotNullOrEmpty()", function () {
				M.it("should check if string is not null or empty", function() {
					StringCore.isNotNullOrEmpty(null).should().not.be.ok();
					"".isNotNullOrEmpty().should().not.be.ok();
					"not null or empty".isNotNullOrEmpty().should().be.ok();
				});
			});
			
			M.describe("firstNotNullOrEmpty()", function () {
				M.it("should find first string that is not null or empty", function() {
					["x"].firstNotNullOrEmpty().should().equal("x");
					[null, "x"].firstNotNullOrEmpty().should().equal("x");
					["", "x"].firstNotNullOrEmpty().should().equal("x");
					[null, "", "x"].firstNotNullOrEmpty().should().equal("x");
				});
				
				M.it("should return null if no match is found", function() {
					[].firstNotNullOrEmpty().should().equal(null);
					[null].firstNotNullOrEmpty().should().equal(null);
					[""].firstNotNullOrEmpty().should().equal(null);
					[null, ""].firstNotNullOrEmpty().should().equal(null);
				});
			});
			
			M.describe("isInteger()", function () {
				M.it("should return true if string is an Integer", function() {
					"0".isInteger().should().be.ok();
					"1".isInteger().should().be.ok();
					"-1".isInteger().should().be.ok();
				});
				M.it("should return false if string is not an Integer", function() {
					"".isInteger().should().not.be.ok();
					" ".isInteger().should().not.be.ok();
					"0.0".isInteger().should().not.be.ok();
				});
			});
			
		});

	}
	
}