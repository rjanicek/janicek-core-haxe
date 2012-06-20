package co.janicek.core.html;

using co.janicek.core.math.MathCore;
using Std;

/**
 * Color functions.
 * @author Richard Janicek
 * @author Amit Patel
 */
class ColorCore {
	
	public static inline var MAX_COLOR_COMPONENT = 0xff;

	/**
	 * Interpolate color between color0 and color1 using fraction f. When f==0, result is color0. When f==1, result is color1.
	 */
    public static function interpolateColor( color0 : Int, color1 : Int, f : Float) : Int {
		var r:Int = Std.int((1 - f) * (color0 >> 16) + f * (color1 >> 16));
		var g:Int = Std.int((1 - f) * ((color0 >> 8) & 0xff) + f * ((color1 >> 8) & 0xff));
		var b:Int = Std.int((1 - f) * (color0 & 0xff) + f * (color1 & 0xff));
		if (r > 255) r = 255;
		if (g > 255) g = 255;
		if (b > 255) b = 255;
		return (r << 16) | (g << 8) | b;
    }
	
	/**
	 * Make HTML hex color string from Int value. Example: #000000
	 * @param	color Int color value.
	 * @return	HTML color string.
	 */
	public static function intToHexColor( color : Int ) : String {
		return "#" + StringTools.hex(color, 6);
	}
	
	/**
	 * Make HTML rgba(r,g,b,a) color string.
	 * @param	red Red channel (0 - 255).
	 * @param	green Green channel (0 - 255).
	 * @param	blue Blue channel (0 - 255).
	 * @param	?alpha Optional alpha channel (0.0 - 1.0).
	 */
	public static function rgba( red : Int, green : Int, blue : Int, ?alpha : Float) : String {
		var core = Std.format("$red,$green,$blue");
		return alpha == null ? Std.format("rgb($core)") : Std.format("rgba($core,$alpha)");
	}
	
	/**
	 * Make HTML rgba(r,g,b,a) color string using fractions.
	 * @param	red Red channel (0.0 - 1.0).
	 * @param	green Green channel (0.0 - 1.0).
	 * @param	blue Blue channel (0.0 - 1.0).
	 * @param	?alpha Optional alpha channel (0.0 - 1.0).
	 */
	public static function rgbaFraction( red : Float, green : Float, blue : Float, ?alpha : Float) : String {
		var core = Std.format("${red*100}%,${green*100}%,${blue*100}%");
		return alpha == null ? Std.format("rgb($core)") : Std.format("rgba($core,$alpha)");
	}
	
	/**
	 * Convert a fraction (0.0 - 1.0) to a color value (0 - 255).
	 */
	public static inline function colorFraction( fraction : Float) : Int {
		return (MAX_COLOR_COMPONENT * fraction).int();
	}
	
}