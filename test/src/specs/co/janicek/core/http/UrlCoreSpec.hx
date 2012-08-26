/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
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
import js.expect.Expect;
import js.mocha.Mocha;

using co.janicek.core.http.UrlCore;
using co.janicek.core.NullCore;
using js.expect.Expect;
using Lambda;
using Reflect;
using Std;

/**
 * @author Richard Janicek
 */

class UrlCoreSpec {

	public function new() {
		M.describe("UrlCore", function() {
			
			M.describe("parseUrl()", function () {

				M.it("should parse every part of a URL", function() {
					var url = "http://username:password@janicek.co:666/over/there/index.html?parameter=value&parameter2=value2#fragment".parseUrl();
					url.protocol.should().equal("http");
					url.user.should().equal("username");
					url.password.should().equal("password");
					url.host.should().equal("janicek.co");
					url.port.should().equal("666");
					url.directory.should().equal("/over/there/");
					url.file.should().equal("index.html");
					url.query.should().equal("parameter=value&parameter2=value2");
					url.fragment.should().equal("fragment");
				});
			});			
			
			M.describe("parseUrlQuery()", function () {
				M.it("should return hashtable from url query", function() {
					var query = "key=value&key2=value2".parseUrlQuery();
					query.count().should().equal(2);
					query.get("key").should().equal("value");
					query.get("key2").should().equal("value2");
				});
			});
			
		});
	}
	
}