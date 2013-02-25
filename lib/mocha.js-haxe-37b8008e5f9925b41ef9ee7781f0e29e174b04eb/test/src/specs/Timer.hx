package specs;
import js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class Timer {
	public static function delay( f : Void->Void, delayMs : Int ) {
		if (untyped __js__("typeof setTimeout === 'undefined'"))
			untyped window.setTimeout(f, delayMs);
		else
			untyped setTimeout(f, delayMs);
	}
}