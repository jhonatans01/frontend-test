/**
 * Copyright (C) 2018 Juridoc
 * Form page view structure.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

/**
 * Form view class.
 */
@Class.Describe()
export class View extends Control.Component<{}> {
    /**
     * Form submit event handler.
     * @param event Event information.
     */
    @Class.Private()

    private submitHandler(event: Event): void {
        event.preventDefault();
        fetch('https://test.juridoc.com.br/register', {
            method: 'POST',
            body: JSON.stringify(this.data)
        }).then((response) => response.json())
            .then((responseJSON) => {
                alert(responseJSON.text);
            }).catch(error => {
            alert(error.message);
        });
    }

    data: any = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };

    handleValidation(e: any) {
        this.data[e.target.id] = e.target.value;

        if (e.target.id == "firstName") {
            if (e.target.validity.valueMissing) {
                e.target.setCustomValidity("This field cannot be empty");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "lastName") {
            if (e.target.validity.valueMissing) {
                e.target.setCustomValidity("This field cannot be empty");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "username") {
            if (e.target.value.length < 6) {
                e.target.setCustomValidity("Must have at least 6 digits");
            } else if (e.target.validity.patternMismatch) {
                e.target.setCustomValidity("No special characters are allowed");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "phone") {
            if (e.target.validity.patternMismatch) {
                e.target.setCustomValidity("Only numbers, whitespaces and dash are allowed");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "password") {
            if (this.data.password.length < 6) {
                e.target.setCustomValidity("Must have at least 6 digits");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "passwordConfirm") {
            if (this.data.password.length == 0) {
                e.target.setCustomValidity("You must fill the previous field");
            } else if (this.data.passwordConfirm.length < 6) {
                e.target.setCustomValidity("Must have at least 6 digits");
            } else if (e.target.value != this.data.password) {
                e.target.setCustomValidity("Passwords don't match");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (e.target.id == "email") {
            if (e.target.validity.patternMismatch) {
                e.target.setCustomValidity("No special characters are allowed. Also, it must be at juridoc.com.br");
            } else {
                e.target.setCustomValidity("");
            }
        }
    }

    /**
     * Form element.
     */
    @Class.Private()
    private form: HTMLFormElement = (
        <form class="form">
            <div class="form-group">
                <label for="firstName">First name:</label>
                <input id="firstName" class="form-control" placeholder="First name" type="text" required
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="lastName">Last name:</label>
                <input id="lastName" class="form-control" placeholder="Last name" type="text" required
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input id="username" pattern="^[_A-z0-9]{1,}$" minlength="6" placeholder="Username"
                       class="form-control" type="text"
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input id="email" pattern="[a-z0-9._%+-]+@juridoc.com.br" placeholder="Email"
                       class="form-control" type="email"
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input id="phone" pattern="^[0-9-\s?]*$" class="form-control" placeholder="Phone" type="text"
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input id="password" class="form-control" placeholder="Password" type="password" minlength="6"
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div class="form-group">
                <label for="passwordConfirm">Confirm password:</label>
                <input id="passwordConfirm" class="form-control" placeholder="Confirm password" minlength="6"
                       type="password"
                       oninput={(e: any) => this.handleValidation(e)}/>
            </div>
            <div align="right">
                <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>
    ) as HTMLFormElement;


    /**
     * View element.
     */
    @Class.Private()
    private skeleton: HTMLDivElement = (
        <div class="panel">
            <img id="logo" src="/images/logo-colorful.png"/>
            {this.form}
        </div>
    ) as HTMLDivElement;

    /**
     * Default constructor.
     */
    public constructor() {
        super({});
        this.form.addEventListener('submit', Class.bindCallback(this.submitHandler.bind(this)));
    }

    /**
     * View element.
     */
    @Class.Public()
    public get element(): HTMLElement {
        return this.skeleton;
    }
}

