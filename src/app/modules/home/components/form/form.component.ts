import { ConsultaCepService } from './../../services/consulta-cep.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AsyncValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import * as JsonToXML from 'js2xmlparser';
import { HttpClient } from '@angular/common/http';

//validators

import { Validacoes } from '../../Validators/valicacoes';

//interfaces
import { ColorList } from '../../interfaces/color-list';
import { FuelOptions } from '../../interfaces/fuel-options';
import { FipeList } from '../../interfaces/fipe-list';
import { TypeVeiculo } from '../../interfaces/type-veiculo';

//services
import { ListsService } from './../../services/lists.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public listVehicles: Array<TypeVeiculo> = [];
  public colorList: Array<ColorList> = [];
  public fuelOptions: Array<FuelOptions> = [];

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private listsService: ListsService,
    private consultaCepService: ConsultaCepService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      renavam: ['', [Validators.required]],
      marca: [''],
      modelo: [''],
      corVeiculo: [''],
      tipoVeiculo: [''],
      placa: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          Validacoes.validaPlaca,
        ],
      ],
      fuel: ['gasoline'],
      nome: [''],
      sobrenome: [''],
      tel: [''],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required]],
      bairro: [''],
      rua: [''],
      cidade: [''],
      uf: [''],
      complemento: [''],
      numero: [''],
      cpf: ['', [Validators.required, Validacoes.validaCpf]],
    });

    this.listVehicles = this.listsService.getVehicle();

    this.listsService.getColorList().subscribe({
      next: (res) => (this.colorList = res),
      error: (error) => error,
    });

    this.fuelOptions = this.listsService.getFuel();
  }

  getCampo(campo: string) {
    return this.form.get(campo)!;
  }

  verifyError(campo: string) {
    return !this.getCampo(campo).valid && this.getCampo(campo).touched;
  }

  validatorError(campo: string, validator: string) {
    if (this.verifyError(campo) && this.getCampo(campo).errors?.[validator]) {
      return true;
    } else {
      return false;
    }
  }

  errorMessage = 'CEP n??o encontrado, tente novamente';
  cepHasError = false;
  consultaCEP() {
    const cep = this.form.get('cep')!.value;
    this.cepSubscribe(cep);
  }

  cepSubscribe(cep: string) {
    if (cep.length === 8) {
      this.consultaCepService.getCep(cep).subscribe({
        next: (dados) => {
          if (dados.hasOwnProperty('erro')) {
            this.cepHasError = true;
            this.closeErrorCep();
          } else {
            this.setCepForm(dados);
          }
        },
      });
    }
  }

  closeErrorCep() {
    setTimeout(() => {
      this.cepHasError = false;
    }, 3000);
  }

  setCepForm(dados: any) {
    this.form.patchValue({
      bairro: dados.bairro,
      rua: dados.logradouro,
      cidade: dados.localidade,
      uf: dados.uf,
    });
  }

  formClose = false;
  public onSubmit() {
    console.log(JsonToXML.parse('obj', this.form.value));
    console.log(this.form.value);

    this.formClose = true;
    setTimeout(() => {
      this.formClose = false;
    }, 2000);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value));
  }
}
