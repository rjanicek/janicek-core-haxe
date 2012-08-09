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
import jasmine.J;

using co.janicek.core.math.RandomCore;

/**
 * ...
 * @author Richard Janicek
 */

class RandomCoreSpec {

	public function new() {
		J.describe("RandomCore", function() {
			
			J.describe("makeRandomSeed()", function() {
				J.it("should make a non deterministic random seed", function() {
					J.expect(RandomCore.makeRandomSeed()).toBeDefined();
				});
			});
			
			J.describe("nextParkMiller()", function() {
				J.it("should generate a random int using Park Miller algorithm", function() {
					var seed = 1;
					var original = seed;
					seed = seed.nextParkMiller();
					J.expect(seed).not.toBe(original);
				});
				J.it("should generate the same Park Miller sequence on every machine", function() {
					var seed = 1;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextParkMiller();
					}
					
					J.expect(seed).toBe(522329230);
				});
				J.it("should generate a statistically even Park Miller distribution", function() {
					var seed = 1;
					var total = 0.0;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextParkMiller();
						total += seed.toFloat();
					}
					
					J.expect(total / length).toBeGreaterThan(0.45);
					J.expect(total / length).toBeLessThan(0.55);
				});
			});
			
			J.describe("nextLCG()", function() {
				J.it("should generate the same LCG sequence", function() {
					var seed = 1;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextLCG();
					}
					
					J.expect(seed).toBe(1157381547);
				});
				
				J.it("should generate an even LCG distribution", function() {
					var seed = 1;
					var total = 0.0;
					var length = 1000;
					
					for (step in 0...length) {
						seed = seed.nextLCG();
						total += seed.toFloat();
					}
					
					J.expect(total / length).toBeGreaterThan(0.45);
					J.expect(total / length).toBeLessThan(0.55);
				});
			});
			
			J.describe("toFloat()", function() {
				J.it("should convert random seed to a Float value between 0.0 and 1.0", function() {
					J.expect(1.nextParkMiller().toFloat()).toBeDefined();
				});
			});
			
			J.describe("toBool()", function() {
				J.it("should convert random seed to a Bool value (coin flip)", function() {
					J.expect(1.nextParkMiller().toBool()).toBeDefined();
				});
			});
			
			J.describe("toIntRange()", function() {
				J.it("should generate an Int in range", function() {
					var iterations = 100;
					var seed = 1;
					
					for (step in 0...iterations) {
						seed = seed.nextParkMiller();
						J.expect(seed.toIntRange(0, 10)).toBeGreaterThan(-1);
						J.expect(seed.toIntRange(0, 10)).toBeLessThan(11);
					}
				});
			});
			
			J.describe("toFloatRange()", function() {
				J.it("should generate a Float in range", function() {
					var iterations = 100;
					var seed = 1;
					
					for (step in 0...iterations) {
						seed = seed.nextParkMiller();
						J.expect(seed.toFloatRange(0.0, 1.0)).toBeGreaterThan(-0.1);
						J.expect(seed.toFloatRange(0.0, 1.0)).toBeLessThan(1.1);
					}
				});
			});
			
			J.describe("stringToSeed()", function() {
				J.it("should convert a string to a seed", function() {
					J.expect("random seed".stringToSeed()).toBeDefined();
				});
			});
			
		});
	}
	
}