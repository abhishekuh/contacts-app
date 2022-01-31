import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact.model';
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
  }

  ngOnInit(): void {
    this.contactsService.getContactByID(this.contactID)
      .subscribe(contact =>
        (this.setContact(contact)));
  }

  addnewFormGroup() {
    return this.fb.group({
      street1: [''],
      street2: [''],
      town: [''],
      country: ['']
    })
  }

  addNewEntry() {
    // const control = new FormControl(null, [Validators.required]);
    // (<FormArray>this.addAddressForm.get('addresses')).push(control);
    this.addressControls.push(this.addnewFormGroup());
  }

  setContact(contactData: any) {
    this.contact = contactData
    // this.addAddressForm.patchValue({
    //   addresses: contactData.addresses
    // })
  }

  onClickSubmit(formData: any) {

    const data = {
      // contactId: this.contactID,
      addresses: this.addAddressForm.value.addresses,
    }
    // console.log(data)
    this.contactsService.saveAddresses(data, this.contactID).subscribe(res => {
      console.log(res)
      // this.router.navigateByUrl('/home')
    })
  }

}
