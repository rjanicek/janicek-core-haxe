package co.janicek.core;

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
			
			J.describe("makeRandomSeed() : Int", function() {
				J.it("should make a non deterministic random seed", function() {
					J.expect(RandomCore.makeRandomSeed()).toBeDefined();
				});
			});
			
			J.describe("nextParkMiller( seed : Int ) : Int", function() {
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
			
			J.describe("nextLCG( seed : Int ) : Int", function() {
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
			
			J.describe("toFloat( seed : Int ) : Float", function() {
				J.it("should convert random seed to a Float value between 0.0 and 1.0", function() {
					J.expect(1.nextParkMiller().toFloat()).toBeDefined();
				});
			});
			
			J.describe("toBool( seed : Int ) : Bool", function() {
				J.it("should convert random seed to a Bool value (coin flip)", function() {
					J.expect(1.nextParkMiller().toBool()).toBeDefined();
				});
			});
			
			J.describe("toIntRange( seed : Int, min : Int, max : Int ) : Int", function() {
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
			
			J.describe("toFloatRange( seed : Int, min : Float, max : Float ) : Float", function() {
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
			
			J.describe("stringToSeed( s : String ) : Int", function() {
				J.it("should convert a string to a seed", function() {
					J.expect("random seed".stringToSeed()).toBeDefined();
				});
			});
			
		});
	}
	
}