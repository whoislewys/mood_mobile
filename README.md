# Mood Mobile
## Running Simulation in IOS
1. Download project from Github
2. Open `mood_mobile/ios/moodmobile.xcodeproj` in Xcode
3. Follow the instructions in https://github.com/SamRond/mood_mobile/issues/14
4. Click the play button in the top left of the screen

## Branches
master - This branch will always reflect the code in the most recent iTunes Connect build

develop - The develop branch will be the closest release candidate to master

topic branches -
- bug/ branches - these topic branches, based on either develop or master, focus on a bug fix
- feature/ branches - these topic branches will focus on development of a single feature

## Push App Builds w/ Fastlane
If you have never used Fastlane before, install it. Install instructions can be found [here](https://docs.fastlane.tools/getting-started/ios/setup/).

For you to be able to push new builds, you need to install certificates. This is an easy process:
1. Open a terminal & navigate to mood_mobile/fastlane
2. Run the command `fastlane match development --readonly`

For more information, see the [certificates repo](https://github.com/samrond/mood_mobile_certs)

To push a new ios build to testflight you can simply run `fastlane ios beta`.
See the "Fastfile" in the fastlane directory for other tasks you can run.
The command will always follow the syntax `fastlane <platform> <lane>`
