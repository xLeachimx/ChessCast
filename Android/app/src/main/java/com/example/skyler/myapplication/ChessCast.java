package com.example.skyler.myapplication;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.media.browse.MediaBrowser;
import android.nfc.Tag;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.MediaRouteButton;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.support.v7.media.MediaRouter.RouteInfo;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;


import com.google.android.gms.cast.ApplicationMetadata;
import com.google.android.gms.cast.Cast;
import com.google.android.gms.cast.CastDevice;
import com.google.android.gms.cast.CastMediaControlIntent;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallbacks;
import com.google.android.gms.common.api.Status;


public class ChessCast extends AppCompatActivity {
    MediaRouter mMediaRouter;
    private MediaRouteButton mMediaRouteButton;

    private MediaRouteSelector mMediaRouteSelector;
    private CastDevice mSelectedDevice;
    private MediaRouter.Callback mMediaRouterCallback;
    TextView mConnectionStatus;

    private GoogleApiClient mApiClient;
    private Cast.Listener mCastListener;
    private GoogleApiClient.ConnectionCallbacks mConnectionCallbacks;
    private GoogleApiClient.OnConnectionFailedListener mConnectionFailedListener;
    private boolean mApplicationStarted;
    private boolean mWaitingForReconnect;
    private String mSessionId;
    private static final String TAG = "ChessCast Tag";

    String APP_ID = "F6D3E50B";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chess_cast);
        //Toolbar toolbar = (Toolbar)findViewById(R.id.my_toolbar);
        //setSupportActionBar(toolbar);

        //mConnectionStatus = (TextView)findViewById(R.id.text_connection);
        mMediaRouteButton= (MediaRouteButton)findViewById(R.id.media_route_button);

        initCast();
    }
    private void initCast(){
        mMediaRouter = MediaRouter.getInstance(getApplicationContext());
        mMediaRouteSelector = new MediaRouteSelector.Builder()
                .addControlCategory(CastMediaControlIntent.categoryForCast(APP_ID))
                .build();

        mMediaRouteButton.setRouteSelector(mMediaRouteSelector);
        mMediaRouterCallback = new MyMediaRouterCallback();
    }

    @Override
    protected void onStart() {
        super.onStart();
        mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback,
                MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY);
    }

    @Override
    protected void onStop() {
        mMediaRouter.removeCallback(mMediaRouterCallback);
        super.onStop();
    }

    private class MyMediaRouterCallback extends MediaRouter.Callback {

        @Override
        public void onRouteSelected(MediaRouter router, MediaRouter.RouteInfo info) {
            mSelectedDevice = CastDevice.getFromBundle(info.getExtras());
            mConnectionStatus.setText("Connected to: " + mSelectedDevice.getFriendlyName());
        }

        @Override
        public void onRouteUnselected(MediaRouter router, MediaRouter.RouteInfo info) {
            mSelectedDevice = null;
            mConnectionStatus.setText("Not Connected");
        }

    }

    private void launchReceiver(){
        mCastListener = new Cast.Listener(){
            @Override
            public void onApplicationDisconnected(int errorCode){
                Log.d(TAG, "application has stopped");
                teardown(true);
            }
        };
        mConnectionCallbacks = new GoogleApiClient.ConnectionCallbacks() {
            @Override
            public void onConnected(Bundle bundle) {

            }

            @Override
            public void onConnectionSuspended(int i) {

            }
        };
        mConnectionFailedListener = new GoogleApiClient.OnConnectionFailedListener() {
            @Override
            public void onConnectionFailed(ConnectionResult connectionResult) {

            }
        };

        Cast.CastOptions.Builder apiOptionsBuilder = Cast.CastOptions.builder(mSelectedDevice, mCastListener);
        mApiClient = new GoogleApiClient.Builder(this)
                .addApi(Cast.API, apiOptionsBuilder.build())
                .addConnectionCallbacks(mConnectionCallbacks)
                .addOnConnectionFailedListener(mConnectionFailedListener).build();

    }

    private class ConnectionCallbacks implements GoogleApiClient.ConnectionCallbacks{
        @Override
        public void onConnected(Bundle connectionHint){
            Cast.CastApi.launchApplication(mApiClient, "F6D3E50B", false)  //"F6D3E50B" || getString(R.string.APP_ID)
                    .setResultCallback(
                            new ResultCallbacks<Cast.ApplicationConnectionResult>() {
                               /* @Override
                                public void onResult(Cast.ApplicationConnectionResult result) {
                                    Status status = result.getStatus();
                                    if (status.isSuccess()) {
                                        ApplicationMetadata applicationMetadata = result.getApplicationMetadata();
                                        mSessionId = result.getSessionId();
                                        mApplicationStarted = true;
                                    } else {
                                        Log.e(TAG, "Application couldn't launch.");
                                        teardown(true);
                                    }
                                }*/

                                @Override
                                public void onSuccess(Cast.ApplicationConnectionResult result) {
                                    Status status = result.getStatus();
                                    if (status.isSuccess()) {
                                        ApplicationMetadata applicationMetadata = result.getApplicationMetadata();
                                        mSessionId = result.getSessionId();
                                        mApplicationStarted = true;
                                    }
                                }

                                @Override
                                public void onFailure(Status status) {
                                    Log.e(TAG, "Application couldn't launch.");
                                    teardown(true);
                                }
                            }
                    );
        }

        @Override
        public void onConnectionSuspended(int i) {

        }
    }

    private void teardown(boolean selectDefaultRoute){
        if(mApiClient != null){
            if(mApplicationStarted){
                if(mApiClient.isConnected()||mApiClient.isConnecting()){
                    Cast.CastApi.stopApplication(mApiClient, mSessionId);
                    mApiClient.disconnect();
                }
                mApplicationStarted = false;
            }
            mApiClient = null;
        }
        mSelectedDevice = null;
        mWaitingForReconnect = false;
        mSessionId = null;
    }

}

