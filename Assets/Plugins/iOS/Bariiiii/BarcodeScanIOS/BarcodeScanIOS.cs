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
}