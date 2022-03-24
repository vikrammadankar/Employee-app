import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [leaves, setLeaves] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactSalaryExists = contacts.filter((contact) =>
      contact.salary === salary ? contact : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.leaves === leaves ? contact : null
    );

    if (!salary || !name || !leaves) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactSalaryExists.length > 0) {
      return toast.error("This salary already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This leaves number already exists!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      salary,
      name,
      leaves,
    };

    addContact(data);
    toast.success("Contact added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="salary"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Leaves"
                value={leaves}
                onChange={(e) => setLeaves(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
