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
			
			J.describe("degreesToRadians()", function() {
				J.it("should convert degrees to radians", function() {
					J.expect(180.degreesToRadians()).toBe(3.141592653589793);
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