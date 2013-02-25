package js.expect;

/**
 * Haxe bindings for expect.js - Minimalistic BDD-style assertions for Node.JS
 * and the browser.
 *
 * @see https://github.com/LearnBoost/expect.js
 * @author Richard Janicek
 */
class E {

	private static var _expect : Dynamic;

	static function __init__() untyped {
		if (__js__("typeof expect !== 'undefined'"))
			_expect = __js__("expect");
		else if (__js__("typeof require !== 'undefined'"))
			_expect = __js__("require('expect.js')");
		else
			throw "make sure to include expect.js";
	}
	
	public static function expect( ?actual : Dynamic ) : Expect {
		return _expect(actual);
	}
	
	/**
	 * A clever alias for expect so the library can be used in mix-in mode
	 * using "should" grammer.
	 *
	 * @example true.should().be.ok();
	 */
	public static function should( ?actual : Dynamic ) : Expect {
		return _expect(actual);
	}
	
	public static var version( get_version, never ) : String;
	private static function get_version() : String {
		return _expect.version;
	}

}

typedef Expect = {
	var to(default, never) : Expect;
	var be(default, never) : Expect;
	var not(default, never) : Expect;
	var have(default, never) : Expect;
	var only(default, never) : Expect;
	var and(default, never) : Expect;
	
	/**
	 * asserts typeof with support for array type and instanceof
	 */
	function a( expected : Dynamic ) : Expect;
	
	/**
	 * asserts >
	 */
	function above( threshold : Float ) : Expect;
	
	/**
	 * asserts typeof with support for array type and instanceof
	 */
	function an( expected : Dynamic ) : Expect;
	
	/**
	 * asserts <
	 */
	function below( threshold : Float ) : Expect;
	
	/**
	 * asserts indexOf for an array or string
	 */
	function contain(expected : Dynamic ) : Expect;
	
	/**
	 * asserts that an array is empty or not
	 */
	function empty() : Expect;
	
	/**
	 * asserts loose equality that works with objects
	 */
	function eql( expected : Dynamic ) : Expect;
	
	/**
	 * asserts === equality
	 */
	function equal( expected : Dynamic ) : Expect;
	
	/**
	 * explicitly forces failure
	 */
	function fail( ?message : String ) : Expect;
	
	/**
	 * asserts >
	 */
	function greaterThan( threshold : Float ) : Expect;
	
	/**
	 * asserts the presence of a key. Supports the only modifier
	 */
	function key( expected : String ) : Expect;
	
	/**
	 * asserts the presence of a key. Supports the only modifier
	 */
	@:overload(function( expected : Array<String> ) : Expect{})
	function keys( expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String, ?expected : String ) : Expect;
	
	/**
	 * asserts array .length
	 */
	function length( expected : Int ) : Expect;
		
	/**
	 * asserts <
	 */
	function lessThan( threshold : Float ) : Expect;
	
	/**
	 * asserts that the value is truthy or not
	 */
	function ok() : Expect;
	
	/**
	 * asserts presence of an own property (and value optionally)
	 */
	function property( name : String, ?value : Dynamic ) : Expect;
	
	/**
	 * asserts that the Function throws or not when called
	 */
	function throwException( ?fn : Dynamic->Void ) : Expect;
	
	/**
	 * asserts a number within a range
	 */
	function within( minimum : Float, maximum : Float ) : Expect;
}

class ExpectMixins {
	/**
	 * asserts === equality
	 */
	public static function toBe( e : Expect, expected : Dynamic ) : Expect {
		return untyped __js__("e.be(expected)");
	}
	
	/**
	 * asserts String regular expression match
	 */
	public static function match( e : Expect, pattern : String, ?modifiers : String ) : Expect {
		return untyped __js__("e.match(new RegExp(pattern,modifiers))");
	}
	
	/**
	 * asserts that the Function throws or not when called
	 */
	public static function throwExceptionMatch( e : Expect, pattern : String, ?modifiers : String ) : Expect {
		return untyped __js__("e.throwException(new RegExp(pattern,modifiers))");
	}
	
}