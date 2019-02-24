import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { DASHBOARD_MODALS } from './dashboard/modals';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ...DASHBOARD_MODALS,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot([]),
  ],
  providers: [],
  entryComponents: [
    ...DASHBOARD_MODALS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
