import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import profilePic from "../../img/profile.png"

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="Input your comment"/>
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [...this.props.commentList],
      submitting: false,
      value: "",
      commentavatar: profilePic,
    };
  }

  componentWillUnmount=()=>{
    this.props.actions.resetState("COMMENT");
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: this.props.profile.userName,
            avatar:
              //  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              this.state.commentavatar,
            content: this.state.value,
            datetime: moment().format('MMMM Do YYYY, h:mm:ss a'),
          },
          ...this.state.comments
        ]
      });
    }, 200);

    setTimeout(() => {
      let commentInfo = {
        gameID: this.props.gameID,
        commentList: this.state.comments
      };
      console.log(commentInfo.commentList);
      this.props.actions.addComments(commentInfo);
    }, 2000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    console.log(comments);
    return (
      <div class="game-comment">
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment id="comment-area"
          avatar={
            <Avatar
              src= {profilePic}
              alt="Han Solo"
            />
        
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default Comments;
