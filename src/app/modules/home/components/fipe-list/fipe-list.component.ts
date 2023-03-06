import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FipeList } from '../../interfaces/fipe-list';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-fipe-list',
  templateUrl: './fipe-list.component.html',
  styleUrls: ['./fipe-list.component.css'],
})
export class FipeListComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() value!: string;
  @Input() valueInput!: string;

  fipeListArray: Array<FipeList> = [];
  filterFipeArray: Array<FipeList> = [];

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {}

  onSelectFipe(value: string) {
    this.listsService.getFipe(value).subscribe({
      next: (res) => (this.fipeListArray = res),
    });

    this.resetValueFipe();
  }

  consultaFipe(text: string) {
    this.filterFipeArray = this.fipeListArray.filter(({ nome }) => {
      const textNormalize = this.normalizeString(text);
      const nameNormalize = this.normalizeString(nome);

      if (textNormalize === nameNormalize) {
        this.setValueFipe(nome);
        return null;
      }
      return nameNormalize.startsWith(textNormalize);
    });

    if (text === '') {
      this.filterFipeArray = [];
    }
  }

  normalizeString(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace('ë', 'e');
  }

  setValueFipe(name: any) {
    this.form.patchValue({
      marca: name,
    });

    this.filterFipeArray = [];
  }

  resetValueFipe() {
    this.form.patchValue({
      marca: '',
    });
  }
}
