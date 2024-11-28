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
  username: string = 'asidikidemo'; 
  
  constructor(private childService: ChildService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getChildren();
    this.initializeForm();
  }

  initializeForm(): void {
    this.childForm = this.fb.group({
      first_name: ['', ],
      last_name: ['', ],
      birthday: ['', ],
      gender: ['', ],
    });
  }

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
      const formData = new FormData();
  
      formData.append('first_name', this.childForm.value.first_name?.trim() || '');
      formData.append('last_name', this.childForm.value.last_name?.trim() || '');
      formData.append('birthday', this.childForm.value.birthday || ''); 
      formData.append('gender', this.childForm.value.gender || '');
  
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      this.childService.updateChild(this.selectedChild.id, formData).subscribe(
        (response) => {
          console.log('Child updated successfully:', response);
          this.getChildren(); 
        },
        (error) => {
          console.error('Error updating child:', error);
          if (error.status === 400) {
            console.error('Validation error details:', error.error || 'No details provided');
          }
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