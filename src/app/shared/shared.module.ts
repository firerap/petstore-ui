import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTableModule,
  MatProgressSpinnerModule,
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
