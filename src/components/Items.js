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
        categoryKey:'',
        categories:null,
        items: null,
        inputTextCategoryName: '',
        inputTextItemName: '',
        inputTextItemDesc: '',
        inputTextExpiry: '',
        userKey: ''
    }

    USER = JSON.parse(localStorage.getItem('profile')).nickname

    listenValue = (snapshot) => {
        this.setState({ items: snapshot.val() })
    }


    componentWillMount() {
        console.log('Props ', this.props)
        FB.categories.limitToLast(10).on('value', this.listenValue)
        FB.users.orderByChild("username").equalTo(this.USER).on('value',
            (snapshot) => {
                //this.setState({ userKey: snapshot.val() })
                this.setState({ userKey: Object.keys(snapshot.val())[0] })
                console.log("This is snapshot.val ", Object.keys(snapshot.val())[0])
            }
        )

        FB.categories.limitToLast(10).on('value',
            (snapshot) => {
                this.setState({ categories: snapshot.val() })
                console.log("This is snapshot.val for categories", snapshot.val())
            }
        )
    }

    handleInputTextChangeCategoryName = (event) => {
        this.setState(
            { inputTextCategoryName: event.target.value }
        )
    }

    handleInputTextChangeItemName = (event) => {
        this.setState(
            { inputTextItemName: event.target.value }
        )
    }

    handleInputTextChangeItemDesc = (event) => {
        this.setState(
            { inputTextItemDesc: event.target.value }
        )
    }

    handleInputTextChangeExpiry = (event) => {
        this.setState(
            { inputTextExpiry: event.target.value }
        )
    }

    sendMessage = () => {
        FB.categories.push({
            categoryName: this.state.inputTextCategoryName,
            itemName: this.state.inputTextItemName,
            itemDesc: this.state.inputTextItemDesc,
            categoryKey: '',
            userKey: this.state.userKey,
            expiry: this.state.inputTextExpiry

        })
    }

    updateMessage = (key) => {
        this.setState(
            { inputText: this.state.items[key].categoryName, key: key }
        )
    }

    handleSave = () => {
        FB.categories.child(this.state.key).update({
            categoryName: this.state.inputTextCategoryName
        })
    }

    remeoveMessage = (key) => {
        FB.categories.child(key).remove()
    }

    handleProgram = (event, index, value) => {
        this.setState({ categoryKey: value });
        console.log(this.state.categoryKey)
    }

    render() {
        return (
            <div >
                <h1>Category</h1>

                <MUI.Table selectable={false}>
                    <MUI.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <MUI.TableRow>
                            <MUI.TableHeaderColumn>Id</MUI.TableHeaderColumn>
                            <MUI.TableHeaderColumn>Category</MUI.TableHeaderColumn>
                            <MUI.TableHeaderColumn></MUI.TableHeaderColumn>
                        </MUI.TableRow>
                    </MUI.TableHeader>
                    <MUI.TableBody displayRowCheckbox={false}>
                        {this.state.items
                            ?
                            Object.keys(this.state.items).map(
                                key =>
                                    <MUI.TableRow key={key}>
                                        <MUI.TableRowColumn key={key}><strong>{this.state.items[key].categoryKey}</strong></MUI.TableRowColumn>
                                        <MUI.TableRowColumn>{this.state.items[key].itemName}</MUI.TableRowColumn>
                                        <MUI.TableRowColumn>{this.state.items[key].itemDesc}</MUI.TableRowColumn>
                                        <MUI.TableRowColumn>{this.state.items[key].userKey}</MUI.TableRowColumn>
                                        <MUI.TableRowColumn>{this.state.items[key].expiry}</MUI.TableRowColumn>
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
                                <MUI.TextField type="text" value={this.state.inputTextItemName} onChange={this.handleInputTextChangeItemName} />
                                <MUI.TextField type="text" value={this.state.inputTextItemDesc} onChange={this.handleInputTextChangeItemDesc} />
                                <MUI.TextField type="text" value={this.state.inputTextExpiry} onChange={this.handleInputTextChangeExpiry} />
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