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

import co.janicek.core.http.UrlCore;
import jasmine.J;

using Lambda;
using co.janicek.core.NullCore;
using co.janicek.core.http.UrlCore;
using Reflect;
using Std;

/**
 * @author Richard Janicek
 */

class UrlCoreSpec {

	public function new() {
		J.describe("UrlCore", function() {
			
			J.describe("parseUrl()", function () {

				J.it("should parse every part of a URL", function() {
					var url = "http://username:password@janicek.co:666/over/there/index.html?parameter=value&parameter2=value2#fragment".parseUrl();
					J.expect(url.protocol).toEqual("http");
					J.expect(url.user).toEqual("username");
					J.expect(url.password).toEqual("password");
					J.expect(url.host).toEqual("janicek.co");
					J.expect(url.port).toEqual("666");
					J.expect(url.directory).toEqual("/over/there/");
					J.expect(url.file).toEqual("index.html");
					J.expect(url.query).toEqual("parameter=value&parameter2=value2");
					J.expect(url.fragment).toEqual("fragment");
				});
			});			
			
			J.describe("parseUrlQuery()", function () {
				J.it("should return hashtable from url query", function() {
					var query = "key=value&key2=value2".parseUrlQuery();
					J.expect(query.count()).toEqual(2);
					J.expect(query.get("key")).toEqual("value");
					J.expect(query.get("key2")).toEqual("value2");
				});
			});
			
		});
	}
	
}