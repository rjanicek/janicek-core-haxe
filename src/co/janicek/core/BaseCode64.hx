package co.janicek.core;
import haxe.BaseCode;
import haxe.io.Bytes;
import haxe.io.BytesData;

class BaseCode64 {

	private static inline var BASE_64_ENCODINGS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	private static inline var BASE_64_PADDING = "=";
	
	public static function base64EncodeBytesData( bytesData : BytesData ) : String {
		var bytes = Bytes.ofData(bytesData);
		var encodings = Bytes.ofString(BASE_64_ENCODINGS);
		var base64 = new BaseCode(encodings).encodeBytes(bytes).toString();
		
		var remainder = base64.length % 4;

		if (remainder > 1) {
			base64 += BASE_64_PADDING;
		}

		if (remainder == 2) {
			base64 += BASE_64_PADDING;
		}
		
		return base64;
	}

	public static function base64DecodeBytesData( base64 : String ) : BytesData {
		var paddingSize = -1;
		if (base64.charAt(base64.length - 2) == BASE_64_PADDING) {
			paddingSize = 2;
		}
		else if (base64.charAt(base64.length - 1) == BASE_64_PADDING) {
			paddingSize = 1;
		}
		
		if (paddingSize != -1) {
			base64 = base64.substr(0, base64.length - paddingSize);
		}
		
		var encodings = Bytes.ofString(BASE_64_ENCODINGS);
		var bytes = new BaseCode(encodings).decodeBytes(Bytes.ofString(base64));
		return bytes.getData();
	}
	
	public static function base64EncodeString( string : String ) : String {
		var bytesData = Bytes.ofString(string).getData();
		return BaseCode64.base64EncodeBytesData(bytesData);
	}
	
	public static function base64DecodeString( base64 : String ) : String {
		return Bytes.ofData((BaseCode64.base64DecodeBytesData(base64))).toString();
	}
	
}