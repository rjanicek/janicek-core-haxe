package co.janicek.core.math;

using Lambda;

class MathCore {

	/**
	 * Max value, signed integer.  
	 */
	inline public static var  INT32_MAX = 0x7fffffff;

	public static function isEven( n : Int ) : Bool {
		return n % 2 == 0;
	}
	
	public static function isOdd( n : Int ) : Bool {
		return !isEven(n);
	}
	
	public static function clampInt( value : Int, min : Int, max : Int ) : Int {
		return value < min ? 0 : value > max ? max : value;
	}
	
	public static function clamp( value : Float, min : Float, max : Float ) : Float {
		return value < min ? 0 : value > max ? max : value;
	}
	
	public static function degreesToRadians( degrees : Float ) : Float {
		return (degrees * Math.PI) / 180;
	}
	
	public static function radiansToDegrees( radians : Float ) : Float {
		return (radians * 180) / Math.PI;
	}
	
	public static function average( numbers : Array<Float> ) : Float {
		return numbers.fold(function(number, total) {
			return total + number;
		}, 0) / numbers.length;
	}
	
	public static function averageInt( numbers : Array<Int> ) : Float {
		return numbers.fold(function(number, total) {
			return total + number;
		}, 0) / numbers.length;
	}	
	
}