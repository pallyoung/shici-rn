package com.domain.rnpackage.modules;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import com.domain.shici.MainActivity;
import com.domain.shici.BuildConfig;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Spencer on 2017/11/30.
 */

public class RCTNativeManager extends ReactContextBaseJavaModule{

    public RCTNativeManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     */
    @Override
    public String getName() {
        return "NativeManager";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();

        PackageManager manager = getReactApplicationContext().getPackageManager();

        constants.put("ENV", BuildConfig.ENV);
        int version_code;
        String version_name ;
        try {
            PackageInfo info = manager.getPackageInfo(getReactApplicationContext().getPackageName(), 0);
            version_code = info.versionCode;
            version_name = info.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            version_code = 0;
            version_name = "";
        }
        constants.put("VERSION_NAME",version_name);
        constants.put("VERSION_CODE",version_code);
        constants.put("DEVICE", Build.DEVICE);
        constants.put("MOADL",Build.MODEL);
        constants.put("SYS_VERSION",Build.VERSION.SDK_INT);
        constants.put("DEVICE_NAME",Build.PRODUCT);
        constants.put("SYS_NAME",Build.VERSION.RELEASE);
        return constants;
    }

    @ReactMethod
    public void  showLoadingView(){
        MainActivity activity= (MainActivity)getCurrentActivity();
        activity.showLoadingView();
    }
    @ReactMethod
    public void hideLoadingView(){
        MainActivity activity= (MainActivity)getCurrentActivity();
        activity.hideLoadingView();
    }

}
