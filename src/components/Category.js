import React, { Component } from 'react';
import * as FB from './FB';
import * as MUI from 'material-ui'


/*
FB.category.push({
    categoryName: 'MacBook Pro',
})

FB.category.push({
    categoryName: 'MacBook Air',
})

FB.category.push({
    categoryName: 'MacBook',
})

FB.category.push({
    categoryName: 'iMac',
})
*/



class Category extends Component {

    state = {
        key: '',
        category: null,
        inputText: ""
    }

    USER = JSON.parse(localStorage.getItem('profile')).nickname

    listenValue = (snapshot) => {
        this.setState({ category: snapshot.val() })
    }


    componentWillMount() {
        console.log('Props ', this.props)
        FB.categories.limitToLast(10).on('value', this.listenValue)
    }

    handleInputTextChange = (event) => {
        this.setState(
            { inputText: event.target.value }
        )
    }

    sendMessage = () => {
        FB.categories.push({
            categoryName: this.state.inputText
        })
    }

    updateMessage = (key) => {
        this.setState(
            { inputText: this.state.category[key].categoryName, key: key }
        )
    }

    handleSave = () => {
        FB.categories.child(this.state.key).update({
            categoryName: this.state.inputText
        })
    }

    remeoveMessage = (key) => {
        FB.categories.child(key).remove()
    }

    render() {
        return (
            <div >
                <h1>Category</h1>
                {/*
                <table>
                    <tr>
                        <th>User</th>
                        <th>Message</th>
                        <th></th>
                    </tr>

                    {this.state.category
                        ?
                        Object.keys(this.state.category).map(
                            key =>
                                <tr>
                                    <td key={key}><strong>{this.state.category[key].categoryName}</strong></td>
                                    < td > {this.state.category[key].categoryName}</td>

                                    <td>
                                        <button onClick={() => this.updateMessage(key)}> update </button>
                                        <button onClick={() => this.remeoveMessage(key)}> remove </button>
                                    </td>
                                </tr>
                        )
                        :
                        <p>No users</p>
                    }

                </table>
                

                <input type="text" value={this.state.inputText} onChange={this.handleInputTextChange} />
                <button onClick={this.sendMessage}> Send </button>
                <button onClick={this.handleSave}> saveChanges </button>
*/}

                <MUI.Table selectable={false}>
                    <MUI.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <MUI.TableRow>
                            <MUI.TableHeaderColumn>Id</MUI.TableHeaderColumn>
                            <MUI.TableHeaderColumn>Category</MUI.TableHeaderColumn>
                            <MUI.TableHeaderColumn></MUI.TableHeaderColumn>
                        </MUI.TableRow>
                    </MUI.TableHeader>
                    <MUI.TableBody displayRowCheckbox={false}>
                        {this.state.category
                            ?
                            Object.keys(this.state.category).map(
                                key =>
                                    <MUI.TableRow key={key}>
                                        <MUI.TableRowColumn key={key}><strong>{this.state.category[key].categoryName}</strong></MUI.TableRowColumn>
                                        <MUI.TableRowColumn>{this.state.category[key].categoryName}</MUI.TableRowColumn>
                                        <MUI.TableRowColumn>
                                            <MUI.FlatButton secondary label='Update' onClick={() => this.updateMessage(key)} />
                                            <MUI.FlatButton secondary label='Delete' onClick={() => this.remeoveMessage(key)} />
                                        </MUI.TableRowColumn>
                                    </MUI.TableRow>
                            )
                            :
                            <p>No users</p>
                        }
                        <MUI.TableRow>
                            <MUI.TableRowColumn>
                                <MUI.TextField type="text" value={this.state.inputText} onChange={this.handleInputTextChange} />
                            </MUI.TableRowColumn>
                            <MUI.TableRowColumn>
                                <MUI.FlatButton secondary label='Create' onClick={this.sendMessage} />
                                <MUI.FlatButton secondary label='Save Update' onClick={this.handleSave} />
                            </MUI.TableRowColumn>
                        </MUI.TableRow>
                    </MUI.TableBody>
                </MUI.Table>

            </div>
        )
    }
}

export default Category