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
package co.janicek.core.http;

using co.janicek.core.NullCore;
using co.janicek.core.HashTableCore;
using Reflect;

/**
 * Parts of a URL.
 */
typedef Url = {
    source : String,
    protocol : String,
    authority : String,
    userInfo : String,
    user : String,
    password : String,
    host : String,
    port : String,
    relative : String,
    path : String,
    directory : String,
    file : String,
    query : String,
    fragment : String	
}

/**
 * Functions related to URL's.
 * @see <a href="http://en.wikipedia.org/wiki/Url">http://en.wikipedia.org/wiki/Url</a>
 * @author Richard Janicek
 */
class UrlCore {
	
	public static inline var QUERY_KEY_VALUE_DELIMETER = "=";
	public static inline var QUERY_KEY_VALUE_PAIR_DELIMETER = "&";
	
	public static function makeEmptyUrl() : Url {
		return {
			source : "",
			protocol : "",
			authority : "",
			userInfo : "",
			user : "",
			password : "",
			host : "",
			port : "",
			relative : "",
			path : "",
			directory : "",
			file : "",
			query : "",
			fragment : ""
		}
	}
	
	/**
	 * Parse a URL string into it's parts.
	 * @see <a href="http://en.wikipedia.org/wiki/URI_scheme">http://en.wikipedia.org/wiki/URI_scheme</a>
	 */
	public static function parseUrl( url : String ) : Url {
		var urlParts = makeEmptyUrl();
		
        // The almighty regexp (courtesy of http://blog.stevenlevithan.com/archives/parseuri)
        var r : EReg = ~/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
 
        // Match the regexp to the url
        r.match(url);
 
        // Use reflection to set each part
		var i = 0;
        for (field in urlParts.fields()) {
			var part = r.matched(i).coalesce("");
            urlParts.setField(field, part);
			i++;
        }
		
		return urlParts;
	}
	
	/**
	 * Parse a URL query into a hash table.
	 */
	public static function parseUrlQuery( query : String ) : Hash<String> {
		return query.parseHashTable(QUERY_KEY_VALUE_DELIMETER, QUERY_KEY_VALUE_PAIR_DELIMETER);
	}

}