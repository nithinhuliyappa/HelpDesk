import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { ToastrService } from "ngx-toastr";
import { CustomValidator, MatchPassword } from "./register.customvalidator";
import { UserProfile } from "src/app/metadata/user.metadata";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z][a-z A-Z]+$"),
            Validators.minLength(3)
          ]
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-z A-Z]+$"),
            Validators.minLength(3)
          ]
        ],
        email: [
          "",
          [Validators.required, Validators.email],
          CustomValidator.uniqueEmail(this.db)
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])")
            ),
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        cpassword: ["", [Validators.required]],
        role: ["", [Validators.required]]
      },
      { validator: MatchPassword }
    );
  }
  get firstName() {
    return this.registrationForm.get("firstName");
  }
  get lastName() {
    return this.registrationForm.get("lastName");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get cpaswword() {
    return this.registrationForm.get("cpaswword");
  }
  get role() {
    return this.registrationForm.get("role");
  }

  private resetForm(): void {
    this.registrationForm.reset();
  }

  register(formData: UserProfile) {
    const callback = () => this.router.navigate(["/login"]);

    this.auth
      .register(formData, callback)
      .then(data => {
        if (data) {
          this.toastr.success(
            `please login to continue`,
            "Registration succesful"
          );
          this.resetForm();
        }
      })
      .catch(err => {
        this.toastr.error(err.message, "error");
      });
  }

  cancel() {
    this.router.navigate(["/login"]);
  }
}
