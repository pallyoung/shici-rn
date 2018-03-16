/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "LoadingView.h"
#import "IQKeyboardManager.h"

@implementation AppDelegate{
  
  /**
   * @start
   * spencer-kit specify code start
   */
  
  UIView *mainView;
  LoadingView *loadingView;
  
  /**
   * @end
   * spencer-kit specify code end
   */
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"shici"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  
  /**
   * @start
   * spencer-kit specify code start
   */
  
  //set loading view
  mainView = [[UIView alloc]initWithFrame:self.window.frame];
  loadingView = [[LoadingView alloc ]initWithFrame:self.window.frame];
  rootView.frame = self.window.frame;
  
  [mainView addSubview:rootView];
  [mainView addSubview:loadingView];
  
  rootViewController.view = mainView;
  
  // set keyboard manager
  [IQKeyboardManager sharedManager].enableAutoToolbar = NO;
  /**
   * @end
   * spencer-kit specify code end
   */
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

/**
 * @start
 * spencer-kit specify code start
 */
-(void) hideLoadingView{
  dispatch_async(dispatch_get_main_queue(), ^{
    if(loadingView.superview!=nil){
      [loadingView removeFromSuperview];
    }
  });
}
-(void) showLoadingView{
  dispatch_async(dispatch_get_main_queue(), ^{
    if(loadingView.superview==nil){
      [mainView addSubview:loadingView];
    }
  });
}
/**
 * @end
 * spencer-kit specify code end
 */
@end
