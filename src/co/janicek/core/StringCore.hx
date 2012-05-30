package co.janicek.core;

class StringCore {

	/**
	 * Trim string from end of string.
	 * @param	string String to trim.
	 * @param	trim String to trim from other string.
	 * @return	Trimmed string.
	 */
	public static function trimEnd( string : String, trim : String ) :  String {
		if (StringTools.endsWith(string, trim)) {
			return string.substr(0, string.lastIndexOf(trim));
		}		
		return string;
	}
	
	/**
	 * Check if sting is null or empty.
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
	
}