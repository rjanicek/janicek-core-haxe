package co.janicek.core;
import co.janicek.core.math.OptimizedPerlin;
import haxe.Timer;
import jasmine.J;

/**
 * ...
 * @author Richard Janicek
 */

class PerlinSpec {

	public function new() {
		J.describe("Perlin", function() {
			J.it("should make perlin data", function() {
				var data = new OptimizedPerlin().make(100, 100, 1.0, 1.0, 1.0);
				J.expect(data).not.toBeNull();
			});
		});
	}
	
}