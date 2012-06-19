package co.janicek.core;

using co.janicek.core.StringCore;

class StringCore {

	/**
	 * Remove pattern from end of string.
	 * @param	string String to remove pattern from.
	 * @param	pattern String to remove from end of other string.
	 * @return	String with pattern removed from end.
	 */
	public static function removeFromEnd( string : String, pattern : String ) :  String {
		if (StringTools.endsWith(string, pattern)) {
			return string.substr(0, string.lastIndexOf(pattern));
		}		
		return string;
	}

	
	/**
	 * Test if string contains another string.
	 * @param	search String to test.
	 * @param	pattern Pattern to find in test string.
	 * @return	True if string contains pattern, else false.
	 */
	public static function contains(string:String, pattern:String):Bool {
		return string.indexOf(pattern) != -1;
	}

	/**
	 * Test if sting is null or empty.
	 * @return True if string is null or empty.
	 */
	public static function isNullOrEmpty( string : String ) : Bool {
		if (string == null) {
			return true;
		}
		
		if (string.length == 0) {
			return true;
		}
		
		return false;
	}
	
	/**
	 * Test string for Integer value.
	 * @param	s String to test.
	 * @return	True if string is an Integer, else false.
	 */
	public static function isInteger( s : String ) : Bool {
		if (s.contains(".")) return false;
		return Std.parseInt(s) != null;
	}
	
}