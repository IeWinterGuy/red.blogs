import { NgModule } from '@angular/core';

import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatCheckboxModule } from '@angular/material/checkbox';
const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};
@NgModule({
  declarations: [],
  exports: [
    OverlayModule,
    PortalModule,
    DialogModule,

    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,

    MatCheckboxModule
  ],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ]
})
export class MaterialModule {}
