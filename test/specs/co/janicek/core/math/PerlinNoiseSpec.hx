package specs.co.janicek.core.math;
import co.janicek.core.math.PerlinNoise;
import haxe.Timer;
import jasmine.J;

/**
 * ...
 * @author Richard Janicek
 */

class PerlinNoiseSpec {

	public function new() {
		J.describe("PerlinNoise", function() {
			J.describe("makePerlinNoise()", function() {				
				J.it("should make perlin noise data", function() {
					var data = PerlinNoise.makePerlinNoise(100, 100, 1.0, 1.0, 1.0);
					J.expect(data).not.toBeNull();
				});
			});
		});
	}
	
}