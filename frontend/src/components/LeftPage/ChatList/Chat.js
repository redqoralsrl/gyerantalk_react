import React, { useState, Component } from 'react';
import { Button, Input } from '@material-ui/core';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import io from "socket.io-client";
import { connect } from 'react-redux';
import moment from 'moment';
import { getChats, afterPostMessage } from "../../../api/actions/chat_action";
import ChatCard from './Sections/ChatCard';
import Dropzone from 'react-dropzone';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';

export class Chat extends Component {

    state = {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "http://localhost:4000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value,
        })
    }

    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));

    submitChatMessage = (e) => {
        e.preventDefault();
        if(this.state.chatMessage !== ""){
            let chatMessage = this.state.chatMessage;
            let _id = this.props.user.userData._id;
            let userName = this.props.user.userData.userName;
            let userImage = this.props.user.userData.image;
            let nowTime = moment();
            let type = "Text";
    
            this.socket.emit("Input Chat Message", {
                chatMessage,
                _id,
                userName,
                userImage,
                nowTime,
                type,
            });
        }
        
        this.setState({ chatMessage: "" });
    }

    onDrop = (files) => {

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }

        let formData = new FormData;

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        axios.post('/api/chats/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let _id = this.props.user.userData._id;
                    let userName = this.props.user.userData.userName;
                    let userImage = this.props.user.userData.image;
                    let nowTime = moment();
                    let type = "VideoOrImage";

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        _id,
                        userName,
                        userImage,
                        nowTime,
                        type
                    });
                }
            })
    }


    render() {
        return (
            <div>
                <div style={{height:'300px', overflow:'hidden'}}>
                    <div style={{overflow:'scroll'}}>
                        {
                            this.props.chats && (
                                this.renderCards()
                            )
                        }
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        />
                    </div>
                </div>
                <form onSubmit={this.submitChatMessage}>
                    <Input
                        id="message"
                        color="secondary"
                        placeholder="메세지를 작성하세요"
                        inputProps={{ 'aria-label': 'description' }}
                        value={this.state.chatMessage}
                        onChange={this.handleSearchChange}
                    />
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Button>
                                        <DownloadOutlined type="upload" />
                                    </Button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <Button variant="outlined" color="secondary" type="submit" onClick={this.submitChatMessage}>
                        <SubdirectoryArrowLeftIcon />
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user,
        chats : state.chat,
    }
}


export default connect(mapStateToProps)(Chat);


