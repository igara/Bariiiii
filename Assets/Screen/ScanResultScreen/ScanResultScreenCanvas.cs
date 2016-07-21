using UnityEngine;
using System.Collections;
using Service.ScreenAutorotateSetting;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using System.IO;
using System.Xml;
using System;
using System.Text.RegularExpressions;

public class ScanResultScreenCanvas : MonoBehaviour {
	private XmlDocument xmlDoc;
	private XmlNodeList xmlNodeList;
	private string isbn;

	private ScreenAutorotateSetting screenAutorotateSetting = new ScreenAutorotateSetting();

	/**
	 * インスタンス生成された時のみ実行されるメソッド
	 */
	void Awake () {
		GameObject.Find ("ISBNText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("BookText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("BookNameText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("PublisherText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("PublisherNameText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("CreatorText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("CreatorNameText").GetComponent<Text> ().enabled = false;
		GameObject.Find ("BookRawImage").GetComponent<RawImage> ().enabled = false;
		GameObject.Find ("AmazonLinkButton").GetComponent<Button> ().enabled = false;
		GameObject.Find ("AmazonLinkText").GetComponent<Text> ().enabled = false;
	}

	/**
	 * Awakeの後で
	 * 最初のフレームのアップデート前に実行されるメソッド
	 */
	void Start () {
		StartCoroutine (resultPage (BarcodeScanScreenCanvas.isbnCode));
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
		isbn = str;
		GameObject.Find ("ISBNText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("ISBNResultText").GetComponent<Text> ().text = isbn;

		string bookSearchUrl = "http://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=";
		bookSearchUrl = bookSearchUrl + isbn;
		var bookSearchWWW = new WWW(bookSearchUrl);
		yield return bookSearchWWW;

		xmlDoc = new XmlDocument();
		xmlDoc.LoadXml (DecodeHtmlChars(bookSearchWWW.text));

		// 全部配列
		xmlNodeList = xmlDoc.GetElementsByTagName("records");

		Regex titleRegex = new Regex(@"<dc:title>.*</dc:title>");
		MatchCollection titleMC = titleRegex.Matches(
			DecodeHtmlChars(xmlNodeList[0].InnerText)
		);
		string bookName = titleMC [0].Value;
		bookName = bookName.Replace("<dc:title>", "");
		bookName = bookName.Replace("&amp;", " ");
		bookName = bookName.Replace("</dc:title>", "");
		GameObject.Find ("BookText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("BookNameText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("BookNameText").GetComponent<Text> ().text = bookName;

		Regex publisherRegex = new Regex(@"<dc:publisher>.*</dc:publisher>");
		MatchCollection publisherMC = publisherRegex.Matches(
			DecodeHtmlChars(xmlNodeList[0].InnerText)
		);
		string publisherName = publisherMC [0].Value;
		publisherName = publisherName.Replace("<dc:publisher>", "");
		publisherName = publisherName.Replace("&amp;", " ");
		publisherName = publisherName.Replace("</dc:publisher>", "");
		GameObject.Find ("PublisherText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("PublisherNameText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("PublisherNameText").GetComponent<Text> ().text = publisherName;

		Regex creatorRegex = new Regex(@"<dc:creator>.*</dc:creator>");
		MatchCollection creatorMC = creatorRegex.Matches(
			DecodeHtmlChars(xmlNodeList[0].InnerText)
		);
		string creatorName = creatorMC [0].Value;
		creatorName = creatorName.Replace("<dc:creator>", "");
		creatorName = creatorName.Replace("&amp;", " ");
		creatorName = creatorName.Replace("</dc:creator>", "");
		GameObject.Find ("CreatorText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("CreatorNameText").GetComponent<Text> ().enabled = true;
		GameObject.Find ("CreatorNameText").GetComponent<Text> ().text = creatorName;

		string bookImageUrl = "http://images-jp.amazon.com/images/P/" + isbn + ".09.MZZZZZZZ.jpg";
		var bookImageWWW = new WWW(bookImageUrl);
		yield return bookImageWWW;

		GameObject.Find ("BookRawImage").GetComponent<RawImage> ().enabled = true;
		GameObject.Find ("BookRawImage").GetComponent<RawImage> ().texture = bookImageWWW.textureNonReadable;

		GameObject.Find ("AmazonLinkButton").GetComponent<Button> ().enabled = true;
		GameObject.Find ("AmazonLinkText").GetComponent<Text> ().enabled = true;
	}

	string DecodeHtmlChars(string aText) {
		string[] parts = aText.Split(new string[]{"&#x"}, StringSplitOptions.None);
		for (int i = 1; i < parts.Length; i++)
		{
			int n = parts[i].IndexOf(';');
			string number = parts[i].Substring(0,n);
			try
			{
				int unicode = Convert.ToInt32(number,16);
				parts[i] = ((char)unicode) + parts[i].Substring(n+1);
			} catch {}
		}
		return String.Join("",parts);
	}

	public void OnClickAmazonLinkButton () {
		Application.OpenURL ("https://www.amazon.co.jp/gp/aw/d/" + isbn);
	}

	public void OnClickBackButton () {
		SceneManager.LoadScene ("TitleScreenView");
	}
}
