package co.janicek.core;
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
			J.describe("new( seed = 666, octaves = 4, falloff = 0.5 )", function() {
				J.it("should make perlin noise maker", function() {
					//var pn = new PerlinNoise();
					//J.expect(pn).not.toBeNull();
				});
			});
			J.describe("make(width:Int, height:Int, _x:Float, _y:Float, _z:Float, ?_ ):Array<Array<Int>>", function() {				
				J.it("should make perlin noise data", function() {
					var data = PerlinNoise.makePerlinNoise(100, 100, 1.0, 1.0, 1.0);
					J.expect(data).not.toBeNull();
				});
			});
		});
	}
	
}