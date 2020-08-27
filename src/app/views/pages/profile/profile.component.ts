import { Component, OnInit, } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import { SystemService } from '../../../Shared/SystemService';

@Component({
  selector: 'kt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ProfileForm: FormGroup;
  CityList: any = [];
  StateList: any = [];
  CountryList: any = [];
  nodata: any;
  constructor(public fb: FormBuilder, public service: SystemService) { }

  ngOnInit() {
    this.loadLists();
    this.loadProfile();
  }
  loadProfile() {
    this.service.Data.ExecuteAPI_Get<any>("Vender/GetbyAuth/").then((data: any) => {
      if (data.success) {

        this.initForm(data.data);
      }
    });
  }
  loadLists() {
    this.service.Data.ExecuteAPI_Get<any>("City/GetAll").then((data: any) => {
      if (data.success) {
        this.CityList.length = 0;
        data.data.forEach(element => { this.CityList.push(element); });

      }
    });
    this.service.Data.ExecuteAPI_Get<any>("State/GetAll").then((data: any) => {
      if (data.success) {
        this.StateList.length = 0;
        data.data.forEach(element => { this.StateList.push(element); });

      }
    });
    this.service.Data.ExecuteAPI_Get<any>("Country/GetAll").then((data: any) => {
      if (data.success) {
        this.CountryList.length = 0;
        data.data.forEach(element => { this.CountryList.push(element); });

      }
    });
  }
  initForm(dt) {

    console.log(dt);
    this.ProfileForm = this.fb.group({
      display_business_name: [dt.display_business_name, Validators.required],
      vender_full_name: [dt.vender_full_name, Validators.required],
      email: [dt.email, Validators.required],
      mobile_number: [dt.mobile_number, Validators.required],

      display_business_description: [dt.display_business_description],
      preferred_time_slot: [dt.preferred_time_slot],
      preferred_language: [dt.preferred_language],

      add_line_1: [dt.add_line_1, Validators.required],
      add_line_2: [dt.add_line_2, Validators.required],
      city_id: [dt.city_id, Validators.required],
      state_id: [dt.state_id, Validators.required],
      country_id: [dt.country_id, Validators.required],
      pin_code: [dt.pin_code, Validators.required],
    });
  }
  updateProfile() {
    var sendobj = {
      _display_business_name: this.ProfileForm.value.display_business_name,
      _vender_full_name: this.ProfileForm.value.vender_full_name,
      _email: this.ProfileForm.value.email,
      _mobile_number: this.ProfileForm.value.mobile_number,
      _display_business_description: this.ProfileForm.value.display_business_description,
      _preferred_time_slot: this.ProfileForm.value.preferred_time_slot,
      _preferred_language: this.ProfileForm.value.preferred_language,
      _add_line_1: this.ProfileForm.value.add_line_1,
      _add_line_2: this.ProfileForm.value.add_line_2,
      _city_id: this.ProfileForm.value.city_id,
      _state_id: this.ProfileForm.value.state_id,
      _country_id: this.ProfileForm.value.country_id,
      _pin_code: this.ProfileForm.value.pin_code,
    };
    console.log(sendobj);
  }
}
