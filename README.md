# Mood Mobile
## Running Simulation in IOS
1. Clone the project from Github
2. `cd` into the project directory
3. Install yarn and run `yarn` to install dependencies
4. Run `react-native run-ios`

If there are errors, follow the instructions in [here](https://github.com/SamRond/mood_mobile/issues/14). If that doesn't work, ping Sam in Slack.

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
