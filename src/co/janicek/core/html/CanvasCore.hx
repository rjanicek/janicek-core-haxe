package co.janicek.core.html;

import co.janicek.core.array.Array2dCore;
import co.janicek.core.math.MathCore;
import html5.Canvas;
import html5.CanvasPixelArray;
import html5.CanvasRenderingContext2D;
import html5.Image;
import html5.ImageData;
import js.Lib;

using co.janicek.core.math.MathCore;
using co.janicek.core.math.RandomCore;
using co.janicek.core.array.Array2dCore;

/**
 * ...
 * @author Richard Janicek
 */

class CanvasCore {

	public static inline var CANVAS_ELEMENTS_PER_PIXEL = 4;
	public static inline var CANVAS_RED_OFFSET = 0;
	public static inline var CANVAS_GREEN_OFFSET = 1;
	public static inline var CANVAS_BLUE_OFFSET = 2;
	public static inline var CANVAS_ALPHA_OFFSET = 3;

	/**
	 * Higher order function.
	 * Iterate canvas pixel array color channels.
	 * Functor is called with red, green, blue, and alpha channel values for each pixel.
	 * Functor can return new color channel values which will be assigned to pixel. Null values are ignored.
	 * 
	 * Can be used to analyze and transform a canvas pixel array.
	 */
	public static function renderCanvasPixelArray( imageData : ImageData, f : Int -> Int -> Int -> Int -> Int -> Null<{red : Null<Int>, green : Null<Int>, blue : Null<Int>, alpha : Null<Int>}> ) : Void {
		var pixels = imageData.data;
		var index:Int;
		for (i in 0...Std.int(pixels.length / CANVAS_ELEMENTS_PER_PIXEL)) {
			index = i * CANVAS_ELEMENTS_PER_PIXEL;
			var newValues = f(index, pixels[index + CANVAS_RED_OFFSET], pixels[index + CANVAS_GREEN_OFFSET], pixels[index + CANVAS_BLUE_OFFSET], pixels[index + CANVAS_ALPHA_OFFSET]);
			if (newValues != null) {
				if (newValues.red != null) {
					pixels[index + CANVAS_RED_OFFSET] = newValues.red;
				}
				if (newValues.green != null) {
					pixels[index + CANVAS_GREEN_OFFSET] = newValues.green;
				}
				if (newValues.blue != null) {
					pixels[index + CANVAS_BLUE_OFFSET] = newValues.blue;
				}
				if (newValues.alpha != null) {
					pixels[index + CANVAS_ALPHA_OFFSET] = newValues.alpha;
				}
			}
		}
	}

	/**
	 * Add random noise to image data by modifying each pixel color channel by a random amount between + and - noiseLevel.
	 * @param	noiseLevel Value between 1 and 255
	 * @param	grayScale True to change all color channels by same amount so only brightness of pixel is changed and not color. Doesn't affect alpha. (Default = false)
	 * @param	red Add noise to red channel. (Default = true)
	 * @param	green Add noise to green channel. (Default = true)
	 * @param	blue Add noise to blue channel. (Default = true)
	 * @param	alpha Add noise to alpha channel. (Default = false)
	 * @return	New bitmap containing the bitmap passed in with noise added.
	 */	
	public static function addNoise( pixelData : ImageData, randomSeed : Int, noiseLevel : Int, grayScale = false, changeRed = true, changeGreen = true, changeBlue = true, changeAlpha = false) : ImageData {
		noiseLevel = MathCore.clampInt(noiseLevel, 1, 255);
		var delta:Int;
		
		renderCanvasPixelArray(pixelData, function(index, red, green, blue, alpha) {
			delta = (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel);
			var newColors = { red:null, green:null, blue:null, alpha:null };
			if (changeRed) {
				newColors.red = red + delta;
			}
			if (changeGreen) {
				newColors.green = green + (grayScale ? delta : (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel));
			}
			if (changeBlue) {
				newColors.blue = blue + (grayScale ? delta : (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel));
			}
			if (changeAlpha) {
				newColors.alpha = alpha + (randomSeed = randomSeed.nextParkMiller()).toIntRange( -noiseLevel, noiseLevel);
			}
			return newColors;
		});
		
		return pixelData;
	}
	
	public static function addNoiseToCanvas(context:CanvasRenderingContext2D, width:Float, height:Float, randomSeed:Int, noiseLevel:Int, grayScale = false, red = true, green = true, blue = true, alpha = false) {
		var imageData = context.getImageData(0, 0, width, height);
		imageData = addNoise(imageData, randomSeed, noiseLevel, grayScale, red, green, blue, alpha);
		context.putImageData(imageData, 0, 0);
	}	
	
	// ------------------------------------------------------------------------
	// Images
	
	public static function loadImage( url : String, f : Image -> Void ) : Void {
		var image:Image = cast Lib.document.createElement("img");
		image.onload = function() {
			f(image);
		}
		image.src = url;
	}
	
	public static function getImageData( image : Image ) : ImageData {
		var canvas:Canvas = cast Lib.document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		return imageData;
	}
	
	/**
	 * Converts HTML5 image data to a 2D Array of Bool.
	 * @param	array
	 * @param	threshold Ints > threshold
	 */
	public static function makeAverageThresholdBitmap( imageData : ImageData, threshold : Int, invert = false ) : Array<Array<Bool>> {
		threshold = threshold.clampInt(0, 255);
		return makeBitmap(imageData, function(red, green, blue, alpha) {
			return invert ? [red, green, blue].averageInt() < threshold : [red, green, blue].averageInt() > threshold;
		});
	}
	
	public static function makeBitmap( imageData : ImageData, f : Int -> Int -> Int -> Int -> Bool ) : Array<Array<Bool>> {
		var array = new Array<Array<Bool>>();
		renderCanvasPixelArray(imageData, function(index, red, green, blue, alpha) {
			var indices = Array2dCore.getIndices(index, Std.int(imageData.width), CANVAS_ELEMENTS_PER_PIXEL);
			array.set(indices.x, indices.y, f(red, green, blue, alpha));
			return null;
		});
		return array;
	}

}