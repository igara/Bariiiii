using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;

using System.Threading;

using ZXing;
using ZXing.QrCode;
using ZXing.Common;
using Service.ScreenAutorotateSetting;

public class CameraRawImageComponent : MonoBehaviour {

	private ScreenAutorotateSetting screenAutorotateSetting = new ScreenAutorotateSetting();

	private BarcodeReader reader;
	private Color32[] color;
	private Result result;
	private WebCamTexture webcamTexture;
	private int height = Screen.height;
	private int width = Screen.width;
	private float timeleft;
	private RawImage cameraRawImage;

	/**
	 * インスタンス生成された時のみ実行されるメソッド
	 */
	void Awake () {
		BarcodeScanIOS.barcordScanInit ();
	}
	#if !UNITY_IPHONE
	/**
	 * Awakeの後で
	 * 最初のフレームのアップデート前に実行されるメソッド
	 */
	void Start () {
		reader = new BarcodeReader ();
		cameraRawImage = GameObject.Find ("CameraRawImage").GetComponent<RawImage> ();
		webcamTexture = new WebCamTexture(height, width);
		webcamTexture.Play();
	}

	/**
	 * フレーム毎に一度実行されるメソッド
	 */
	void Update () {
		cameraRawImage.texture = webcamTexture;
		readTextFronCode ();
	}

	void readTextFronCode() {
		color = webcamTexture.GetPixels32();
		result = reader.Decode(color, width, height);
		if (result.Text != null) {
			
//			GameObject.Find ("oooooText").GetComponent<Text> ().gameObject.SetActive (false);
		}
	}

	/**
	 * GUIイベントに応じて、フレームごとに複数回呼び出されるメソッド
	 */
	void OnGUI() {
	}
	#endif

	/**
	 * Behaviour が有効/アクティブになったときに呼び出される 
	 */
	void OnEnable() {
		// 画面の回転を許可しない
		screenAutorotateSetting.setAutorotateSwichFalse();
		// immersiveモードを解除
		Screen.fullScreen = false;
	}

	/**
	 * Behaviour が無効/非アクティブになったときに呼び出される 
	 */
	void OnDisable() {
		// 画面の回転を許可する
		screenAutorotateSetting.setAutorotateSwichTrue();
	}
}
