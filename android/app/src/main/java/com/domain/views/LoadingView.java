package com.domain.views;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.facebook.shici.R;

/**
 * Created by Spencer on 2017/12/1.
 */

public class LoadingView extends LinearLayout {
    private ImageView imageView;
    private Context mContext;
    public LoadingView(Context context) {
        this(context,null);
    }
    public LoadingView(Context context,AttributeSet attrs) {
        this(context,attrs,0);
    }
    public LoadingView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        mContext = context;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        imageView = new ImageView(mContext);
        imageView.setImageResource(R.mipmap.launch);
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
        addView(imageView,new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT));

    }
    public void showLoadingView(){
        post(new Runnable() {
            @Override
            public void run() {
                setVisibility(VISIBLE);
            }
        });
    }
    public void hideLoadingView(){
        post(new Runnable() {
            @Override
            public void run() {
                setVisibility(GONE);
            }
        });
    }
}
