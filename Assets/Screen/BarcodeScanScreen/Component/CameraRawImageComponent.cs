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
		#if UNITY_IPHONE
		BarcodeScanIOS.barcordScanInit ();
		#endif
		#if UNITY_ANDROID

		AndroidJavaClass unityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer"); 
		AndroidJavaObject currentUnityActivity = unityPlayer.GetStatic<AndroidJavaObject>("currentActivity"); 

		AndroidJavaClass plugin = new AndroidJavaClass("work.syonet.bariiiii.ActivityLauncher"); 
		plugin.CallStatic("launchActivity", "work.syonet.bariiiii.BarcodeScanAndroidActivity", currentUnityActivity );
		#endif
	}

	/**
	 * Awakeの後で
	 * 最初のフレームのアップデート前に実行されるメソッド
	 */
	void Start () {
		#if UNITY_EDITOR
		reader = new BarcodeReader ();
		cameraRawImage = GameObject.Find ("CameraRawImage").GetComponent<RawImage> ();
		webcamTexture = new WebCamTexture(height, width);
		webcamTexture.Play();
		#endif
	}

	/**
	 * フレーム毎に一度実行されるメソッド
	 */
	void Update () {
		#if UNITY_EDITOR
		cameraRawImage.texture = webcamTexture;
		readTextFronCode ();
		#endif
	}

	void readTextFronCode() {
		#if UNITY_EDITOR
		color = webcamTexture.GetPixels32();
		result = reader.Decode(color, width, height);
		if (result.Text != null) {
			
//			GameObject.Find ("oooooText").GetComponent<Text> ().gameObject.SetActive (false);
		}
		#endif
	}

	/**
	 * GUIイベントに応じて、フレームごとに複数回呼び出されるメソッド
	 */
	void OnGUI() {
	}

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
