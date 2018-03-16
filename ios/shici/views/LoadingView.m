//
//  LoadingView.m
//  nxsdclient
//
//  Created by Spencer on 2017/6/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LoadingView.h"

@implementation LoadingView

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    self.backgroundColor =  [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  }
  return self;
}
-(void)drawRect:(CGRect)aRect{
  @try {
    /**
     * change it as you own loadingview
     */
    UIImageView *loadingView = [[UIImageView alloc] initWithFrame:self.frame];
    [loadingView setImage:[UIImage imageNamed:@"Default-Port-hd55.png"]];
    [self addSubview:loadingView];
  } @catch (NSException *exception) {
  } @finally {
  }
}

@end
