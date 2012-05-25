import co.janicek.core.Array2dSpec;
import co.janicek.core.BaseCode64Spec;
import co.janicek.core.MathCoreSpec;
import co.janicek.core.PerlinSpec;
import co.janicek.core.RandomCoreSpec;
import haxe.Firebug;
import jasmine.Jasmine;
import js.Lib;

/**
 * ...
 * @author Richard Janicek
 */

class Main {
	
	static function main() {
		Firebug.redirectTraces();
		trace(Std.format("Testing..."));

		new Array2dSpec();
		new BaseCode64Spec();
		new MathCoreSpec();
		new PerlinSpec();
		new RandomCoreSpec();

		Jasmine.getEnv().addReporter(Jasmine.newTrivialReporter());
		Jasmine.getEnv().execute();
		trace("Done testing.");		
	}
	
}