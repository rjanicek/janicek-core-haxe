package co.janicek.core;
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
			J.it("should convert degrees to radians", function() {
				J.expect(180.degreesToRadians()).toBe(3.141592653589793);
			});
			J.it("should convert radians to degrees", function() {
				J.expect(3.141592653589793.radiansToDegrees()).toBe(180);
			});
		});

	}
	
}