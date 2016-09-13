package work.syonet.bariiiii

import android.support.v7.app.AppCompatActivity
import android.os.Bundle

/**
 * バーコードを読み込む画面
 */
class BarcodeScanAndroidActivity : AppCompatActivity() {

    /**
     * ライフサイクルメソッド
     * 画面遷移された時に呼び込まれるメソッド
     *
     * @param savedInstanceState
     * ${inheritDoc}
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_barcode_scan_android)
    }
}
