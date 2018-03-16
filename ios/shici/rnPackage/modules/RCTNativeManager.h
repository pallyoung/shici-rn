//
//  NativeConfig.h
//  nxsdclient
//
//  Created by Spencer on 2017/6/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "AppDelegate.h"
#import <MessageUI/MessageUI.h>

@interface RCTNativeManager : NSObject<RCTBridgeModule,MFMessageComposeViewControllerDelegate>


@end
