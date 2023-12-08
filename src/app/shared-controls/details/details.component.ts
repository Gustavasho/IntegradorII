import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  formatKey(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  formatValue(value: any): string {
    if (typeof value === 'string' && Date.parse(value)) {
      const fecha = new Date(value);
      return fecha.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return value.toString();
  }
}
