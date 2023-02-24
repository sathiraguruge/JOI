//import React
import React, { Component } from "react";
import Joi from "joi";

// Define the RegisterForm class
class RegisterForm extends Component {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    errors: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  };

  schema = {
    name: Joi.string().min(5).optional(),
    phone: Joi.number().min(10).max(10).optional(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).max(20).required(),
  };

  // Handle changes to form input fields by updating the state
  handleChange = (e) => {
    let data = this.state.data;
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Call the validateForm method to validate the form data
    this.validateForm();
  };

  validateForm = () => {
    // Create a Joi object schema from the schema object defined in the component
    const joiObjectSchema = Joi.object(this.schema);

    // Filter out empty values from the form data object
    const dataToBeValidated = Object.fromEntries(
      Object.entries(this.state.data).filter(([_, value]) => value !== "")
    );

    // Validate the form data against the Joi schema and collect any errors
    const { error } = joiObjectSchema.validate(dataToBeValidated, {
      abortEarly: false,
    });

    // Display the error message if there are any errors
    alert(error);
  };

  isFormValid = () => {
    const schema = Joi.object(this.schema);
    const { error, value } = schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (error) return true;
    else return false;
  };

  // Render a text input field with a label and name
  renderTextField = (label, name, value) => {
    return (
      <label>
        {`${label}: `}
        <input
          type="text"
          name={name}
          value={value}
          onChange={this.handleChange}
        />
      </label>
    );
  };

  // Render the form with input fields for name, phone, email, and password
  render() {
    const { name, phone, email, password } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tr>{this.renderTextField("Name", "name", name)}</tr>
            <tr>{this.renderTextField("Phone", "phone", phone)}</tr>
            <tr>{this.renderTextField("Email", "email", email)}</tr>
            <tr>{this.renderTextField("Password", "password", password)}</tr>
          </table>
          <button variant="primary" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

// Export the RegisterForm component
export default RegisterForm;
