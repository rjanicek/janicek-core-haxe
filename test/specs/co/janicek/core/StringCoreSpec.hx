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
import jasmine.J;

using co.janicek.core.math.MathCore;
using co.janicek.core.StringCore;

/**
 * StringCore specs.
 * @author Richard Janicek
 */

class StringCoreSpec {

	public function new() {
		J.describe("StringCore", function() {
			
			J.describe("removeFromEnd()", function () {
				J.it("should remove one string from the end of another string", function() {
					J.expect(StringCore.removeFromEnd("ab", "b")).toEqual("a");
				});
			});
			
			J.describe("isNullOrEmpty()", function () {
				J.it("should check if string is null or empty", function() {
					J.expect(StringCore.isNullOrEmpty(null)).toBeTruthy();
					J.expect(StringCore.isNullOrEmpty("")).toBeTruthy();
					J.expect(StringCore.isNullOrEmpty("not null or empty")).toBeFalsy();
				});
			});
			
			J.describe("isInteger()", function () {
				J.it("should return true if string is an Integer", function() {
					J.expect("0".isInteger()).toBeTruthy();
					J.expect("1".isInteger()).toBeTruthy();
					J.expect("-1".isInteger()).toBeTruthy();
				});
				J.it("should return false if string is not an Integer", function() {
					J.expect("".isInteger()).toBeFalsy();
					J.expect(" ".isInteger()).toBeFalsy();
					J.expect("0.0".isInteger()).toBeFalsy();
				});
			});
			
		});

	}
	
}