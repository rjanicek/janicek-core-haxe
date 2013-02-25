package js.mocha;

using js.mocha.Mocha;
using Reflect;
using Std;

enum Ui {
	BDD;
	EXPORTS;
	QUNIT;
	TDD;
}

enum Reporter {
	DOC;
	DOT;
	HTML;
	HTMLCOV;
	JSON;
	JSONCOV;
	JSONSTREAM;
	LANDING;
	LIST;
	MIN;
	NYAN;
	PROGRESS;
	SPEC;
	TAP;
	TEAMCITY;
	XUNIT;
}

/**
 * Haxe bindings for Mocha.js - simple, flexible, fun javascript test
 * framework for node.js & the browser. (BDD, TDD, QUnit styles via
 * interfaces)
 *
 * @see https://github.com/visionmedia/mocha
 * @author Richard Janicek
 */
class Mocha {

	private static var _mocha : Dynamic = untyped __js__("mocha");
	
	/**
	 * Setup mocha with options.
	 * -reporter does not work in browser, HTML is used by default
	 * -grep is broken in browser
	 * @param timeout in milliseconds (optional)
	 */
	public static function setup( opts : {ui : Ui, ?reporter : Reporter, ?globals : Array<String>, ?timeout : Int, ?ignoreLeaks : Bool, ?grep : String} ) : Void {
		
		opts.setField("ui", opts.ui.string().toLowerCase());

		if (opts.hasField("reporter"))
			opts.setField("reporter", opts.reporter.string().toLowerCase());
			
		_mocha.setup(opts);
	}
	
	/**
	 * Run tests.
	 */
	public static function run() : Void {
		_mocha.run();
	}

	/**
	 * timeout(>0) - set timeout in milliseconds
	 * timeout("ms()") - set timeout using ms.js miliseconds conversion utility
	 * timeout(0) - disable timeout
	 * timeout() - get timeout
	 */
	@:overload(function() : Int{})
	@:overload(function( ms : String ) : Mocha { } )
	public static function timeout( milliseconds : Int ) : Mocha {
		return _mocha.timeout(milliseconds);
	}

	/**
	 * Specify the reporter to use.
	 * @param	reporter Name of reporter to use.
	 */
	public static function reporter( reporter : String ) : Mocha {
		return _mocha.reporter(reporter);
	}
}

@:native("this")
extern class This {

	/**
	 * test-specific timeouts
	 * timeout(>0) - set timeout in milliseconds
	 * timeout("ms()") - set timeout using ms.js miliseconds conversion utility
	 * timeout(0) - disable timeout
	 * timeout() - get timeout
	 */	
	@:overload(function() : Int{})
	@:overload(function( ms : String ) : Void { } )
	public static function timeout( milliseconds : Int ) : Void; 
	
	/**
	 * Specify test-specific “slow” test threshold, defaulting to 75ms. Mocha uses this to highlight test-cases that are taking too long.
	 * slow(>0) - set slow test threshold in milliseconds
	 * slow("ms()") - set slow test threshold using ms.js miliseconds conversion utility
	 * slow() - get slow test threshold
	 */
	@:overload(function() : Int{})
	@:overload(function( ms : String ) : Void { } )
	public static function slow( milliseconds : Int ) : Void;
}

class M {
	
	// ------------------------------------------------------------------------
	// BDD
	
	public static function describe( description : String, spec : Void -> Void ) : Void {
		untyped __js__("describe(description, spec)");
	}

	/**
	 * Only run these tests.
	 */
	public static function describeOnly( description : String, spec : Void -> Void ) : Void {
		untyped __js__("describe.only(description, spec)");
	}

	/**
	 * Skip these tests.
	 */
	public static function describeSkip( description : String, spec : Void -> Void ) : Void {
		untyped __js__("describe.skip(description, spec)");
	}

	@:overload(function( description : String, func : (Void->Void)->Void ) : Void{})
	public static function it( description : String, func : Void -> Void ) : Void {
		untyped __js__("it(description, func)");
	}

	/**
	 * Only run this test.
	 */
	@:overload(function( description : String, func : (Void->Void)->Void ) : Void{})
	public static function itOnly( description : String, func : Void -> Void ) : Void {
		untyped __js__("it.only(description, func)");
	}

	/**
	 * Skip this test.
	 */
	@:overload(function( description : String, func : (Void->Void)->Void ) : Void{})
	public static function itSkip( description : String, func : Void -> Void ) : Void {
		untyped __js__("it.skip(description, func)");
	}

	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function before( func : Void -> Void ) : Void {
		untyped __js__("before(func)");
	}

	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function after( func : Void -> Void ) : Void {
		untyped __js__("after(func)");
	}
	
	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function beforeEach( func : Void -> Void ) : Void {
		untyped __js__("beforeEach(func)");
	}
	
	
	@:overload(function( func : (Void->Void)->Void ) : Void{})
	public static function afterEach( func : Void -> Void ) : Void {
		untyped __js__("afterEach(func)");
	}
	
	// ------------------------------------------------------------------------
	// TDD
	
	public static function suite( description : String, suite : Void -> Void ) : Void {
		untyped __js__("suite(description, suite)");
	}

	public static function setup( func : Void -> Void ) : Void {
		untyped __js__("setup(func)");
	}

	public static function test( description : String, test : Void -> Void ) : Void {
		untyped __js__("test(description, test)");
	}
	
	public static function teardown( func : Void -> Void ) : Void {
		untyped __js__("teardown(func)");
	}	
}
