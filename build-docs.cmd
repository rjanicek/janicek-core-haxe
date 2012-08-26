del /q /s doc\bin\tmp\*
del /q /s test\browser\api\*
doc\chxdoc-1.2.0\chxdoc --file=doc/bin/janicek-core.xml --templatesDir=doc/chxdoc-1.2.0/templates --template=monaco --title=co.janicek.core --subtitle=https://github.com/rjanicek/janicek-core-haxe --tmpDir=doc/bin/tmp --output=test/browser/api --developer=true --policy=deny --allow=co.janicek.*
