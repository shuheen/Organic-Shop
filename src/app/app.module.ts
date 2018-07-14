import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { MiscService } from './services/misc.service';
import { OrderService } from './services/order.service';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CapitalizePipe } from './pipes/capitalise.pipe';
import { InputFormatDirective } from './input-format.directive';
import { CountriesComponent } from './countries/countries.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductInfComponent } from './product-inf/product-inf.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    RegisterComponent,
    CartButtonComponent,
    CheckoutSummaryComponent,
    ShippingFormComponent,
    AddCategoryComponent,
    CapitalizePipe,
    InputFormatDirective,
    CountriesComponent,
    ProductInfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      // {path:'', component: HomeComponent},
      {path:'', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
      {path:'register', component: RegisterComponent},
      {path:'login', component: LoginComponent},
      {path:'countries', component: CountriesComponent},
      {path:'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard]},
      {path:'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},
      {path:'my-orders', component: MyOrdersComponent, canActivate:[AuthGuard]},

      {path:'admin/admin-orders', component: AdminOrdersComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/product-form', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/product-form/add-category', component: AddCategoryComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/admin-products/:id', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/admin-products', component: AdminProductsComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'product-inf', component: ProductInfComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/admin-orders', component: AdminOrdersComponent, canActivate:[AuthGuard, AdminAuthGuard]},
    ])
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    MiscService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
