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

			J.describe("isEven( n : Int ) : Bool", function() {
				J.it("should test if Int is even", function() {
					J.expect(1.isEven()).toBeFalsy();
					J.expect(2.isEven()).toBeTruthy();
				});
			});

			J.describe("isOdd( n : Int ) : Bool", function() {
				J.it("should test if Int is odd", function() {
					J.expect(1.isOdd()).toBeTruthy();
					J.expect(2.isOdd()).toBeFalsy();
				});
			});
			
			J.describe("degreesToRadians( degrees : Float ) : Float", function() {
				J.it("should convert degrees to radians", function() {
					J.expect(180.degreesToRadians()).toBe(3.141592653589793);
				});
			});
			J.describe("radiansToDegrees( radians : Float ) : Float", function() {
				J.it("should convert radians to degrees", function() {
					J.expect(3.141592653589793.radiansToDegrees()).toBe(180);
				});
			});
			
			J.describe("average( numbers : Array<Float> ) : Float", function() {
				J.it("should calculate average from array of Floats", function() {
					J.expect([0.0, 0.5, 1].average()).toEqual(0.5);
				});
			});
			
			J.describe("averageInt( numbers : Array<Int> ) : Float", function() {
				J.it("should calculate average from array of Ints", function() {
					J.expect([1, 2, 3].averageInt()).toEqual(2);
				});
			});
			
			
		});

	}
	
}