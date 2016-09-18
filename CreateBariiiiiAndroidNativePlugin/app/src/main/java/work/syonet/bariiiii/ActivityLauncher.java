package work.syonet.bariiiii;

import android.app.Activity;
import android.content.Intent;

/**
 * C#のコードからAndroidのアクティビティにつなげるクラス
 */
public class ActivityLauncher {

    /**
     * AndroidのアクティビティにIntentを発行する
     * @param type 起動したいアクティビティ
     * @param m_activity Unity自身のアクティビティ
     */
    public static void launchActivity(String type, final Activity m_activity) {
        Intent i = new Intent();
        i.setAction(Intent.ACTION_MAIN);
        i.setClassName(m_activity, type);

        // 画面遷移を行う
        m_activity.startActivity(i);
    }
}