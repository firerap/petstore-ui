import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';


const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
];

const COMPONENTS = [
  HeaderComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MATERIAL_MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
