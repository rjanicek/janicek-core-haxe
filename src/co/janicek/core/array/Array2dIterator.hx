package co.janicek.core.array;

using co.janicek.core.array.Array2dCore;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dIterator<T> {
	var a:Array<Array<T>>;
	var yIterator : Iterator<Array<T>>;
	var xIterator : Iterator<T>;
	var nextValue : Array2dIndex;
	var y:Int;
	var x:Int;
	
	public function new(a:Array<Array<T>>) {
		this.a = a;
		y = 0;
		x = 0;
		nextValue = null;
	}

	public function hasNext():Bool {
		if (nextValue != null) {
			return true;
		}
		
		while (y < a.length) {
			if (a[y] != null) {
				while (x < a[y].length && a[y][x] == null) {
					x++;
				}
				if (a[y][x] != null) {
					nextValue = { x:x, y:y };
					x++;
					return true;
				}
				x = 0;
			}
			y++;
		}
		
		return false;
    }

    public function next():Array2dIndex {
		var n = nextValue;
		nextValue = null;
		return n;
	}
}