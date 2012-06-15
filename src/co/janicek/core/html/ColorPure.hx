package co.janicek.core.html;

/**
 * ...
 * @author Richard Janicek
 */

class ColorPure {

	/**
	 * Helper function for color manipulation. When f==0: color0, f==1: color1
	 */
    public static function interpolateColor(color0:Int, color1:Int, f:Float):Int {
      var r:Int = Std.int((1 - f) * (color0 >> 16) + f * (color1 >> 16));
      var g:Int = Std.int((1 - f) * ((color0 >> 8) & 0xff) + f * ((color1 >> 8) & 0xff));
      var b:Int = Std.int((1 - f) * (color0 & 0xff) + f * (color1 & 0xff));
      if (r > 255) r = 255;
      if (g > 255) g = 255;
      if (b > 255) b = 255;
      return (r << 16) | (g << 8) | b;
    }
	
	public static function toHtmlColor(color:Int):String {
		return "#" + StringTools.hex(color);
	}
	
	public static function toCanvasColor(red:Float, green:Float, blue:Float, ?alpha:Float):String {
		var core = Std.format("$red, $green, $blue");
		return alpha == null ? Std.format("rgb($core)") : Std.format("rgba($core,$alpha)");
	}
	
	
}