package com.domain.rnpackage;


import com.domain.rnpackage.modules.RCTNativeManager;
import com.facebook.react.LazyReactPackage;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.Arrays;
import java.util.List;

import javax.inject.Provider;

/**
 * Created by Spencer on 2017/11/30.
 */

public class RNPackage extends LazyReactPackage {
    /**
     * @param reactContext react application context that can be used to create modules
     * @return list of module specs that can create the native modules
     */
    @Override
    public List<ModuleSpec> getNativeModules(final ReactApplicationContext reactContext) {
        return Arrays.asList(
                new ModuleSpec(RCTNativeManager.class, new Provider<NativeModule>() {
                    @Override
                    public NativeModule get() {
                        return new RCTNativeManager(reactContext);
                    }
                })
        );
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return LazyReactPackage.getReactModuleInfoProviderViaReflection(this);
    }
}
