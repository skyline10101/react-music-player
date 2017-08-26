import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import {MUSIC_LIST} from './config/musiclist';

let Root = React.createClass({

	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		}
	},
	componentDidMount() {		
		$("#player").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					//mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E8%8E%AB%E6%96%87%E8%94%9A-%E5%A4%96%E9%9D%A2%E7%9A%84%E4%B8%96%E7%95%8C.mp3"
					mp3: MUSIC_LIST[0].file
				}).jPlayer('play');
			},
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});		
	},	
	componentWillUnMount() {			
	},
	render() {
		return (
			<div>
				<Header/>
				<MusicList
					currentMusicItem={this.state.currentMusicItem}
					musicList={this.state.musicList}
				>
				</MusicList>
			</div>
		);
	}
});

export default Root;