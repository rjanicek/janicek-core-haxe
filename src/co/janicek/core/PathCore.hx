package co.janicek.core;

class PathCore {

	private static inline var PATH_DELIMETER = "/";
	private static inline var FILE_EXTENSION_DELIMETER = ".";
	
	public static function getDirectoryName( path : String, pathDelimeter = PATH_DELIMETER ) : String {
		return path.substr(0, path.lastIndexOf(pathDelimeter));
	}
	
	public static function getFileName( path : String, pathDelimeter = PATH_DELIMETER ) : String {
		var fragments = path.split(pathDelimeter);
		return fragments[fragments.length - 1];
	}
	
	public static function getFileNameWithoutExtension( path : String, fileExtensionDelimeter = FILE_EXTENSION_DELIMETER ) : String {
		return getFileName(path).split(fileExtensionDelimeter)[0];
	}

}