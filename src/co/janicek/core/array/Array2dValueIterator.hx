package co.janicek.core.array;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dValueIterator<T> {
	var yIterator : Iterator<Array<T>>;
	var xIterator : Iterator<T>;
	var nextValue : T;
	
	public function new(a:Array<Array<T>>) {
		yIterator = a.iterator();
		xIterator = null;
		nextValue = null;
	}

	public function hasNext():Bool {
		if (nextValue != null) {
			return true;
		}
		
		if (xIterator != null) {
			while (xIterator.hasNext()) {
				nextValue = xIterator.next();
				if (nextValue != null) {
					return true;
				}
			}
		}
		
		while (yIterator.hasNext()) {
			var z = yIterator.next();
			if (z != null) {
				xIterator = z.iterator();
				return hasNext();
			}
		}		
		
		return false;
    }

    public function next():T {
		var n = nextValue;
		nextValue = null;
        return n;
    }
}