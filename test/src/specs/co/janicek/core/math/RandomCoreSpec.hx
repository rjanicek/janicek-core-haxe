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

import co.janicek.core.math.RandomCore;
import js.mocha.Mocha;

using co.janicek.core.math.RandomCore;
using js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class RandomCoreSpec {

	public function new() {
		M.describe("RandomCore", function() {
			
			M.describe("makeRandomSeed()", function() {
				M.it("should make a non deterministic random seed", function() {
					RandomCore.makeRandomSeed().should().be.a("number");
				});
			});
			
			M.describe("nextParkMiller()", function() {
				M.it("should generate a random int using Park Miller algorithm", function() {
					var seed = 1;
					var original = seed;
					seed = seed.nextParkMiller();
					seed.should().not.equal(original);
				});
				M.it("should generate the same Park Miller sequence on every machine", function() {
					var seed = 1;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextParkMiller();
					}
					
					seed.should().equal(522329230);
				});
				M.it("should generate a statistically even Park Miller distribution", function() {
					var seed = 1;
					var total = 0.0;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextParkMiller();
						total += seed.toFloat();
					}
					
					(total / length).should().be.greaterThan(0.45);
					(total / length).should().be.lessThan(0.55);
				});
			});
			
			M.describe("nextLCG()", function() {
				M.it("should generate the same LCG sequence", function() {
					var seed = 1;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextLCG();
					}
					
					seed.should().equal(1157381547);
				});
				
				M.it("should generate an even LCG distribution", function() {
					var seed = 1;
					var total = 0.0;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextLCG();
						total += seed.toFloat();
					}
					
					(total / length).should().be.greaterThan(0.45);
					(total / length).should().be.lessThan(0.55);
				});
			});
			
			M.describe("toFloat()", function() {
				M.it("should convert random seed to a Float value between 0.0 and 1.0", function() {
					1.nextParkMiller().toFloat().should().be.a("number");
				});
			});
			
			M.describe("toBool()", function() {
				M.it("should convert random seed to a Bool value (coin flip)", function() {
					1.nextParkMiller().toBool().should().be.a("boolean");
				});
			});
			
			M.describe("toIntRange()", function() {
				M.it("should generate an Int in range", function() {
					var iterations = 100;
					var seed = 1;
					
					for (step in 0...iterations) {
						seed = seed.nextParkMiller();
						seed.toIntRange(0, 10).should().be.greaterThan(-1);
						seed.toIntRange(0, 10).should().be.lessThan(11);
					}
				});
			});
			
			M.describe("toFloatRange()", function() {
				M.it("should generate a Float in range", function() {
					var iterations = 100;
					var seed = 1;
					
					for (step in 0...iterations) {
						seed = seed.nextParkMiller();
						seed.toFloatRange(0.0, 1.0).should().be.greaterThan(-0.1);
						seed.toFloatRange(0.0, 1.0).should().be.lessThan(1.1);
					}
				});
			});
			
			M.describe("stringToSeed()", function() {
				M.it("should convert a string to a seed", function() {
					"random seed".stringToSeed().should().be.a("number");
				});
			});
			
		});
	}
	
}