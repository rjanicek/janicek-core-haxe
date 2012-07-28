package co.janicek.core;

/**
 * Extra Lambda functions.
 * @author Richard Janicek
 */

class LambdaCore {

	/**
	 * Returns the first element matching the function f.
	 */
	public static function first<T>( it : Iterable<Null<T>>, f : Null<T> -> Bool ) : Null<T> {
		for (x in it)
			if (f(x))
				return x;
		
		return null;
	}
	
}