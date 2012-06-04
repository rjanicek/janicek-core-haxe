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
			J.describe("removeFromEnd( string : String, pattern : String ) : String", function () {
				J.it("should remove one string from the end of another string", function() {
					J.expect(StringCore.removeFromEnd("ab", "b")).toEqual("a");
				});
			});
			J.describe("isNullOrEmpty( string : String ) : Bool", function () {
				J.it("should check if string is null or empty", function() {
					J.expect(StringCore.isNullOrEmpty("")).toBeTruthy();
					J.expect(StringCore.isNullOrEmpty(null)).toBeTruthy();
					J.expect(StringCore.isNullOrEmpty("not null or empty")).toBeFalsy();
				});
			});
		});

	}
	
}