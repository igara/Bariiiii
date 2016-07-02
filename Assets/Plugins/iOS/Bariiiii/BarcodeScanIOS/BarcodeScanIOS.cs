using UnityEngine;
using System.Runtime.InteropServices;

public class BarcodeScanIOS {
    [DllImport("__Internal")]
	private static extern void barcordScanInit_ ();

	public static void barcordScanInit () {
		if (Application.platform != RuntimePlatform.OSXEditor) {
			barcordScanInit_ ();
		}
    }

	[DllImport("__Internal")]
	private static extern void open_ ();

	public static void open () {
		if (Application.platform != RuntimePlatform.OSXEditor) {
			open_ ();
		}
    }
}