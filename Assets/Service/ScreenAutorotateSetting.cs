using UnityEngine;
using System.Collections;
namespace Service.ScreenAutorotateSetting
{
	/**
	 * 画面の回転について扱うクラス
	 */
	public class ScreenAutorotateSetting
	{
		/**
		 * 端末を横にした時など画面を回転させないように設定する
		 */
		public void setAutorotateSwichFalse() {
			// 縦の回転を許可しない
			Screen.autorotateToPortrait = false;
			// 左の回転を許可しない
			Screen.autorotateToLandscapeLeft = false;
			// 右の回転を許可しない
			Screen.autorotateToLandscapeRight = false;
			// 上下反転を許可しない
			Screen.autorotateToPortraitUpsideDown = false;
		}

		/**
		 * 端末を横にした時など画面を回転するように設定する
		 */
		public void setAutorotateSwichTrue() {
			// 縦の回転を許可する
			Screen.autorotateToPortrait = true;
			// 左の回転を許可する
			Screen.autorotateToLandscapeLeft = true;
			// 右の回転を許可する
			Screen.autorotateToLandscapeRight = true;
			// 上下反転を許可する
			Screen.autorotateToPortraitUpsideDown = true;
		}
	}
}

