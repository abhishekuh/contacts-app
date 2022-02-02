import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  addContactForm : FormGroup

  constructor(private contactsService:ContactsService,private fb: FormBuilder) { 
    this.addContactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts(){
    this.contactsService.getContacts().subscribe(contacts => (this.contacts = contacts));
  }

  onSubmit(FormData:any){
    const data = {
      first_name:FormData.first_name,
      last_name:FormData.last_name,
      avatar: 'https://handmade.network/static/light/empty-avatar.svg'
    }
    this.contactsService.saveContact(data).subscribe(res => {
      this.getContacts()
    })
  }

}
