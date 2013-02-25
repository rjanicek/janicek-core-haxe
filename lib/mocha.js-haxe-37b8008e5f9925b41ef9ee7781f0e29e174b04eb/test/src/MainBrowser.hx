package;

import js.mocha.Mocha;
import specs.ExpectSpec;
import specs.MochaSpec;

using js.mocha.Mocha;

/**
 * ...
 * @author Richard Janicek
 */

class MainBrowser {
	
	static function main() {
		
			
		Mocha.setup( { ui: Ui.BDD } );
		new MochaSpec();
		new ExpectSpec();
		Mocha.run();
	}
	
}