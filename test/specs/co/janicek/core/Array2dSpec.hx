package specs.co.janicek.core;

import co.janicek.core.array.Array2dCore;
import jasmine.J;

using co.janicek.core.array.Array2dCore;
using Lambda;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dSpec {

	public function new() {
		J.describe("Array2DCore", function() {
			
			J.describe("get<T>( a : Array<Array<T>>, x : Int, y : Int) : T", function() {
				J.it("should get value at index", function() {
					var a = [[1]];
					J.expect(a.get(0, 0)).toEqual(1);
				});
			});

			J.describe("set<T>( a : Array<Array<T>>, x : Int, y : Int, value : T ) : Array<Array<T>>", function() {
				J.it("should set value at index", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.get(0, 0)).toBeNull();
					a.set(0, 0, 1);
					J.expect(a.get(0, 0)).toBe(1);
				});
			});
			
			J.describe("getIndices( index : Int, width : Int, blockSize = 1 ) : Array2dIndex", function() {
				J.it("should compute 2d indices from array dimensions", function() {
					J.expect(Array2dCore.getIndices(0, 10, 1)).toEqual( { x:0, y:0 } );
					J.expect(Array2dCore.getIndices(9, 10, 1)).toEqual( { x:9, y:0 } );
					J.expect(Array2dCore.getIndices(99, 10, 1)).toEqual( { x:9, y:9 } );
					J.expect(Array2dCore.getIndices(90, 10, 1)).toEqual( { x:0, y:9 } );
					
					J.expect(Array2dCore.getIndices(0, 10, 2)).toEqual( { x:0, y:0 } );
					J.expect(Array2dCore.getIndices(9 * 2, 10, 2)).toEqual( { x:9, y:0 } );
					J.expect(Array2dCore.getIndices(99 * 2, 10, 2)).toEqual( { x:9, y:9 } );
					J.expect(Array2dCore.getIndices(90 * 2, 10, 2)).toEqual( { x:0, y:9 } );
					
					J.expect(Array2dCore.getIndices(0, 46, 4)).toEqual( { x:0, y:0 } );
					J.expect(Array2dCore.getIndices(5, 6, 1)).toEqual( { x:5, y:0 } );
				});
			});

			J.describe("foreachY<T>( a : Array<Array<T>>, f : Array<T> -> Void ) : Void", function() {
				J.it("should iterate y indexes (rows)", function() {
					var a = [
						[1],
						[2]
					];
					var row = 0;
					a.foreachY(function (y):Void {
						J.expect(a.get(0, row)).toEqual(y[0]);
						row++;
					});
					J.expect(row).toEqual(a.length);
				});
			});

			J.describe("foreachXY<T>( a : Array<Array<T>>, f : Int -> Int -> T -> Void) : Void", function() {
				J.it("should iterate x,y indexes (cells)", function() {
					var a = [
						[1, 2],
						[3, 4]
					];
					a.foreachXY(function (x, y, value):Void {
						J.expect(a.get(x, y)).toEqual(value);
					});
				});
			});

			J.describe("any<T>( a : Array<Array<T>>, f : T -> Bool ) : Array2dIndex", function() {
				J.it("should find index of anything in array", function() {
					var a = [
						[1, 2],
						[3, 4]
					];
					
					var index = a.any(function(value) { return value == 4; } );
					J.expect(index).toEqual( { x:1, y:1 } );
				});
			});

			J.describe("dimensions<T>( array : Array<Array<T>> ) : Array2dIndex", function() {
				J.it("should get valid dimensions of array", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.dimensions()).toEqual( { x:0, y:0 } );
					a.set(5, 5, 1);
					J.expect(a.dimensions()).toEqual( { x:6, y:6 } );
				});
			});
			
			J.describe("values<T>( array : Array<Array<T>> ) : Iterable<T>", function() {
				J.it("should produce array value iterator", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.values().empty()).toBeTruthy();
					J.expect(a.values().count()).toEqual(0);
					a.set(0, 0, 1);
					J.expect(a.values().count()).toEqual(1);
					a.values().iter(function(value) {
						J.expect(value).toEqual(1);
					});
					a.set(10, 10, 1);
					J.expect(a.values().count()).toEqual(2);
				});
			});

			J.describe("indexes<T>( array : Array<Array<T>> ) : Iterable<Array2dIndex>", function() {
				J.it("should produce array index iterator", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.indexes().empty()).toBeTruthy();
					J.expect(a.indexes().count()).toBe(0);
					a.set(0, 0, 1);
					J.expect(a.indexes().count()).toBe(1);
					a.indexes().iter(function(index) {
						J.expect(index).toEqual( { x:0, y:0 } );
					});
					a.set(1, 1, 1);
					J.expect(a.indexes().count()).toBe(2);
					a.set(10, 10, 1);
					J.expect(a.indexes().count()).toBe(3);
				});
			});
			
		});
	}
	
}