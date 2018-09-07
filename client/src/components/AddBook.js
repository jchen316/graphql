import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  displayAuthors() {
    const data = this.props.data;
    if (data.loading) {
      return (<option>Loading...</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" onChange={e => this.setState({name: e.target.value})}/>
        </div>

        <div className="fields">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({authorId: e.target.value})}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// stored in component's props
export default graphql(getAuthorsQuery)(AddBook);