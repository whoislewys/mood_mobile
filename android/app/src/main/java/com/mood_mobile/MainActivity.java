package com.mood_mobile;

import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
import io.branch.rnbranch.*;
import android.content.Intent;
// react-native-splash-screen < 0.3.1
// import com.cboy.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
   @Override
   protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
   }
   @Override
   public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
   }
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    protected String getMainComponentName() {
        return "mood_mobile";
    }
}
