using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;

using System.Threading;

using ZXing;
using ZXing.QrCode;
using ZXing.Common;

public class CameraRawImageComponent : MonoBehaviour {

	private WebCamTexture webcamTexture;
	private Color32[] color32;
	private WebCamDevice[] devices;

	/**
	 * インスタンス生成された時のみ実行されるメソッド
	 */
	void Awake () {
		
	}

	/**
	 * Awakeの後で
	 * 最初のフレームのアップデート前に実行されるメソッド
	 */
	void Start () {
		devices = WebCamTexture.devices;
		webcamTexture = new WebCamTexture(devices[0].name, Screen.height, Screen.width);
		GetComponent<RawImage> ().material.mainTexture = webcamTexture;
		GetComponent<RawImage> ().texture = webcamTexture;
		webcamTexture.Play();
	}

	/**
	 * フレーム毎に一度実行されるメソッド
	 */
	void Update () {
		if (Input.GetKeyDown (KeyCode.Space) || Input.touchCount > 0) {
			color32 = webcamTexture.GetPixels32();
			Texture2D texture = new Texture2D(Screen.width, Screen.height);
			GameObject.Find ("RawImage").GetComponent<RawImage> ().material.mainTexture = texture;
			texture.SetPixels32(color32);
			read ();
			texture.Apply();
		}
	}

	void read() {
		BarcodeReader reader = new BarcodeReader ();
		Result result = reader.Decode (color32, Screen.width, Screen.height);
		if (result.Text != null || result.Text != String.Empty) {
			print (result.Text);
		}
	}
	/**
	 * GUIイベントに応じて、フレームごとに複数回呼び出されるメソッド
	 */
	void OnGUI() {

	}
}
