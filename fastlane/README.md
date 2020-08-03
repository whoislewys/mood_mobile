fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios inc_build
```
fastlane ios inc_build
```
increment_build_number
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight
### ios release
```
fastlane ios release
```
Deploy a new version to the App Store
### ios screenshots
```
fastlane ios screenshots
```
Upload new screenshots to App Store

----

## Android
### android beta
```
fastlane android beta
```
Build a release APK for beta usage
### android release
```
fastlane android release
```
Deploy a new version to the Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
