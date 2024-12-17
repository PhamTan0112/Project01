import React, { Component } from "react";
import Layout from "../../core/Layout";
import Swal from "sweetalert2";
import ImageUploader from "react-images-upload";
import { addUser } from "../../../Utils/Requests/People";
import showError from "../../core/Error";
import showLoading from "../../core/Loading";

class AddUser extends Component {
  state = {
    buttonStyle: "block",
    formData: "",
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    address: "",
    info: "",
    photo: "",
    error: "",
    loading: false,
  };

  componentDidMount() {
    this.setState({
      formData: new FormData(),
    });
  }

  submit = async (e) => {
    e.preventDefault();
    if (!this.checkPasswordConfirmation()) {
      Swal.fire({
        icon: "error",
        title: "Password did not match",
      });
    } else {
      this.setState({ loading: true });

      const { formData } = this.state;

      const resp = await addUser({ ...this.state }).catch((err) => {
        this.setState({ error: err.response.data.error, loading: false });
      });

      if (resp && resp.status === 200) {
        this.setState({ loading: false });

        Swal.fire({
          icon: "success",
          title: "New User Added",
        });

        this.props.history.push("/people-users");
      }
    }
  };

  checkPasswordConfirmation = () => {
    return this.state.password === this.state.password2;
  };

  handleChange = (input) => (e) => {
    let value;

    // if (input === "photo") {
    //   if (e.length === 0) {
    //     return this.setState({ buttonStyle: "block", photo: "" });
    //   }
    //   value = e[0];
    //   this.setState({ buttonStyle: "none" });
    // } else {
    value = e.target.value;
    // }

    this.setState({ [input]: value, error: "" });
  };

  render() {
    const handleChange = this.handleChange;
    const {
      name,
      email,
      password,
      password2,
      phone,
      address,
      info,
      error,
      loading,
    } = this.state;

    return (
      <Layout title="Add New User">
        {showError(error)}
        {showLoading(loading)}
        {!loading && (
          <>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Enter your full name"
                onChange={handleChange("name")}
                value={name}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                required
                placeholder="Enter your email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Enter your address"
                onChange={handleChange("address")}
                value={address}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="number"
                className="form-control"
                required
                placeholder="Enter your phone number"
                onChange={handleChange("phone")}
                value={phone}
              />
            </div>

            <div className="form-group">
              <label>Additional Info</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter additional info"
                onChange={handleChange("info")}
                value={info}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="Enter the password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="Confirm Password"
                onChange={handleChange("password2")}
                value={password2}
              />
            </div>

            <button className="btn btn-success submit-form" onClick={this.submit}>
              Add User
            </button>

            {/* Optional photo upload */}
            {/* <div className="form-group">
              <ImageUploader
                withIcon={true}
                buttonText="Upload photo"
                onChange={handleChange("photo")}
                imgExtension={[".jpg", ".jpeg", ".png"]}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
                buttonStyles={{ display: this.state.buttonStyle }}
              />
            </div> */}
          </>
        )}
      </Layout>
    );
  }
}

export default AddUser;
