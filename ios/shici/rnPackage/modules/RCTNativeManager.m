//
//  NativeConfig.m
//  nxsdclient
//
//  Created by Spencer on 2017/6/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTNativeManager.h"
#import "sys/utsname.h"
#import <UIKit/UIKit.h>
#import "AppDelegate.h"
@implementation RCTNativeManager
RCT_EXPORT_MODULE(NativeManager);

- (NSDictionary *)constantsToExport
{
  NSString *env;
#ifdef DEBUG
  env = @"DEBUG";
#elif FT
  env = @"FT";
#elif UAT
  env = @"UAT";
#else
  env = @"PROD";
#endif
  NSLog(@"%@",env);
  NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
  //版本名称
  NSString *version = [infoDic objectForKey:@"CFBundleShortVersionString"];
  //版本号
  NSString *build = [infoDic objectForKey:@"CFBundleVersion"];
  
  struct utsname systemInfo;
  uname(&systemInfo);
  //机器型号
  NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  
  return @{
           @"ENV": env,
           @"VERSION_NAME":version,
           @"VERSION_CODE":build,
           @"DEVICE":deviceString,
           @"MOADL":[[UIDevice currentDevice] model],
           @"SYS_VERSION":[[UIDevice currentDevice] systemVersion],
           @"DEVICE_NAME":[[UIDevice currentDevice] name],
           @"SYS_NAME":[[UIDevice currentDevice] systemName]
           };
}
RCT_EXPORT_METHOD(openUrl:(NSDictionary *)dic){

    if (dic[@"url"] != nil) {
      NSURL *url = [NSURL URLWithString:dic[@"url"]];
      [[UIApplication sharedApplication] openURL:url];
    }
}



RCT_EXPORT_METHOD(hideLoadingView){
  dispatch_async(dispatch_get_main_queue(), ^{
    [(AppDelegate*)[UIApplication sharedApplication].delegate hideLoadingView];
  });
  
}
RCT_EXPORT_METHOD(showLoadingView){
  dispatch_async(dispatch_get_main_queue(), ^{
    [(AppDelegate*)[UIApplication sharedApplication].delegate showLoadingView];
  });
}
@end
