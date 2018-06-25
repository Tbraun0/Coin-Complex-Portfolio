'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, Text, TouchableOpacity, View, Image
} from 'react-native'
import LoginButton from './LoginButton.js';

import Icon from 'react-native-vector-icons/FontAwesome'

let SideMenuWidth = 250
export default class Menu extends React.Component {

    onPressMenu = () => {
    this.props.navigation.navigate('DrawerOpen')
  }
  
  onPressBack = () => {
    this.props.navigation.goBack()
  }

    render() {
        var accountBorder = this.props.currentlySelected == 'Account' ? '#30a1ad' : 'rgba(0,0,0,0)';
        var settingsBorder = this.props.currentlySelected == 'Settings' ? '#30a1ad' : 'rgba(0,0,0,0)';
        var notificationsBorder = this.props.currentlySelected == 'Notifications' ? '#30a1ad' : 'rgba(0,0,0,0)';
        var newsBorder = this.props.currentlySelected == 'News' ? '#30a1ad' : 'rgba(0,0,0,0)';

        return (
            <View style={[styles.sideMenu, this.props.style || {}]}>
                  <View style={{ paddingHorizontal: 5 }}>
                    { this._renderHeader() }
                    <View style={styles.separationBar}></View>
                      <TouchableOpacity style={ [styles.menuAccount, {borderLeftColor: accountBorder}]} 
                        onPress={() => this.props.switchSelect('Account')}>
                            <Icon name='user-circle' color={'#e9ebeb'} size={24} />
                            <Text style={styles.menuText} type='h5White'>Account</Text>
                      </TouchableOpacity>
                      <View style={styles.separationBar}></View>
                      <TouchableOpacity style={ [styles.menuSettings, {borderLeftColor: settingsBorder}]} 
                        onPress={() => this.props.switchSelect('Settings')}>
                            <Icon name='cog' color={'#e9ebeb'} size={24} />
                            <Text style={styles.menuText} type='h5White'>Settings</Text>
                      </TouchableOpacity>
                      <View style={styles.separationBar}></View>
                      <TouchableOpacity style={ [styles.menuNotifications, {borderLeftColor: notificationsBorder}]} 
                        onPress={() => this.props.switchSelect('Notifications')}>
                            <Icon name='comments' color={'#e9ebeb'} size={24} />
                            <Text style={styles.menuText} type='h5White'>Notifications</Text>
                      </TouchableOpacity>
                      <View style={styles.separationBar}></View>
                      <TouchableOpacity style={ [styles.menuNews, {borderLeftColor: newsBorder}]} 
                        onPress={() => this.props.switchSelect('News')}>
                            <Icon name='book' color={'#e9ebeb'} size={24} />
                            <Text style={styles.menuText} type='h5White'>News</Text>
                      </TouchableOpacity>
                      <View style={styles.separationBar}></View> 
                  </View>
                  { this._renderFooter() }
            </View>
        )
    }

    _renderHeader() {
        return (
            <View style={ styles.header }>
                <View style={ styles.userInfosHolder }>
                    <Image style={ styles.avatar } source={{ uri: 'https://scontent-frt3-1.cdninstagram.com/t51.2885-15/s640x640/e15/15623603_1636005733360687_308770619158167552_n.jpg' }} />
                    <View style={ styles.userInfos }>
                        <Text type='h1White' style={ styles.username }>Username</Text>
                        <Text type='h5White'>View and edit profile</Text>
                    </View>

                </View>
            </View>
        )
    }
    _renderFooter() {
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={this.props.handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sideMenu: {
        width: SideMenuWidth,
        height:'100%',
    },
    menuAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 15, 
        borderLeftWidth: 2,     
    },
    menuSettings: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 15, 
        borderLeftWidth: 2,       
    },
    menuNotifications: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 15,  
        borderLeftWidth: 2,      
    },
    menuNews: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 15,  
        borderLeftWidth: 2,     
    },
    separationBar: {
        height:1,
        width:'100%',
        backgroundColor: 'rgba(233,235,235, 0.5)',
    },
    sideMenuTitle: {
        marginRight: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    logoutText: {
        marginLeft: 20,
        fontSize:18,
        textAlign:'center',
        color: '#30a1ad',
    },
    menuText: {
        marginLeft: 20,
        color: '#e9ebeb',
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    footerContainer: {
        height:50,
        width:'100%',
        bottom:0,
        position:'absolute',
    },
    userInfos: {
        height: 50,
        justifyContent: 'center',
    },
    username: {
        fontWeight: '700',
        color: "#e9ebeb",
    }
})

module.exports = Menu