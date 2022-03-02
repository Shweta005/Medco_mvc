import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { UsergridComponent } from './usergrid/usergrid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { OrdergridComponent } from './ordergrid/ordergrid.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY} from '@angular/material/snack-bar';
import { CategorygridComponent } from './categorygrid/categorygrid.component';

import { FooterComponent } from './user/footer/footer.component';
import { HeaderComponent } from './user/header/header.component';
import { HomeComponent } from './user/home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './user/cart/cart.component';
import { EditproductComponent } from './Product/editproduct/editproduct.component';
import { EditorderComponent } from './Order/editorder/editorder.component';
import { AddcoupenComponent } from './Coupen/addcoupen/addcoupen.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { DatePipe } from '@angular/common';
import { CoupensComponent } from './user/coupens/coupens.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    NavbarComponent,
    UsergridComponent,
    MainComponent,
    OrdergridComponent,
    ProductgridComponent,
    DashboardComponent,
    AddproductComponent,
    AddcategoryComponent,
    CategorygridComponent,
    SignupComponent,
    LoginComponent,

    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserHomeComponent,
    EditcategoryComponent,
    ProductComponent,
    CartComponent,
    EditproductComponent,
    EditorderComponent,
    AddcoupenComponent,
    CheckoutComponent,
    CoupensComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DatePipe,
   { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY,useValue:{duration:1000, action:close}},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
