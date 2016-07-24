using UnityEngine;
using System.Collections;
using Service.ScreenAutorotateSetting;
using UnityEngine.SceneManagement;

public class TitleScreenCanvas : MonoBehaviour {

	private ScreenAutorotateSetting screenAutorotateSetting = new ScreenAutorotateSetting();

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

	/**
	 * ARScanボタンを押下した時の処理
	 */
	public void OnClickARScanButton () {
		SceneManager.LoadScene("Screen/ARScanScreen/ARScanScreenView");
	}

	/**
	 * BarcodeScanボタンを押下した時の処理
	 */
	public void OnClickBarcordScanButton () {
		SceneManager.LoadScene("Screen/BarcodeScanScreen/BarcodeScanScreenView");
	}

	/**
	 * Loginボタンを押下した時の処理
	 */
	public void OnClickGoogleLoginButton () {
		SceneManager.LoadScene("Screen/GoogleLoginScreen/GoogleLoginScreenView");
	}
}
