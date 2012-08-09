/**
 * Janicek Core Haxe
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek <r@janicek.co>
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

package specs.co.janicek.core.html;

import co.janicek.core.html.CanvasCore;
import html5.Image;
import html5.ImageData;
import jasmine.J;

using co.janicek.core.html.CanvasCore;
using co.janicek.core.array.Array2dCore;

/**
 * ...
 * @author Richard Janicek
 */

class CanvasCoreSpec {

	public function new() {
		J.describe("CanvasCore", function() {
			
			J.describe("loadImage()", function () {
				J.it("should load an image from a URL", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						J.expect(image.complete).toBeTruthy();
						J.expect(image.width).toEqual(3);
						J.expect(image.height).toEqual(3);
					});
				});
			});
			
			J.describe("getImageData()", function () {
				J.it("should get ImageData from an Image", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						var imageData = image.getImageData();
						J.expect(imageData.width).toEqual(3);
						J.expect(imageData.height).toEqual(3);
						J.expect(imageData.data.length).toEqual(3 * 3 * CanvasCore.CANVAS_ELEMENTS_PER_PIXEL);
					});
				});
			});	
			
			J.describe("makeBitmap()", function () {
				J.it("should convert html5 ImageData to an Array of Bool", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						var imageData = image.getImageData();
						var bitmap = imageData.makeAverageThresholdBitmap(127).invertBitmap();
						var o = false;
						var x = true;
						var checkerboard = [
							[x, o, x],
							[o, x, o],
							[x, o, x]
						];
						J.expect(bitmap).toEqual(checkerboard);
					});
				});
			});
			
		});
	}
	
}