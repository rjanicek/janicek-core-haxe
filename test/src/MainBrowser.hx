package;

import js.mocha.Mocha;
import specs.co.janicek.core.Array2dSpec;
import specs.co.janicek.core.BaseCode64Spec;
import specs.co.janicek.core.EnumCoreSpec;
import specs.co.janicek.core.html.CanvasCoreSpec;
import specs.co.janicek.core.HashTableCoreSpec;
import specs.co.janicek.core.html.HtmlColorCoreSpec;
import specs.co.janicek.core.http.HttpCookieCoreSpec;
import specs.co.janicek.core.http.UrlCoreSpec;
import specs.co.janicek.core.FamilyCoreSpec;
import specs.co.janicek.core.math.GeometryCoreSpec;
import specs.co.janicek.core.math.HashCoreSpec;
import specs.co.janicek.core.math.MathCoreSpec;
import specs.co.janicek.core.math.PerlinNoiseSpec;
import specs.co.janicek.core.math.RandomCoreSpec;
import specs.co.janicek.core.math.UUIDSpec;
import specs.co.janicek.core.NullCoreSpec;
import specs.co.janicek.core.PathCoreSpec;
import specs.co.janicek.core.StringCoreSpec;

/**
 * janicek-core-haxe browser test runner
 * @author Richard Janicek
 */

class MainBrowser {
	
	static function main() {
		Mocha.setup( { ui: Ui.BDD } );
		
		new Array2dSpec();
		new BaseCode64Spec();
		new CanvasCoreSpec();
		new EnumCoreSpec();
		new FamilyCoreSpec();
		new GeometryCoreSpec();
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
		
		Mocha.run();
	}
	
}