/**
 * Janicek Core Haxe
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek <r@janicek.co>
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
				J.it("should parse cookies with comma space delimeter", function() {
					var cookies = HttpCookieCore.parseCookies("cookie=monster, singularity=near");
					J.expect(cookies.get("cookie")).toEqual("monster");
					J.expect(cookies.get("singularity")).toEqual("near");
				});
			});
			
		});
	}
	
}