#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface BarcodeScanIOS: UIViewController<AVCaptureMetadataOutputObjectsDelegate>

@property (strong, nonatomic) AVCaptureSession *captureSession;
@property (strong, nonatomic) AVCaptureDevice *cameraDevices;
@property (strong, nonatomic) AVCaptureStillImageOutput *imageOutput;

@end

@implementation BarcodeScanIOS

CGFloat x;
CGFloat y;
CGFloat width;
CGFloat height;

- (instancetype)init
{

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

    //セッション開始
    [_captureSession startRunning];
}

-(void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection{
    // 複数のmetadataが来るので順に調べる
    for (AVMetadataObject *data in metadataObjects) {
        if (![data isKindOfClass:[AVMetadataMachineReadableCodeObject class]]) continue;
        // type ?
        if ([data.type isEqualToString:AVMetadataObjectTypeQRCode]) {
            // QR code data
            NSString *strValue = [(AVMetadataMachineReadableCodeObject *)data stringValue];
            NSURL *url = [NSURL URLWithString:strValue];
            if ([[UIApplication sharedApplication] canOpenURL:url]) {
            }
        } else if ([data.type isEqualToString:AVMetadataObjectTypeEAN13Code]) {

        } else if ([data.type isEqualToString:AVMetadataObjectTypeEAN8Code]) {
        }
    }
}

@end

extern UIViewController *UnityGetGLViewController();

extern "C" {

    void barcordScanInit_();
}

void barcordScanInit_() {

    BarcodeScanIOS *barcode = [[BarcodeScanIOS alloc]init];
    [UnityGetGLViewController() presentViewController:barcode animated:YES completion:nil];
}
