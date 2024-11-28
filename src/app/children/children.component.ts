import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildService } from '../child.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  children: any[] = [];
  selectedChild: any = null;

  childForm!: FormGroup;
  username: string = 'asidikidemo'; // Static username for now
  
  constructor(private childService: ChildService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getChildren();
    this.initializeForm();
  }

  // Initialize the reactive form
  initializeForm(): void {
    this.childForm = this.fb.group({
      first_name: ['', ],
      last_name: ['', ],
      birthday: ['', ],
      gender: ['', ],
    });
  }

  // Fetch the list of children
  getChildren(): void {
    this.childService.getChildren(this.username).subscribe(
      (data) => {
        this.children = data;
        console.log('Children list:', this.children);
      },
      (error) => {
        console.error('Error fetching children:', error);
      }
    );
  }

  // Select a child and load their data into the form
  selectChild(childId: number): void {
    this.childService.getChild(childId).subscribe(
      (data) => {
        this.selectedChild = data;
        this.childForm.patchValue({
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          birthday: data.birthday,
          gender: data.gender,
        });
      },
      (error) => {
        console.error('Error fetching child details:', error);
      }
    );
  }

  updateChild(): void {
    if (this.childForm.valid && this.selectedChild) {
      // Construct the payload dynamically
      const payload = {
        first_name: this.childForm.value.first_name?.trim() || null, // Trim to avoid empty spaces
        last_name: this.childForm.value.last_name?.trim() || null,
        birthday: this.childForm.value.birthday || null, // Null if not provided
        gender: this.childForm.value.gender || null,
        street: this.childForm.value.street?.trim() || this.selectedChild.street || '', // Prioritize form value
        country: this.childForm.value.country || this.selectedChild.country || null,
        // Add other fields if necessary
      };
  
      console.log('Payload being sent:', payload);
  
      // Call the service to update the child
      this.childService.updateChild(this.selectedChild.id, payload).subscribe(
        (response) => {
          console.log('Child updated successfully:', response);
          this.getChildren(); // Refresh the list after update
          // Optionally show a success message
        },
        (error) => {
          console.error('Error updating child:', error);
          if (error.status === 400) {
            console.error('Validation error occurred. Check the payload.');
          } else {
            console.error('An unexpected error occurred.');
          }
          // Optionally show an error message
        }
      );
    } else {
      if (!this.childForm.valid) {
        console.error('Form is invalid. Please check the form fields.');
      }
      if (!this.selectedChild) {
        console.error('No child selected for update.');
      }
    }
  }
  // addSocialNetwork(): void {
  //   this.selectedChild.socialNetworks.push({ id: 0, name: '', username: '' });
  // }
  
  // saveSocialNetwork(network: any): void {
  //   // Add logic to save the social network details (e.g., call an API or update the state)
  //   console.log('Saved:', network);
  // }
  
  // removeSocialNetwork(networkId: number): void {
  //   this.selectedChild.socialNetworks = this.selectedChild.socialNetworks.filter(
  //     (network: any) => network.id !== networkId
  //   );
  // }
  
  
}