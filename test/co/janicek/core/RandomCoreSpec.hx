package co.janicek.core;

import jasmine.J;

using co.janicek.core.math.RandomCore;

/**
 * ...
 * @author Richard Janicek
 */

class RandomCoreSpec {

	public function new() {
		J.describe("RandomCore", function() {
			
			J.it("should generate a random int using Park Miller algorithm", function() {
				var seed = 1;
				var original = seed;
				seed = seed.nextParkMiller();
				J.expect(seed).not.toBe(original);
			});
			
			J.it("should generate the same Park Miller sequence", function() {
				var seed = 1;
				var length = 1000;
				
				for (step in 0...length) {
					seed = seed.nextParkMiller();
				}
				
				J.expect(seed).toBe(522329230);
			});
			
			J.it("should generate the same LCG sequence", function() {
				var seed = 1;
				var length = 1000;
				
				for (step in 0...length) {
					seed = seed.nextLCG();
				}
				
				J.expect(seed).toBe(1157381547);
			});
			
			J.it("should generate an even Park Miller distribution", function() {
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

			J.it("should generate an int in range", function() {
				var iterations = 100;
				var seed = 1;
				
				for (step in 0...iterations) {
					seed = seed.nextParkMiller();
					J.expect(seed.toIntRange(0, 10)).toBeGreaterThan(-1);
					J.expect(seed.toIntRange(0, 10)).toBeLessThan(11);
				}
			});
			
			
			
		});
	}
	
}