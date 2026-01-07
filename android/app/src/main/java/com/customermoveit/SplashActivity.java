package com.customermoveit;

import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        finish();
    }
}