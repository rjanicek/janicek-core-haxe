/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
			
			J.describe("get()", function() {
				J.it("should get value at index", function() {
					var a = [[1]];
					J.expect(a.get(0, 0)).toEqual(1);
				});
			});

			J.describe("set()", function() {
				J.it("should set value at index", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.get(0, 0)).toBeNull();
					a.set(0, 0, 1);
					J.expect(a.get(0, 0)).toBe(1);
				});
			});
			
			J.describe("getIndices()", function() {
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

			J.describe("foreachY()", function() {
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

			J.describe("foreachXY()", function() {
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

			J.describe("any()", function() {
				J.it("should find index of anything in array", function() {
					var a = [
						[1, 2],
						[3, 4]
					];
					
					var index = a.any(function(value) { return value == 4; } );
					J.expect(index).toEqual( { x:1, y:1 } );
				});
			});

			J.describe("dimensions()", function() {
				J.it("should get valid dimensions of array", function() {
					var a = new Array<Array<Int>>();
					J.expect(a.dimensions()).toEqual( { x:0, y:0 } );
					a.set(5, 5, 1);
					J.expect(a.dimensions()).toEqual( { x:6, y:6 } );
				});
			});
			
			J.describe("values()", function() {
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

			J.describe("indexes()", function() {
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