package work.syonet.bariiiii;

import android.app.Activity;
import android.content.Intent;

public class ActivityLauncher {

    public static void launchActivity(String type, final Activity m_activity) {
        Intent i = new Intent();
        i.setAction(Intent.ACTION_MAIN);
        i.setClassName(m_activity,type);

        m_activity.startActivity(i);
    }
}