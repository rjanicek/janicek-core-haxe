import specs.co.janicek.core.Array2dSpec;
import specs.co.janicek.core.BaseCode64Spec;
import specs.co.janicek.core.html.CanvasCoreSpec;
import specs.co.janicek.core.http.HttpCookieCoreSpec;
import specs.co.janicek.core.ParseCoreSpec;
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
		new HtmlColorCoreSpec();
		new HttpCookieCoreSpec();
		new MathCoreSpec();
		new NullCoreSpec();
		new ParseCoreSpec();
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