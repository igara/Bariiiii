#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Bariiiii-Swift.h>

extern "C"{
    void barcordScanInit_() {
        [BarcodeScanIOS barcordScanInit];
    }

    void open_() {
         [BarcodeScanIOS open];
    }
}