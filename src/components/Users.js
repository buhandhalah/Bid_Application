import React, { Component } from 'react';
import * as firebase from 'firebase';

const config = {
    databaseURL: "https://biddingapplication-9fdd5.firebaseio.com/"
}

const fb = firebase
    .initializeApp(config)
    .database()
    .ref()


fb.child('users').push({
    username: 'Mohamed',
    privilegeCust: 'No',
    groupName: 'user'
})



class Chat extends Component {

    state = {
        key: '',
        users: null,
        inputText: ""
    }

    USER = JSON.parse(localStorage.getItem('profile')).nickname

    listenValue = (snapshot) => {
        this.setState({ users: snapshot.val() })
    }


    componentWillMount() {
        console.log('Props ', this.props)
        fb.child('users').limitToLast(10).on('value', this.listenValue)
    }

    handleInputTextChange = (event) => {
        this.setState(
            { inputText: event.target.value }
        )
    }

    sendMessage = () => {
        fb.child('users').push({
            username: this.USER,
            privilegeCust: 'Yes',
            groupName: 'user'
        })
    }

    updateMessage = (key) => {
        this.setState(
            { inputText: this.state.users[key].text, key: key }
        )
    }

    handleSave = () => {
        fb.child('messages').child(this.state.key).update({
            user: this.USER,
            text: this.state.inputText
        })
    }

    remeoveMessage = (key) => {
        fb.child('messages').child(key).remove()
    }

    render() {
        return (
            <div >
                <h1>My Prototype</h1>
                <table>
                    <tr>
                        <th>User</th>
                        <th>Message</th>
                        <th></th>
                    </tr>

                    {this.state.messages
                        ?
                        Object.keys(this.state.messages).map(
                            key =>
                                <tr>
                                    <td key={key}><strong>{this.state.messages[key].user}</strong></td>
                                    {this.state.messages[key].user === this.USER
                                        ? < td style={{ backgroundColor: 'red' }}> {this.state.messages[key].text}</td>
                                        :
                                        < td > {this.state.messages[key].text}</td>
                                    }
                                    <td>
                                        <button onClick={() => this.updateMessage(key)}> update </button>
                                        <button onClick={() => this.remeoveMessage(key)}> remove </button>
                                        }</td>
                                </tr>
                        )
                        :
                        <p>No message</p>
                    }

                </table>
                {/*
        <ul>
          {this.state.messages
            ?
            Object.keys(this.state.messages).map(
              key =>
                <li key={key}><strong>{this.state.messages[key].user}</strong>: {this.state.messages[key].text}

                  {this.state.messages[key].user === 'Mohamed'
                    ?
                    <span>
                      <button onClick={() => this.updateMessage(key)}> update </button>
                      <button onClick={() => this.remeoveMessage(key)}> remove </button>
                    </span>
                    : <span></span>
                  }

                </li>
            )
            :
            <p>No message</p>
          }
        </ul>
  */}
                <input type="text" value={this.state.inputText} onChange={this.handleInputTextChange} />
                <button onClick={this.sendMessage}> Send </button>
                <button onClick={this.handleSave}> saveChanges </button>

            </div>
        )
    }
}

export default Chat