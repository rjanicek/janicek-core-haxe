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

 import specs.co.janicek.core.Array2dSpec;
import specs.co.janicek.core.BaseCode64Spec;
import specs.co.janicek.core.html.CanvasCoreSpec;
import specs.co.janicek.core.http.HttpCookieCoreSpec;
import specs.co.janicek.core.HashTableCoreSpec;
import specs.co.janicek.core.http.UrlCoreSpec;
import specs.co.janicek.core.math.HashCoreSpec;
import specs.co.janicek.core.math.MathCoreSpec;
import specs.co.janicek.core.math.UUIDSpec;
import specs.co.janicek.core.NullCoreSpec;
import specs.co.janicek.core.PathCoreSpec;
import specs.co.janicek.core.math.PerlinNoiseSpec;
import specs.co.janicek.core.math.RandomCoreSpec;
import specs.co.janicek.core.html.HtmlColorCoreSpec;
import co.janicek.core.StringCore;
import specs.co.janicek.core.StringCoreSpec;
import haxe.Firebug;
import jasmine.Jasmine;
import js.Lib;

/**
 * ...
 * @author Richard Janicek
 */

class Main {
	
	static function main() {
		trace(Std.format("Testing..."));

		new Array2dSpec();
		new BaseCode64Spec();
		new CanvasCoreSpec();
		new HashCoreSpec();
		new HashTableCoreSpec();
		new HtmlColorCoreSpec();
		new HttpCookieCoreSpec();
		new MathCoreSpec();
		new NullCoreSpec();
		new PathCoreSpec();
		new PerlinNoiseSpec();
		new RandomCoreSpec();
		new StringCoreSpec();
		new UrlCoreSpec();
		new UUIDSpec();

		Jasmine.getEnv().addReporter(Jasmine.newHtmlReporter());
		Jasmine.getEnv().execute();
		trace("Done testing.");		
	}
	
}