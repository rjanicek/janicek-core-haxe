package co.janicek.core;

using co.janicek.core.StringCore;
using Lambda;

/**
 * Core parsing functions.
 * @author Richard Janicek
 */
class ParseCore {

	/**
	 * Parse a string into a hash table.
	 */
	public static function parseHashTable( rawHashTable : String, keyValueDelimeter : String, rowDelimeter = "" ) : Hash<String> {
		
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
		
		if (!rowDelimeter.isNullOrEmpty()) {
			rawHashTable.split(rowDelimeter).iter(function(rawItem) {
				parseItem(rawItem);
			});
		}
		else {
			parseItem(rawHashTable);
		}
		
		return hashTable;
	}
	
}