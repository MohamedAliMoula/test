import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  username: string = 'asidikidemo'; 
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProfileData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      lastName: ['', ],
      firstName: ['', ],
      email: ['', [, Validators.email]],
      dob: ['', ],
      phone: ['', ],
      gender: ['Parent 1', ],
    });
  }

  loadProfileData(): void {
    this.profileService.getProfile(this.username).subscribe(
      (data) => {
        console.log(data);
        
        this.profileForm.patchValue({
          lastName: data.last_name,
          firstName: data.first_name,
          email: data.email,
          dob: data.birthday,
          phone: data.phone_number,
          gender: data.gender,
        });
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const payload: any = {
        username: this.username, 
        first_name: this.profileForm.value.firstName,
        last_name: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
        birthday: this.profileForm.value.dob,
        gender: this.profileForm.value.gender,
      };
  
      if (this.profileForm.value.phone) {
        payload.phone_number = this.profileForm.value.phone;
      }
  
      console.log('Payload to be sent:', payload); 
  
      this.profileService.updateProfile(this.username, payload).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
          if (error.status === 400) {
            console.error('Validation error. Please check the payload and API requirements.');
          }
        }
      );
    } else {
      console.error('Invalid form data');
    }
  }
  
  
}