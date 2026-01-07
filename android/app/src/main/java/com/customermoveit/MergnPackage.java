package com.customermoveit;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

public class MergnPackage implements ReactPackage {
    @NonNull
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
            modules.add(new MergnModule(reactApplicationContext));
            return modules;
    }

    @NonNull
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
