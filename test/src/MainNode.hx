package;

import specs.co.janicek.core.Array2dSpec;
import specs.co.janicek.core.BaseCode64Spec;
import specs.co.janicek.core.HashTableCoreSpec;
import specs.co.janicek.core.html.HtmlColorCoreSpec;
import specs.co.janicek.core.http.HttpCookieCoreSpec;
import specs.co.janicek.core.http.UrlCoreSpec;
import specs.co.janicek.core.LineageCoreSpec;
import specs.co.janicek.core.math.HashCoreSpec;
import specs.co.janicek.core.math.MathCoreSpec;
import specs.co.janicek.core.math.PerlinNoiseSpec;
import specs.co.janicek.core.math.RandomCoreSpec;
import specs.co.janicek.core.math.UUIDSpec;
import specs.co.janicek.core.PathCoreSpec;
import specs.co.janicek.core.NullCoreSpec;
import specs.co.janicek.core.StringCoreSpec;

/**
 * janicek-core-haxe node test runner
 * @author Richard Janicek
 */

class MainNode {
	static function main() {
		new Array2dSpec();
		new BaseCode64Spec();
		new HashCoreSpec();
		new HashTableCoreSpec();
		new HtmlColorCoreSpec();
		new HttpCookieCoreSpec();
		new LineageCoreSpec();
		new MathCoreSpec();
		new NullCoreSpec();
		new PathCoreSpec();
		new PerlinNoiseSpec();
		new RandomCoreSpec();
		new StringCoreSpec();
		new UrlCoreSpec();
		new UUIDSpec();
	}
}