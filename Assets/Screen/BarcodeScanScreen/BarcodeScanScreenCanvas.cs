﻿using UnityEngine;
using System.Collections;
using Service.ScreenAutorotateSetting;
using UnityEngine.SceneManagement;

public class BarcodeScanScreenCanvas : MonoBehaviour {
	
	private ScreenAutorotateSetting screenAutorotateSetting = new ScreenAutorotateSetting();
	public static string isbnCode;
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
	}

	/**
	 * フレーム毎に一度実行されるメソッド
	 */
	void Update () {
	}

	/**
	 * GUIイベントに応じて、フレームごとに複数回呼び出されるメソッド
	 */
	void OnGUI () {
	}

	/**
	 * Behaviour が有効/アクティブになったときに呼び出される 
	 */
	void OnEnable() {
		// 画面の回転を許可しない
		screenAutorotateSetting.setAutorotateSwichFalse();
	}

	/**
	 * Behaviour が無効/非アクティブになったときに呼び出される 
	 */
	void OnDisable() {
		// 画面の回転を許可する
		screenAutorotateSetting.setAutorotateSwichTrue();
	}

	public void moveBackPage(string str) {
		SceneManager.LoadScene ("TitleScreenView");
	}

	public void resultPage(string str) {
		isbnCode = str;
		SceneManager.LoadScene ("Screen/ScanResultScreen/ScanResultScreenView");
	}
}
