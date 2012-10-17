/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"WRlyOGplVsovGn1NhzMYVpUfXDSWPEgb"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"iT1VKWBG64akawN51evQFmbsLAwLEKP3"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"fxqnmGdfWYdRxCTnbI42QvPAhvBwmYrK"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"XD81Mv0N7Fb5EjYpPD5vVZnlxn4VJVEW"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"FNW0sEAx7L0l7Ub4nTfYi4n2oBfxrYwv"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"C9uvkrOLz0jp4tXFR1ROLWPUQQrXsLMI"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
