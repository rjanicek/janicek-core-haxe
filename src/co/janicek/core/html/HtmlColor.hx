package co.janicek.core.html;

/**
 * HTML Color constructors.
 * @see http://www.w3schools.com/cssref/css_colornames.asp
 * @author Richard Janicek
 */

enum HtmlColor {
	/**
	 * Make a color from an integer value.
	 */
	Color( color : Int );
	Rgb( r : Int, g : Int, b : Int );
	Rgba( red : Int, green : Int, blue : Int, alpha : Float );
	RgbF( red : Float, green : Float, blue : Float );
	RgbaF( red : Float, green : Float, blue : Float, alpha : Float );
	Hsl( hue : Int, saturation : Float, lightness : Float );
	Hsla( hue : Int, saturation : Float, lightness : Float, alpha : Float );
}

class HtmlColors {
	/**
	 * Convert HtmlColor to string.
	 */
	public static function toString( c : HtmlColor ) : String {
		return switch (c) {
			case Color(c) : HtmlColorCore.intToHexColor(c);
			case Rgb(r, g, b) : HtmlColorCore.rgb(r, g, b);
			case Rgba(r, g, b, a) : HtmlColorCore.rgba(r, g, b, a);
			case RgbF(r, g, b) : HtmlColorCore.rgbF(r, g, b);
			case RgbaF(r, g, b, a) : HtmlColorCore.rgbaF(r, g, b, a);
			case Hsl(h, s, l): HtmlColorCore.hsl(h, s, l);
			case Hsla(h, s, l, a): HtmlColorCore.hsla(h, s, l, a);
		}
	}
}