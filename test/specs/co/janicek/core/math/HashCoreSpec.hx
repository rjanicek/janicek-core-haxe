package specs.co.janicek.core.math;
import jasmine.J;

using co.janicek.core.math.HashCore;

/**
 * ...
 * @author Richard Janicek
 */

class HashCoreSpec {

	public function new() {
		J.describe("HashCore", function() {
			J.describe("djb2()", function() {
				J.it("should make djb2 hash", function() {
					J.expect("text".djb2()).toBeDefined();
				});
			});
		});
	}
	
}