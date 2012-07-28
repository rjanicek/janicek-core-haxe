package co.janicek.core.math;

using Lambda;
using Std;
using co.janicek.core.math.MathCore;

class MathCore {

	/**
	 * Max value, signed integer.  
	 */
	inline public static var  INT32_MAX = 0x7fffffff;
	
	/**
	 * Biggest whole number.
	 * WARNING: INT53_MAX + 1 === INT53_MAX
	 * @see <a href="http://en.wikipedia.org/wiki/IEEE_754-1985">http://en.wikipedia.org/wiki/IEEE_754-1985</a>
	 */
	inline public static var INT53_MAX = 9007199254740992;
	
	/**
	 * Smallest whole number.
	 * WARNING: INT53_MIN - 1 === INT53_MIN
	 * @see <a href="http://en.wikipedia.org/wiki/IEEE_754-1985">http://en.wikipedia.org/wiki/IEEE_754-1985</a>
	 */
	inline public static var INT53_MIN = -INT53_MAX;

	public static function isEven( n : Int ) : Bool {
		return n % 2 == 0;
	}
	
	public static function isOdd( n : Int ) : Bool {
		return !isEven(n);
	}
	
	/**
	 * clamp an Integer to an interval
	 * interval endpoints are compared to get min and max, so it doesn't matter what order they are passed in
	 * @param	value value to clamp
	 * @param	minOrMax1 interval endpoint
	 * @param	minOrMax2 interval endpoint
	 * @return 	clamped value to given interval
	 */
	public static function clampInt( value : Int, minOrMax1 : Int, minOrMax2 : Int ) : Int {
		return value.clamp(minOrMax1, minOrMax2).int();
	}
	
	/**
	 * clamp a Float to an interval
	 * interval endpoints are compared to get min and max, so it doesn't matter what order they are passed in
	 * @param	value value to clamp
	 * @param	minOrMax1 interval endpoint
	 * @param	minOrMax2 interval endpoint
	 * @return 	clamped value to given interval
	 */
	public static function clamp( value : Float, minOrMax1 : Float, minOrMax2 : Float ) : Float {
		var min = Math.min(minOrMax1, minOrMax2);
		var max = Math.max(minOrMax1, minOrMax2);
		return value < min ? min : value > max ? max : value;
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