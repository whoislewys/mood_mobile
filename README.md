# Setup

First setup your react-native platform. Start with iOS - it's easier to set up.

### Android
Follow the official [Facebook] (https://facebook.github.io/react-native/docs/0.58/getting-started.html) doc. Make sure you use `Google APIs Intel x86 Atom System Image` for your simulator for 0.58.

#### Troubleshooting
* Sometimes a new emulator will not see the packager. If you've followed the Facebook guide and pulled from the repo recently, try opening the dev menu in your emulator (CMD+M on mac), clicking on `Dev Settings`, clicking on `Debug server host & port for device`, and typing in `localhost:8081` (or whatever port your metro bundler is running on) as the port.

### iOS
Follow the official [Facebook] (https://facebook.github.io/react-native/docs/0.58/getting-started.html) doc for 0.58.

Make sure you run `cd ios && pod install`

## Running App 
1. `yarn`
2. [iOS only] `cd ios && pod install && cd ..`
3. `react-native-link`
4. `react-native-run-ios` or `react-native-run-android`

## General Troubleshooting
Luis wrote a small [`react-native-clean` script](https://gist.github.com/whoislewys/18942ac40edb68460c709fe2ed74dee4). Kill your Metro Bundler, run `react-native-clean`, and run `react-native-run-*` again to get a fresh, artisinal, hand-crafted, non-GMO, fully vaccinated, grass-fed build.

> Sometimes, a JS refresh is not enough to update code, especially if you recently added functionality that utilizes native code.

> Also, please run this before merging a new branch to ensure that your changes still result in a clean build. Slack him if you need it. 