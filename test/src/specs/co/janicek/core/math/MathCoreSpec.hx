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
import js.mocha.Mocha;

using co.janicek.core.math.MathCore;
using js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class MathCoreSpec {

	public function new() {
		M.describe("MathCore", function() {

			M.describe("average()", function() {
				M.it("should calculate average from array of Floats", function() {
					[0.0, 0.5, 1].average().should().equal(0.5);
				});
			});
			
			M.describe("averageInt()", function() {
				M.it("should calculate average from array of Ints", function() {
					[1, 2, 3].averageInt().should().equal(2);
				});
			});
			
			M.describe("clamp()", function() {
				M.it("should clamp a Float to an interval", function() {
					1.0.clamp(1.0, 1.0).should().equal(1.0);
					1.0.clamp(1.0, 2.0).should().equal(1.0);
					1.0.clamp(0.0, 1.0).should().equal(1.0);
					1.0.clamp(0.0, 2.0).should().equal(1.0);
					1.0.clamp(2.0, 2.0).should().equal(2.0);
					1.0.clamp(2.0, 1.0).should().equal(1.0);
				});
			});
			
			M.describe("degreesToRadians()", function() {
				M.it("should convert degrees to radians", function() {
					180.degreesToRadians().should().equal(3.141592653589793);
				});
			});
			
			M.describe("INT53_MAX", function() {
				M.it("should not be able to go higher", function() {
					(MathCore.WHOLE_NUMBER_MAX + 1).should().equal(MathCore.WHOLE_NUMBER_MAX);
				});
			});
			
			M.describe("INT53_MIN", function() {
				M.it("should not be able to go lower", function() {
					(MathCore.WHOLE_NUMBER_MIN - 1).should().equal(MathCore.WHOLE_NUMBER_MIN);
				});
			});
			
			M.describe("isEven()", function() {
				M.it("should test if Int is even", function() {
					1.isEven().should().not.be.ok();
					2.isEven().should().be.ok();
				});
			});

			M.describe("isOdd()", function() {
				M.it("should test if Int is odd", function() {
					1.isOdd().should().be.ok();
					2.isOdd().should().not.be.ok();
				});
			});

			M.describe("radiansToDegrees()", function() {
				M.it("should convert radians to degrees", function() {
					3.141592653589793.radiansToDegrees().should().equal(180);
				});
			});
			
		});

	}
	
}