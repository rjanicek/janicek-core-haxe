import co.janicek.core.Array2dSpec;
import co.janicek.core.BaseCode64Spec;
import co.janicek.core.MathCoreSpec;
import co.janicek.core.PathCoreSpec;
import co.janicek.core.PerlinNoiseSpec;
import co.janicek.core.RandomCoreSpec;
import co.janicek.core.StringCore;
import co.janicek.core.StringCoreSpec;
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