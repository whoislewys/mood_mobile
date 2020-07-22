package com.mood_mobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.uxcam.RNUxcamPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.guichaguri.trackplayer.TrackPlayer;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNUxcamPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage(),
          new RNGoogleSigninPackage(),
          new RNDeviceInfo(),
          new TrackPlayer(),
          new SplashScreenReactPackage(),
          new ReactNativeRestartPackage(),
          new RNBranchPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Branch.getAutoInstance(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
