import React from 'react'
import * as MUI from 'material-ui'
import { Link } from 'react-router'

export default class Menu extends React.Component {
    render() {
        return (
            <div>
                <MUI.Toolbar style={{backgroundColor: 'blue'}}>
                    <MUI.ToolbarGroup firstChild={true}>
                        <MUI.FlatButton
                            containerElement={<Link to="/" />}
                            label='Dashboard' />
                        <MUI.FlatButton
                            containerElement={<Link to="/category" />}
                            label='Category' />
                            <MUI.FlatButton
                            containerElement={<Link to="/users" />}
                            label='Users' />
                    </MUI.ToolbarGroup>
                </MUI.Toolbar>
                {this.props.children}
            </div>
        )
    }
}