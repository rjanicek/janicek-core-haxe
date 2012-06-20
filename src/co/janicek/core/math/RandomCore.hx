package co.janicek.core.math;

import co.janicek.core.math.MathCore;

/**
 * Pseudo random number generator (PRNG) using a functional style.
*/
class RandomCore {
	
	/**
	 * (a Mersenne prime M31) modulus constant = 2^31 - 1 = 0x7ffffffe
	 */
	private inline static var MPM = 2147483647.0;
	
	/**
	 * (a primitive root modulo M31)
	 */
	private inline static var MINSTD = 16807.0;

	/**
	 * Make a non deterministic random seed using standard libraries.
	 * @return Non deterministic random seed.
	 */
	public static function makeRandomSeed() : Int {
        return Math.floor(Math.random() * MPM);
    }
	
	/**
	 * Park-Miller-Carta algorithm.
	 * @see http://lab.polygonal.de/?p=162
	 * @see http://code.google.com/p/polygonal/source/browse/trunk/src/lib/de/polygonal/core/math/random/ParkMiller.hx?r=547 
	 * @see http://en.wikipedia.org/wiki/Lehmer_random_number_generator
	 * @return Returns the next pseudo-random int value .
	 */
	public static inline function nextParkMiller( seed : Int ) : Int {
		return cast ((seed * MINSTD) % MPM);
	}

    /**
	 * Linear congruential generator using GLIBC constants.
     * 
	 * @see http://en.wikipedia.org/wiki/Linear_congruential_generator
	 * @see https://github.com/aduros/flambe/blob/master/src/flambe/util/Random.hx
	 * @return Returns an integer in [0, INT_MAX)
     */
    public static inline function nextLCG( seed : Int ) : Int {
        // These constants borrowed from glibc
        // Force float multiplication here to avoid overflow in Flash (and keep parity with JS)
        return cast ((1103515245.0 * seed + 12345) % MPM);
    }

	/**
	 * Returns the pseudo-random double value x in the range 0 <= x < 1.
	 */
	public static inline function toFloat( seed : Int ) : Float {
		return seed / MPM;
	}
	
	/**
	 * Returns a pseudo-random boolean value (coin flip).
	 */
	public static inline function toBool( seed : Int ) : Bool {
		return toFloat(seed) > 0.5;
	}
	
		/**
	 * Returns a pseudo-random double value x in the range min <= x <= max.
	 */
	public static inline function toFloatRange( seed : Int, min : Float, max : Float ) : Float {
		return min + (max - min) * toFloat(seed);
	}
	
	/**
	 * Returns a pseudo-random integral value x in the range min <= x <= max.
	 */
	public static inline function toIntRange( seed : Int, min : Int, max : Int ) : Int {
		return Math.round((min - 0.4999) + ((max + 0.4999) - (min - 0.4999)) * toFloat(seed));
	}
	
	/**
	 * Converts a string to a seed.
	 * Lets you use words as seeds.
	 */
	public static function stringToSeed( s : String ) : Int {
        return Std.int(HashCore.djb2(s) % MPM);
	}
}