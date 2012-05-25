package co.janicek.core;

class PathCore {

	public var pathDelimeter : String;
	public var fileExtensionDelimeter : String;
	
	public function new( ?pathDelimeter : String, ?fileExtensionDelimeter : String ) {
		this.pathDelimeter = (pathDelimeter == null ? "\\" : pathDelimeter);
		this.fileExtensionDelimeter = (fileExtensionDelimeter == null ? "." : fileExtensionDelimeter);
	}

	public function getDirectoryName( path : String ) : String {
		return path.substr(0, path.lastIndexOf(pathDelimeter));
	}
	
	public function getFileName( path : String ) : String {
		var fragments = path.split(pathDelimeter);
		return fragments[fragments.length - 1];
	}
	
	public function getFileNameWithoutExtension( path : String ) : String {
		return getFileName(path).split(fileExtensionDelimeter)[0];
	}

}