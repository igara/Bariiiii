using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class TitleScreenController : MonoBehaviour {

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
	 * Scanボタンを押下した時の処理
	 */
	public void OnClickBarcordScanButton () {
		SceneManager.LoadScene("BarcodeScanScreen/BarcodeScanScreenView");
	}

	/**
	 * Sampleボタンを押下した時の処理
	 */
	public void OnClickBarcordSampleScanButton () {
		SceneManager.LoadScene("iOSBarCodeExpert/Scenes/mainmenu/mainmenu");
	}
}
