import React, { Component } from 'react';
//Field is a react component which is automatically wired to redux, used
// to create and handle  from fields
// reduxForm is a function is very similar to the connect method what we have been used in redux
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

// code refactoring, renderTitleField to generic renderField for
// title and category fields instead of writing two different functions as both takes input text
/*  renderTitleField(field) {
    return (
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  } */

// here {...field.input} is to attach events like onchange, onfocus etc
// {field.meta.error} here the error object is auotomatically added by validate method
// based on the field name

// we can destructure the field property here as shown below
// const { meta } = field; with this we can remove field

// we can further destructure the nested properties of meta as below
// { meta: { touched, error } } = field; with this we can remove meta also

  renderField(field) {

    const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
      return (
        <div className={className}>
          <label>{field.label}</label>
          <input
            className="form-control"
            type="text"
            {...field.input}
          />
          <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
    }


onSubmit(values) {
  // the call back method is to handle to navigate to posts_index after the post has been created
  this.props.createPost(values, () => {
    this.props.history.push('/');
  });
}


// in Field label is an arbitary attribute,
// you can send it as something myLable also
  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// when user submits the form the validate function will be called automaticalyy
function validate(values) {
  const errors= {};

  // validate the input form values
  if(!values.title) {
    errors.title= "Enter a title";
  }
  if(!values.categories) {
    errors.categories= "Enter a categories";
  }
  if(!values.content) {
    errors.content= "Enter a content";
  }

  // if the errors is empty then the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

// here PostNewForm is the form name which shoud be unique
// to make sure PostsNew has a isolated state
// for this syntax watch 141 video
export default reduxForm({
  validate: validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
