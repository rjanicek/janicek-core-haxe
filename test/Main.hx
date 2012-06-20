import specs.co.janicek.core.Array2dSpec;
import specs.co.janicek.core.BaseCode64Spec;
import specs.co.janicek.core.html.CanvasCoreSpec;
import specs.co.janicek.core.math.HashCoreSpec;
import specs.co.janicek.core.math.MathCoreSpec;
import specs.co.janicek.core.PathCoreSpec;
import specs.co.janicek.core.math.PerlinNoiseSpec;
import specs.co.janicek.core.math.RandomCoreSpec;
import specs.co.janicek.core.html.ColorCoreSpec;
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
		if (!Lib.isIE) {
			Firebug.redirectTraces();
		}
		trace(Std.format("Testing..."));

		new Array2dSpec();
		new BaseCode64Spec();
		new CanvasCoreSpec();
		new ColorCoreSpec();
		new HashCoreSpec();
		new MathCoreSpec();
		new PathCoreSpec();
		new PerlinNoiseSpec();
		new RandomCoreSpec();
		new StringCoreSpec();

		Jasmine.getEnv().addReporter(Jasmine.newHtmlReporter());
		Jasmine.getEnv().execute();
		trace("Done testing.");		
	}
	
}