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
package specs.co.janicek.core.math;
import co.janicek.core.math.MathCore;
import jasmine.J;

using co.janicek.core.math.MathCore;

/**
 * ...
 * @author Richard Janicek
 */

class MathCoreSpec {

	public function new() {
		J.describe("MathCore", function() {

			J.describe("average()", function() {
				J.it("should calculate average from array of Floats", function() {
					J.expect([0.0, 0.5, 1].average()).toEqual(0.5);
				});
			});
			
			J.describe("averageInt()", function() {
				J.it("should calculate average from array of Ints", function() {
					J.expect([1, 2, 3].averageInt()).toEqual(2);
				});
			});
			
			J.describe("clamp()", function() {
				J.it("should clamp a Float to an interval", function() {
					J.expect(1.0.clamp(1.0, 1.0)).toEqual(1.0);
					J.expect(1.0.clamp(1.0, 2.0)).toEqual(1.0);
					J.expect(1.0.clamp(0.0, 1.0)).toEqual(1.0);
					J.expect(1.0.clamp(0.0, 2.0)).toEqual(1.0);
					J.expect(1.0.clamp(2.0, 2.0)).toEqual(2.0);
					J.expect(1.0.clamp(2.0, 1.0)).toEqual(1.0);
				});
			});
			
			J.describe("degreesToRadians()", function() {
				J.it("should convert degrees to radians", function() {
					J.expect(180.degreesToRadians()).toBe(3.141592653589793);
				});
			});
			
			J.describe("INT53_MAX", function() {
				J.it("should not be able to go higher", function() {
					J.expect(MathCore.WHOLE_NUMBER_MAX + 1).toEqual(MathCore.WHOLE_NUMBER_MAX);
				});
			});
			
			J.describe("INT53_MIN", function() {
				J.it("should not be able to go lower", function() {
					J.expect(MathCore.WHOLE_NUMBER_MIN - 1).toEqual(MathCore.WHOLE_NUMBER_MIN);
				});
			});
			
			J.describe("isEven()", function() {
				J.it("should test if Int is even", function() {
					J.expect(1.isEven()).toBeFalsy();
					J.expect(2.isEven()).toBeTruthy();
				});
			});

			J.describe("isOdd()", function() {
				J.it("should test if Int is odd", function() {
					J.expect(1.isOdd()).toBeTruthy();
					J.expect(2.isOdd()).toBeFalsy();
				});
			});

			J.describe("radiansToDegrees()", function() {
				J.it("should convert radians to degrees", function() {
					J.expect(3.141592653589793.radiansToDegrees()).toBe(180);
				});
			});
			
		});

	}
	
}