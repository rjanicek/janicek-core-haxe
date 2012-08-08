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