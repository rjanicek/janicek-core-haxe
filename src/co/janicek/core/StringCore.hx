package co.janicek.core;

class StringCore {

	public function new();
	
	public function trimEnd( string : String, trim : String ) :  String {
		if (StringTools.endsWith(string, trim)) {
			return string.substr(0, string.lastIndexOf(trim));
		}		
		return string;
	}
	
	public function isNullOrEmpty( string : String ) : Bool {
		if (string == null) {
			return true;
		}
		
		if (string.length == 0) {
			return true;
		}
		
		return false;
	}
	
}