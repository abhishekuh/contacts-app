import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactsService:ContactsService) { 
  }

  ngOnInit(): void {
    this.contactsService.getContacts()
      .subscribe(contacts => 
        (this.contacts = contacts));
  }

}
