import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
//components
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

//pages
import { HomeComponent } from './pages/home/home.component';

import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { ErrorMaskComponent } from './components/error-mask/error-mask.component';

import { FipeListComponent } from './components/fipe-list/fipe-list.component';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    HomeComponent,
    ErrorMsgComponent,
    ErrorMaskComponent,
    FipeListComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
})
export class HomeModule {}
