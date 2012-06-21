package co.janicek.core.html;

using co.janicek.core.math.MathCore;
using Std;

/**
 * Color functions.
 * @author Richard Janicek
 */
class HtmlColorCore {
	
	public static inline var MAX_COLOR_COMPONENT = 0xff;

	/**
	 * Get red component of Int color.
	 */
	public static inline function getRedComponent( c : Int ) : Int {
		return (c >> 16) & 0xff;
	}

	/**
	 * Get green component of Int color.
	 */
	public static inline function getGreenComponent( c : Int ) : Int {
		return (c >> 8) & 0xff;
	}

	/**
	 * Get blue component of Int color.
	 */
	public static inline function getBlueComponent( c : Int ) : Int {
		return c & 0xff;
	}

	/**
	 * Interpolate color between color0 and color1 using fraction f. When f==0, result is color0. When f==1, result is color1.
	 * @author Amit Patel
	 */
    public static function interpolateColor( color0 : Int, color1 : Int, f : Float ) : Int {
		var r:Int = Std.int((1 - f) * (color0 >> 16) + f * (color1 >> 16));
		var g:Int = Std.int((1 - f) * ((color0 >> 8) & 0xff) + f * ((color1 >> 8) & 0xff));
		var b:Int = Std.int((1 - f) * (color0 & 0xff) + f * (color1 & 0xff));
		if (r > 255) r = 255;
		if (g > 255) g = 255;
		if (b > 255) b = 255;
		return (r << 16) | (g << 8) | b;
    }
	
	/**
	 * Convert a fraction (0.0 - 1.0) to a color value (0 - 0xff).
	 */
	public static inline function colorFraction( fraction : Float ) : Int {
		return (MAX_COLOR_COMPONENT * fraction).int();
	}
	
	/**
	 * Make HTML hex color string from Int value. Example: 0 -> #000000
	 * @param	color Int color value.
	 * @return	HTML color string.
	 */
	public static function intToHexColor( color : Int ) : String {
		return "#" + StringTools.hex(color, 6);
	}

	/**
	 * Make HTML rgb(r,g,b,a) color string.
	 * @param	red Red channel (0 - 0xff).
	 * @param	green Green channel (0 - 0xff).
	 * @param	blue Blue channel (0 - 0xff).
	 */
	public static function rgb( red : Int, green : Int, blue : Int ) : String {
		return "rgb($red,$green,$blue)".format();
	}

	/**
	 * Make HTML rgba(r,g,b,a) color string.
	 * @param	red Red channel (0 - 0xff).
	 * @param	green Green channel (0 - 0xff).
	 * @param	blue Blue channel (0 - 0xff).
	 * @param	alpha Alpha channel (0.0 - 1.0).
	 */
	public static function rgba( red : Int, green : Int, blue : Int, alpha : Float) : String {
		return Std.format("rgba($red,$green,$blue,$alpha)");
	}

	/**
	 * Make HTML rgb(r,g,b) color string using fractions.
	 * @param	red Red channel (0.0 - 1.0).
	 * @param	green Green channel (0.0 - 1.0).
	 * @param	blue Blue channel (0.0 - 1.0).
	 */
	public static function rgbF( red : Float, green : Float, blue : Float ) : String {
		return Std.format("rgb(${red*100}%,${green*100}%,${blue*100}%)");
	}
	
	/**
	 * Make HTML rgba(r,g,b,a) color string using fractions.
	 * @param	red Red channel (0.0 - 1.0).
	 * @param	green Green channel (0.0 - 1.0).
	 * @param	blue Blue channel (0.0 - 1.0).
	 * @param	alpha Alpha channel (0.0 - 1.0).
	 */
	public static function rgbaF( red : Float, green : Float, blue : Float, alpha : Float) : String {
		return Std.format("rgba(${red*100}%,${green*100}%,${blue*100}%,$alpha)");
	}

	/**
	 * Make HTML hsl(h,s,l) color string.
	 * @param	hue A degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. 
	 * @param	saturation A percentage value; 0.0 means a shade of gray and 1.0 is the full color.
	 * @param	lightness Lightness is also a percentage; 0.0 is black, 1.0 is white.
	 * @return	HTML color string.
	 */
	public static function hsl(hue : Int, saturation : Float, lightness : Float) : String {
		return "hsl($hue,${saturation*100}%,${lightness*100}%)".format();
	}

	/**
	 * Make HTML hsla(h,s,l,a) color string.
	 * @param	hue A degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. 
	 * @param	saturation A percentage value; 0.0 means a shade of gray and 1.0 is the full color.
	 * @param	lightness Lightness is also a percentage; 0.0 is black, 1.0 is white.
	 * @param	alpha Number between 0.0 (fully transparent) and 1.0 (fully opaque).
	 * @return	HTML color string.
	 */
	public static function hsla( hue : Int, saturation : Float, lightness : Float, alpha : Float) : String {
		return "hsla($hue,${saturation*100}%,${lightness*100}%,$alpha)".format();
	}

}