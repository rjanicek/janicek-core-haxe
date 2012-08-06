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