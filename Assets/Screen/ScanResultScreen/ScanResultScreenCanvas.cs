using UnityEngine;
using System.Collections;
using Service.ScreenAutorotateSetting;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using System.IO;
using System.Xml;

public class ScanResultScreenCanvas : MonoBehaviour {
	private XmlDocument xmlDoc;
	private XmlNodeList nodeListtext;

	private ScreenAutorotateSetting screenAutorotateSetting = new ScreenAutorotateSetting();

	/**
	 * インスタンス生成された時のみ実行されるメソッド
	 */
	void Awake () {
		GameObject.Find ("ISBNText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().enabled = false;

	}

	/**
	 * Awakeの後で
	 * 最初のフレームのアップデート前に実行されるメソッド
	 */
	void Start () {
		resultPage (BarcodeScanScreenCanvas.isbnCode);
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

	public IEnumerator resultPage(string str) {
		GameObject.Find ("ISBNText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().text = str;
		string baseUrl = "http://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=";
		string url = baseUrl + str;
		WWW www = new WWW(url);
		yield return www;
		if(www.error != null) {
			Debug.Log("Error!");
		} else {
			Debug.Log("Success");
			xmlDoc = new XmlDocument();
			xmlDoc.LoadXml(www.text);

			// 目的のノードだけを取り出す
			nodeListtext = xmlDoc.GetElementsByTagName("version");
			foreach(XmlNode levelInfo in nodeListtext){
				Debug.Log(levelInfo.Name.ToString());
				XmlNodeList levelcontent = levelInfo.ChildNodes;
				foreach(XmlNode levelsItens in levelcontent){
					foreach(XmlNode word in levelsItens){
						print (baseUrl);
						print (nodeListtext);
						if(word.Name == "surface")
						{
							Debug.Log(word.InnerText.ToString());
						}
					}

				}
			}
		}
	}
}
