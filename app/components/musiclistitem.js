import React from 'react';
import './musiclistitem.less';
import Pubsub from 'pubsub-js';

let MusicListItem = React.createClass({
	playMusic(musicItem) {
		Pubsub.publish('PLAY_MUSIC', musicItem);
	},
	//因为删除按钮在li中，需要停止事件冒泡
	deleteMusic(musicItem, e) {
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC', musicItem);
	},
	render() {		
		let musicItem = this.props.musicItem;
		return (
			<li 
				className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}
				onClick={this.playMusic.bind(this, musicItem)}
			>
				<p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
				<p className="-col-auto delete" onClick={this.deleteMusic.bind(this, musicItem)}></p>
			</li>
		);
	}
});

export default MusicListItem;