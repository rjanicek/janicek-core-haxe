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
package co.janicek.core.http;

using co.janicek.core.HashTableCore;
using Reflect;

/**
 * HTTP Cookie functions.
 * @see <a href="http://en.wikipedia.org/wiki/HTTP_cookie">http://en.wikipedia.org/wiki/HTTP_cookie</a>
 * @author Richard Janicek
 */
class HttpCookieCore {

	public static inline var COOKIE_PAIR_DELIMETER_REGEX_PATTERN = "[;,] ";
	public static inline var COOKIE_KEY_VALUE_DELIMETER = "=";
	
	/**
	 * Parse raw cookie string into a hash table key=cookie-name value=cookie-value.
	 * Works for cookies with "; " or ", " delimeters.
	 * @param	rawCookies
	 * @return	Hash table of cookies.
	 */
	public static function parseCookies( rawCookies : String ) : Hash<String> {
		return rawCookies.parseHashTable(COOKIE_KEY_VALUE_DELIMETER, COOKIE_PAIR_DELIMETER_REGEX_PATTERN);
	}
	
}