import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: any
  contactID: number
  addAddressForm: FormGroup
  addressesData: any

  get addressControls(): FormArray {
    return <FormArray>this.addAddressForm.get('addresses');
  }


  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.contactID = this.route.snapshot.params['id'];

    this.addAddressForm = this.fb.group({
      addresses: this.fb.array([
        this.addnewFormGroup()
      ])
    });

    let ctrLength = this.addressControls.length
    this.addressControls.at(ctrLength - 1).patchValue({
      contactId: this.contactID
    })

  }

  ngOnInit(): void {

    this.contactsService.getContactByID(this.contactID).subscribe(contact => {
      this.setContact(contact)
    });

    this.getAddresses()
  }

  getAddresses() {
    this.contactsService.getAddressesByID(this.contactID).subscribe(address => {
      this.addressesData = address
      if (this.addressesData.length) {
        this.setAddresses(address)
      }
    });
  }

  addnewFormGroup() {
    return this.fb.group({
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      id: [''],
      contactId: ['']
    })
  }

  addNewEntry() {
    this.addressControls.push(this.addnewFormGroup());
    let ctrLength = this.addressControls.length
    this.addressControls.at(ctrLength - 1).patchValue({
      id: ctrLength,
      contactId: this.contactID
    })
  }

  setContact(contactData: any) {
    this.contact = contactData
  }

  setAddresses(address: any) {
    if (address.length) {
      for (let i = 0; i < address.length - 1; i++) {
        this.addressControls.push(this.addnewFormGroup());
      };
      this.addressControls.setValue(address)
    }
  }

  onClickSubmit(formData: any) {
    if (this.addressesData.length) {
      for (let add of this.addressesData) {
        for (let [key, value] of Object.entries<any>(formData.addresses)) {
          if (add.id == value.id) {
            console.log('update')
            this.updateAddress(formData.addresses[key])
          }
          else {
            console.log('save')
            formData.addresses[key]['id'] = ''
            this.saveAddresses(formData.addresses[key])
          }
        }
      }
    }
    else if (formData.addresses.length = 1) {
      this.saveAddresses(formData.addresses[0])
    }
  }

  saveAddresses(address: any) {
    this.contactsService.saveAddress(address, this.contactID).subscribe(res => {
      console.log(res)
    })
  }

  updateAddress(address: any) {
    this.contactsService.updateAddress(address, this.contactID).subscribe(res => {
      console.log(res)
    })
  }

  deleteRow(index: number) {
    this.addressControls.removeAt(index);
    let control = this.addressControls.value[0]
    this.contactsService.deleteAddress(control.id).subscribe(res => {
      console.log(res)
    })
  }

}
