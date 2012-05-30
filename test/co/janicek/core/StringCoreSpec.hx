package co.janicek.core;
import co.janicek.core.math.MathCore;
import jasmine.J;

using co.janicek.core.math.MathCore;

/**
 * StringCore specs.
 * @author Richard Janicek
 */

class StringCoreSpec {

	public function new() {
		J.describe("StringCore", function() {
			J.it("should trim one string from the end of another string", function() {
				J.expect(StringCore.trimEnd("ab", "b")).toEqual("a");
			});
			J.it("should check if string is null or empty", function() {
				J.expect(StringCore.isNullOrEmpty("")).toBeTruthy();
				J.expect(StringCore.isNullOrEmpty(null)).toBeTruthy();
				J.expect(StringCore.isNullOrEmpty("not null or empty")).toBeFalsy();
			});
		});

	}
	
}