#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

#pragma mark BarcodeScanIOS Interface
/**
 * MARK:iOSでバーコードの解析を行うViewController
 */
@interface BarcodeScanIOS: UIViewController<AVCaptureMetadataOutputObjectsDelegate>

@property (strong, nonatomic) AVCaptureSession *captureSession;
@property (strong, nonatomic) AVCaptureDevice *cameraDevices;
@property (strong, nonatomic) AVCaptureStillImageOutput *imageOutput;
@property (strong, nonatomic) IBOutlet UIView *selectView;
@property (strong, nonatomic) IBOutlet UIButton *backButton;

@end


#pragma mark BarcodeScanIOS Class
@implementation BarcodeScanIOS

CGFloat x;
CGFloat y;
CGFloat width;
CGFloat height;

/**
 * MARK:初期化メソッド
 */
- (instancetype)init {

    // 読み取り範囲（0 ~ 1.0の範囲で指定）
    x = 0.1;
    y = 0.4;
    width = 0.8;
    height = 0.2;

    self = [super init];
    if (self) {
    }
    return self;
}

/**
 * MARK:ライフサイクルメソッドviewDidLoad
 */
- (void)viewDidLoad {
    [super viewDidLoad];
    NSError *error;
    // セッションの作成
    _captureSession = [[AVCaptureSession alloc]init];

    // デバイス一覧の取得
    NSArray *devices = [AVCaptureDevice devices];
    // バックカメラをcameraDevicesに格納
    for (AVCaptureDevice *device in devices) {
        if ([device position] == AVCaptureDevicePositionBack) {
            _cameraDevices = device;
        }
    }

    // バックカメラからVideoInputを取得
    AVCaptureInput *videoInput = [[AVCaptureDeviceInput alloc]initWithDevice:_cameraDevices error:&error];

    // セッションに追加
    [_captureSession addInput:videoInput];

    // 出力先を生成
    _imageOutput = [[AVCaptureStillImageOutput alloc]init];

    // セッションに追加
    [_captureSession addOutput:_imageOutput];

    // 画像を表示するレイヤーを生成
    AVCaptureVideoPreviewLayer *captureVideoLayer = [[AVCaptureVideoPreviewLayer alloc]initWithSession:_captureSession];
    captureVideoLayer.frame = self.view.bounds;
    captureVideoLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;

    // Viewに追加
    [self.view.layer addSublayer:captureVideoLayer];

    // metadata取得に必要な初期設定
    AVCaptureMetadataOutput *metaOutput = [[AVCaptureMetadataOutput alloc]init];
    [metaOutput setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    [_captureSession addOutput:metaOutput];

    // どのmetadataを取得するか設定する
    [metaOutput setMetadataObjectTypes:@[AVMetadataObjectTypeQRCode, AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code]];

    // どの範囲を解析するか設定する
    metaOutput.rectOfInterest = CGRectMake(y, 1 - x - width, height, width);

    // セッション開始
    [_captureSession startRunning];

    // 「戻る」ボタンを最前線に配置する
    [self.view bringSubviewToFront:_selectView];
    [self.view bringSubviewToFront:_backButton];


}

/**
 * MARK:画像の解析をおこなう
 */
-(void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection{
    // 複数のmetadataが来るので順に調べる
    for (AVMetadataObject *data in metadataObjects) {
        if (![data isKindOfClass:[AVMetadataMachineReadableCodeObject class]]) continue;

        // 画像の認識タイプを判断する
        if ([data.type isEqualToString:AVMetadataObjectTypeQRCode]) {
            // QR code data
            NSString *strValue = [(AVMetadataMachineReadableCodeObject *)data stringValue];
            NSURL *url = [NSURL URLWithString:strValue];
            if ([[UIApplication sharedApplication] canOpenURL:url]) {
            }
        } else if ([data.type isEqualToString:AVMetadataObjectTypeEAN13Code]) {
            NSString *strValue = [(AVMetadataMachineReadableCodeObject *)data stringValue];
            // JANコード（標準タイプ）の場合、ISBNかどうかを調べて
            // ASINコードに変換し、対応するAmazonのページを開く
            long long value = strValue.longLongValue;
            NSInteger prefix = value / 10000000000;
            // ISBNかどうかをチェック
            if (prefix == 978 || prefix == 979) {
                long long isbn9 = (value % 10000000000) / 10;
//                UnitySendMessage("GameObjectName", "MethodName", "message");

            }

        } else if ([data.type isEqualToString:AVMetadataObjectTypeEAN8Code]) {
        }
    }
}

/**
 * MARK:画面の回転の許可
 */
- (BOOL)shouldAutorotate {
    return NO;
}

/**
 * MARK:
 */
- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}

/**
 * MARK:back buttonを押下した時
 */
- (IBAction)onTouchedBackButton:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end


#pragma mark called by C#
/**
 * MARK:Unity上で扱うViewController
 */
extern UIViewController *UnityGetGLViewController();

extern "C" {
    void barcordScanInit_();
}

/**
 * MARK:C#からBarcodeIOSのクラスを呼び出す
 */
void barcordScanInit_() {

    UINib *nib = [UINib nibWithNibName:@"BarcodeScanIOSScreen" bundle:nil];
    BarcodeScanIOS *barcode = [[nib instantiateWithOwner:nil options:nil] objectAtIndex:0];
    [UnityGetGLViewController() presentViewController:barcode animated:YES completion:nil];
}
