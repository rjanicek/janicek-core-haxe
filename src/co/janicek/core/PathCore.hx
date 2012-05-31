package co.janicek.core;

class PathCore {

	public static function getDirectoryName( path : String, pathDelimeter = "/" ) : String {
		return path.substr(0, path.lastIndexOf(pathDelimeter));
	}
	
	public static function getFileName( path : String, pathDelimeter = "/" ) : String {
		var fragments = path.split(pathDelimeter);
		return fragments[fragments.length - 1];
	}
	
	public static function removeFileNameExtension( path : String, fileExtensionDelimeter = "." ) : String {
		return path.split(fileExtensionDelimeter)[0];
	}

}