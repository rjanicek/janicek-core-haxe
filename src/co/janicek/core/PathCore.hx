package co.janicek.core;

class PathCore {

	/**
	 * @param	pathDelimeter (default = "/")
	 */
	public static function getDirectoryName( path : String, pathDelimeter = "/" ) : String {
		return path.substr(0, path.lastIndexOf(pathDelimeter));
	}
	
	/**
	 * @param	pathDelimeter (default = "/")
	 */
	public static function getFileName( path : String, pathDelimeter = "/" ) : String {
		var fragments = path.split(pathDelimeter);
		return fragments[fragments.length - 1];
	}
	
	/**
	 * @param	fileExtensionDelimeter (default = ".")
	 */
	public static function removeFileNameExtension( path : String, fileExtensionDelimeter = "." ) : String {
		return path.split(fileExtensionDelimeter)[0];
	}

}