package co.janicek.core;

using co.janicek.core.StringCore;
using Lambda;

/**
 * Core parsing functions.
 * @author Richard Janicek
 */
class HashTableCore {

	public static inline var DEFAULT_KEY_VALUE_DELIMETER = "=";
	public static inline var DEFAULT_KEY_VALUE_PAIR_DELIMETER = "&";
	
	/**
	 * Parse a string into a hash table.
	 */
	public static function parseHashTable( rawHashTable : String, keyValueDelimeter = DEFAULT_KEY_VALUE_DELIMETER, pairDelimeter = DEFAULT_KEY_VALUE_PAIR_DELIMETER ) : Hash<String> {
		var hashTable = new Hash<String>();
		
		function parseItem(rawKeyValuePair : String) {
			if (!rawKeyValuePair.isNullOrEmpty()) {
				if (rawKeyValuePair.contains(keyValueDelimeter)) {
					var item = rawKeyValuePair.split(keyValueDelimeter);
					if (item.length == 2) {
						hashTable.set(item[0], item[1]);
					}
				}
				else {
					hashTable.set(rawKeyValuePair, "");
				}
			}
		}
		
		if (!pairDelimeter.isNullOrEmpty()) {
			rawHashTable.split(pairDelimeter).iter(function(rawItem) {
				parseItem(rawItem);
			});
		}
		else {
			parseItem(rawHashTable);
		}
		
		return hashTable;
	}
	
	public static function stringifyHashTable( ht : Hash<String>, keyValueDelimeter = DEFAULT_KEY_VALUE_DELIMETER, pairDelimeter = DEFAULT_KEY_VALUE_PAIR_DELIMETER ) : String {
		return { iterator: ht.keys }.fold(function(key, buf : String) {
			var value = ht.get(key);
			return (buf.isEmpty() ? "" : buf + pairDelimeter)
					+ key + (value.isNullOrEmpty() ? "" : keyValueDelimeter + value);
		}, "");
	}
	
}