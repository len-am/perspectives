#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.2.0",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.navibridge",@"name",@"ti.navibridge",@"moduleid",@"1.0.2",@"version",@"c3c42ae2-0a09-494b-b781-1c3f07a747f8",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
