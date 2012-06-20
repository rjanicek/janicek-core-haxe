package co.janicek.core.html;

/**
 * Console API
 * @see http://getfirebug.com/wiki/index.php/Console_API
 */

@:native("console")
extern class Console {
	public static function assert( expression : Dynamic ) : Void;
	public static function count( ?title : String) : Void;
	public static function debug( object : Dynamic ) : Void;
	public static function dir( object : Dynamic ) : Void;
	public static function error( object : Dynamic ) : Void;
	public static function info( object : Dynamic ) : Void;
	public static function log( object : Dynamic ) : Void;
	public static function trace() : Void;
	public static function warn( object : Dynamic ) : Void;
}