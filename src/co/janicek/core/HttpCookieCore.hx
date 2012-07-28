package co.janicek.core;

using Lambda;
using Reflect;

/**
 * HTTP Cookie functions.
 * @see <a href="http://en.wikipedia.org/wiki/HTTP_cookie">http://en.wikipedia.org/wiki/HTTP_cookie</a>
 * @author Richard Janicek
 */
class HttpCookieCore {

	public static inline var COOKIE_PAIR_DELIMETER = "; ";
	public static inline var COOKIE_DELIMETER = "=";
	
	/**
	 * Parse raw cookie string into a hash table key=cookie name value=cookie value.
	 * @param	rawCookies
	 * @return	Hash table of cookies.
	 */
	public static function parseCookies( rawCookies : String ) : Hash<String> {
		var structuredCookies = new Hash<String>();
		rawCookies.split(COOKIE_PAIR_DELIMETER).iter(function(rawCookie) {
			var cookie = rawCookie.split(COOKIE_DELIMETER);
			if (cookie.length == 2) {
				structuredCookies.set(cookie[0], cookie[1]);
			}
		});
		return structuredCookies;
	}
	
}