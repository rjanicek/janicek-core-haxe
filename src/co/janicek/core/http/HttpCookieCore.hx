package co.janicek.core.http;

using co.janicek.core.HashTableCore;
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
		return rawCookies.parseHashTable(COOKIE_DELIMETER, COOKIE_PAIR_DELIMETER);
	}
	
}