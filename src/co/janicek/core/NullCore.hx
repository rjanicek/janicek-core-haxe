package co.janicek.core;

using co.janicek.core.NullCore;
using co.janicek.core.LambdaCore;

/**
 * Functions for nulls.
 * @author Richard Janicek
 */

class NullCore {

	/**
	 * Tests if nullable type is null.
	 */
	public static inline function isNull( nullable : Null<Dynamic> ) : Bool {
		return nullable == null;
	}
	
	/**
	 * Tests if nullable type is not null.
	 */
	public static inline function isNotNull( nullable : Null<Dynamic> ) : Bool {
		return nullable != null;
	}
	
	/**
	 * Coalesce a nullable type using a default value.
	 * @return Value of nullable type if it's not null else default value.
	 */
	public static inline function coalesce<T>( nullable : Null<T>, defaultValue :  Null<T> ) : Null<T> {
		return nullable.isNull() ? defaultValue : nullable;
	}
	
	/**
	 * Coalesce a list of nullable type.
	 * @return Value of first non null in list else null.
	 */
	public static function coalesceIter<T>( nullables : Iterable<Null<T>> ) : Null<T> {
		return nullables.first(function(n) { return n.isNotNull(); } );
	}
	
}