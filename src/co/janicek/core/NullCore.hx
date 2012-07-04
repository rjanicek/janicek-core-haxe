package co.janicek.core;

using co.janicek.core.NullCore;

/**
 * Functions for nulls.
 * @author Richard Janicek
 */

class NullCore {

	/**
	 * Tests if nullable type is null.
	 */
	public static inline function isNull<T>( nullable : Null<T> ) : Bool {
		return nullable == null;
	}
	
	/**
	 * Tests if nullable type is not null.
	 */
	public static inline function isNotNull<T>( nullable : Null<T> ) : Bool {
		return nullable != null;
	}
	
	/**
	 * Coalesce a nullable type using a default value.
	 * @return Value of nullable type if it's not null else default value.
	 */
	public static inline function coalesce<T>( nullable : Null<T>, defaultValue :  T ) : T {
		return (nullable.isNull()) ? defaultValue : nullable;
	}
	
}