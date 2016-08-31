#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <SafariServices/SafariServices.h>

#pragma mark GoogleLoginWebViewIOS Interface
/**
 * MARK:iOSでGoogleのログインを行うViewController
 */
@interface GoogleLoginWebViewIOS: UIViewController <SFSafariViewControllerDelegate>
@end


#pragma mark GoogleLoginWebViewIOS Class
@implementation GoogleLoginWebViewIOS

/**
 * MARK:初期化メソッド
 */
- (instancetype)init {
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
}

#pragma mark - SFSafariViewControllerDelegate
/**
 * MARK:アクションボタンをタップされた際に呼び出される処理
 */
- (NSArray<UIActivity *> *)safariViewController:(SFSafariViewController *)controller activityItemsForURL:(NSURL *)URL title:(NSString *)title {
    NSLog(@"activityItemdForURL");
    return @[];
}

/**
 * MARK:SFSafariViewControllerに表示する最初の画面の読込みが完了した際に呼び出される処理
 */
- (void)safariViewController:(SFSafariViewController *)controller didCompleteInitialLoad:(BOOL)didLoadSuccessfully {

    NSLog(@"didCompleteInitialLoad");
}

/**
 * MARK:SFSafariViewControllerのDone(完了)ボタンをタップした際に呼び出される処理
 */
- (void)safariViewControllerDidFinish:(SFSafariViewController *)controller {

    NSLog(@"safariViewControllerDidFinish");
}

@end

#pragma mark called by C#
/**
 * MARK:Unity上で扱うViewController
 */
extern UIViewController *UnityGetGLViewController();

extern "C" {
    void googleLoginWebViewInit_();
}

/**
 * MARK:C#からGoogleLoginWebViewIOSのクラスを呼び出す
 */
void googleLoginWebViewInit_() {

    UINib *nib = [UINib nibWithNibName:@"GoogleLoginWebViewIOSScreen" bundle:nil];
    GoogleLoginWebViewIOS *googleLoginWebView = [[nib instantiateWithOwner:nil options:nil] objectAtIndex:0];
    [UnityGetGLViewController() presentViewController:googleLoginWebView animated:YES completion:nil];
}