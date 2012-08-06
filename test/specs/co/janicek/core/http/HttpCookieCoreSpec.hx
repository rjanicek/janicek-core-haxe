package specs.co.janicek.core.http;

import co.janicek.core.http.HttpCookieCore;
import jasmine.J;

using Lambda;

/**
 * @author Richard Janicek
 */

class HttpCookieCoreSpec {

	public function new() {
		J.describe("HttpCookieCore", function() {
			
			J.describe("parseCookies()", function () {
				J.it("should return empty hashtable from empty cookies", function() {
					var cookies = HttpCookieCore.parseCookies("");
					J.expect(cookies.count()).toEqual(0);
				});
				J.it("should parse one cookie", function() {
					var cookies = HttpCookieCore.parseCookies("cookie=monster");
					J.expect(cookies.get("cookie")).toEqual("monster");
				});
				J.it("should parse multiple cookies", function() {
					var cookies = HttpCookieCore.parseCookies("cookie=monster; singularity=near");
					J.expect(cookies.get("cookie")).toEqual("monster");
					J.expect(cookies.get("singularity")).toEqual("near");
				});
			});
			
		});
	}
	
}