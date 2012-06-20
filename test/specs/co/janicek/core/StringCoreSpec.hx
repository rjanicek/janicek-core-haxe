package specs.co.janicek.core;

import co.janicek.core.math.MathCore;
import co.janicek.core.StringCore;
import jasmine.J;

using co.janicek.core.math.MathCore;
using co.janicek.core.StringCore;

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
			
			J.describe("isInteger( s : String ) : Bool", function () {
				J.it("should return true is string is an Integer", function() {
					J.expect("0".isInteger()).toBeTruthy();
					J.expect("1".isInteger()).toBeTruthy();
					J.expect("-1".isInteger()).toBeTruthy();
				});
				J.it("should return false if string is not an Integer", function() {
					J.expect("".isInteger()).toBeFalsy();
					J.expect(" ".isInteger()).toBeFalsy();
					J.expect("0.0".isInteger()).toBeFalsy();
				});
			});
			
		});

	}
	
}