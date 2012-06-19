package co.janicek.core.math;

/**
 * Hashing Algorithims
 * 
 * @author Richard Janicek
 */

class HashCore {

	/**
	 * Compute string hash using djb2 algorithim.
	 * 
	 * Has a good balance of being extremely fast, while providing a reasonable distribution of hash values.
	 * @link http://www.cse.yorku.ca/~oz/hash.html
	 */
	public static function djb2( s : String ) : Int {
		var hash = 5381;
		for (i in 0...s.length) {
            hash = ((hash << 5) + hash) + s.charCodeAt(i);
		}
        return hash;
	}
	
	/**
	 * Compute string hash using sdbm algorithim.
	 * 
	 * This algorithm was created for sdbm (a public-domain reimplementation of ndbm) database library.
	 * It was found to do well in scrambling bits, causing better distribution of the keys and fewer splits.
	 * It also happens to be a good general hashing function with good distribution.
	 * @link http://www.cse.yorku.ca/~oz/hash.html
	 */
	public static function sdbm( s : String ) : Int {
		var hash = 0;
		for (i in 0...s.length) {
			hash = s.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
		}
        return hash;
	}
	
	/**
	 * Java's String.hashCode() method implemented in Haxe.
	 * @link http://docs.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#hashCode%28%29
	 */
	public static function javaHashCode( s : String ) : Int {
		var hash = 0;
		if (s.length == 0) return hash;
		for (i in 0...s.length) {
			hash = ((hash << 5) - hash) + s.charCodeAt(i);
			hash = hash & hash; // Convert to 32bit integer
		}
        return hash;
	}

}