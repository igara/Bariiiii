package work.syonet.bariiiii

import android.app.Fragment
import android.content.Context
import android.os.Bundle
import android.view.*
import com.google.android.gms.vision.CameraSource
import com.google.android.gms.vision.MultiProcessor
import com.google.android.gms.vision.Tracker
import com.google.android.gms.vision.barcode.Barcode
import com.google.android.gms.vision.barcode.BarcodeDetector
import com.unity3d.player.UnityPlayer
import java.io.IOException
import kotlinx.android.synthetic.main.fragment_barcode_camera.*

/**
 * カメラの映像を表示するFragment
 */
class BarcodeCameraFragment : Fragment(), SurfaceHolder.Callback {

    /**
     * @var mCameraSource
     */
    private var mCameraSource: CameraSource? = null

    /**
     * ライフサイクルメソッド
     * @param context
     * ${inheritDoc}
     */
    override fun onAttach(context: Context?) {
        super.onAttach(context)
    }

    /**
     * ライフサイクルメソッド
     * 画面遷移された時に呼び込まれるメソッド
     *
     * @param savedInstanceState
     * ${inheritDoc}
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    /**
     * ライフサイクルメソッド
     * 画面が生成される前に呼ばれるメソッド
     *
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return inflater.inflate Fragmentの内容
     * ${inheritDoc}
     */
    override fun onCreateView(inflater: LayoutInflater?,
                              container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater?.inflate(R.layout.fragment_barcode_camera, container, false)
    }

    /**
     * ライフサイクルメソッド
     * Activityが作成されるタイミング
     * @param savedInstanceState
     * ${inheritDoc}
     */
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
    }

    /**
     * ライフサイクルメソッド
     * 画面が生成されるタイミング
     * ${inheritDoc}
     */
    override fun onStart() {
        super.onStart()
        initialize()
        surfaceview.holder.addCallback(this)
    }

    /**
     * ライフサイクルメソッド
     * 画面が落ちるタイミング
     * ${inheritDoc}
     */
    override fun onDestroy() {
        super.onDestroy()
    }

    /**
     * 初期化
     */
    private fun initialize() {
        // デコードする画像フォーマットをセット
        var barcodeDetector = BarcodeDetector.Builder(activity.baseContext)
                .setBarcodeFormats(Barcode.EAN_13)
                .build()

        var barcodeProcessorFactory = BarcodeProcessorFactory()
        barcodeDetector.setProcessor(MultiProcessor.Builder(barcodeProcessorFactory).build())

        var cameraSourceBuilder = CameraSource.Builder(activity.baseContext, barcodeDetector)
        cameraSourceBuilder.setFacing(CameraSource.CAMERA_FACING_BACK).setRequestedFps(10f).setAutoFocusEnabled(true)
        mCameraSource = cameraSourceBuilder.build()
    }

    /**
     * SurfaceViewが作成される
     * @param holder
     * ${inheritDoc}
     */
    override fun surfaceCreated(holder: SurfaceHolder) {
        try {
            if (!holder.equals(null)) {
                // カメラの映像を表示
                mCameraSource!!.start(holder)
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    /**
     * SurfaceViewが変更した時
     * @param holder
     * @param format
     * @param width
     * @param height
     * ${inheritDoc}
     */
    override fun surfaceChanged(holder: SurfaceHolder, format: Int, width: Int, height: Int) {
    }

    /**
     * SurfaceViewが消える時
     * @param holder
     * ${inheritDoc}
     */
    override fun surfaceDestroyed(holder: SurfaceHolder) {
    }

    /**
     * MultiProcessor
     */
    private inner class BarcodeProcessorFactory : MultiProcessor.Factory<Barcode> {

        /**
         * Trackerを作成
         * @param barcode
         * @return BarcodeTracker
         * ${inheritDoc}
         */
        override fun create(barcode: Barcode): Tracker<Barcode> {
            return BarcodeTracker()
        }
    }

    /**
     * BarcodeTracker
     */
    private inner class BarcodeTracker : Tracker<Barcode>() {

        /**
         * バーコードの読み込みを行う
         * @param id
         * @param item
         * ${inheritDoc}
         */
        override fun onNewItem(id: Int, item: Barcode) {
            activity.runOnUiThread(Runnable {
                if (item.valueFormat.equals(Barcode.ISBN)) {
                    val value : Long = item.rawValue.toLong()
                    val prefix : Int = (value / 10000000000).toInt()
                    // ISBNかどうかをチェック
                    if (prefix.equals(978) || prefix.equals(979)) {
                        val isbn9 : Long = (value % 10000000000) / 10;
                        var sum : Long = 0
                        var tmp_isbn : Long = isbn9;
                        var i = 10
                        do {
                            var divisor : Long = Math.pow(10.toDouble(), (i - 2).toDouble()).toLong()
                            sum += (tmp_isbn / divisor) * i;
                            tmp_isbn = tmp_isbn.mod(divisor);
                            i -= 1
                        }while (i > 0 && tmp_isbn > 0)
                        var checkdigit : Long = 11 - (sum % 11);
                        // isbn10コードに変換
                        var isbn10 : String = String.format("%d", isbn9)
                        if (checkdigit.equals(10)) {
                            isbn10 = isbn10.plus("X")
                        } else {
                            isbn10 = isbn10.plus(String.format("%d", checkdigit.mod(11)))
                        }
                        // Unityの画面に戻る
                        UnityPlayer.UnitySendMessage("BarcodeScanScreenCanvas", "resultPage", isbn10)
                        activity.finish()
                    }
                }
            })
        }
    }

}
