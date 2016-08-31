using UnityEngine;
using System.Runtime.InteropServices;

/**
 * C#からiOSのネイティブコードを呼び出す
 */
public class GoogleLoginWebViewIOS {

	[DllImport("__Internal")]
	private static extern void googleLoginWebViewInit_ ();

	public static void googleLoginWebViewInit () {
		if (Application.platform != RuntimePlatform.OSXEditor) {
			googleLoginWebViewInit_ ();
		}
	}
}
