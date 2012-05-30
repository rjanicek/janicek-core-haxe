package co.janicek.core;

import jasmine.J;

using co.janicek.core.array.Array2dCore;
using Lambda;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dSpec {

	public function new() {
		J.describe("Array2D", function() {
			
			J.it("should set and get value at index", function() {
				var a = new Array<Array<Int>>();
				J.expect(a.get(0, 0)).toBeNull();
				a.set(0, 0, 1);
				J.expect(a.get(0, 0)).toBe(1);
			});
			
			J.it("should have valid iterator", function() {
				var a = new Array<Array<Int>>();
				J.expect(a.indexes().count()).toBe(0);
				a.set(0, 0, 1);
				J.expect(a.indexes().count()).toBe(1);
				a.set(1, 1, 1);
				J.expect(a.indexes().count()).toBe(2);
				a.set(10, 10, 1);
				J.expect(a.indexes().count()).toBe(3);
			});
			
			J.it("should have valid dimensions", function() {
				var a = new Array<Array<Int>>();
				J.expect(a.dimensions().x).toBe(0);
				J.expect(a.dimensions().y).toBe(0);
				a.set(5, 5, 1);
				J.expect(a.dimensions().x).toBe(6);
				J.expect(a.dimensions().y).toBe(6);
			});
			
		});
	}
	
}