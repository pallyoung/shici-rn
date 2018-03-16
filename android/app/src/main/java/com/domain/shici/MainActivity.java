package com.domain.shici;

import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.domain.views.LoadingView;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    private LoadingView loadingView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadingView = new LoadingView(this);
        loadingView.setBackgroundColor(0x000000);
        addContentView(loadingView,new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "shici";
    }
    public void showLoadingView(){
        if(loadingView!=null){
            loadingView.showLoadingView();
        }
    }
    public void hideLoadingView(){
        if(loadingView!=null){
            loadingView.hideLoadingView();
        }
    }
}
