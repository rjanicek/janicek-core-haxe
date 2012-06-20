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