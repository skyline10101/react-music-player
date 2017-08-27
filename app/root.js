import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import {MUSIC_LIST} from './config/musiclist';
import { Router, IndexRoute, Link, Route, hashHistory} from 'react-router';
import Pubsub from 'pubsub-js';


let App = React.createClass({
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		}
	},
	playMusic(musicItem) {
		$('#player').jPlayer('setMedia',{
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: musicItem
		});
	},
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicListLength = this.state.musicList.length;
		if (type === 'next') {
			newIndex = (index + 1) % musicListLength;
		} else {
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}
		this.playMusic(this.state.musicList[newIndex]);
	},
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem);
	},
	componentDidMount() {		
		$("#player").jPlayer({
			// ready: function () {
			// 	$(this).jPlayer("setMedia", {
			// 		//mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E8%8E%AB%E6%96%87%E8%94%9A-%E5%A4%96%E9%9D%A2%E7%9A%84%E4%B8%96%E7%95%8C.mp3"
			// 		mp3: MUSIC_LIST[0].file
			// 	}).jPlayer('play');
			// },
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});	
		this.playMusic(this.state.currentMusicItem);
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item !== musicItem;
				})
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', (msg) => {
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', (msg) => {
			this.playNext('next');
		});
	},	
	componentWillUnMount() {	
		Pubsub.unSubscribe('DELETE_MUSIC');	
		Pubsub.unSubscribe('PLAY_MUSIC');	
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		$('#player').unbind($.jPlayer.e.ended);
	},
	render() {
		console.log('App-render');
		return (
			<div>
				<Header/>
				{ React.cloneElement(this.props.children, this.state) }				
			</div>
		);
	}
});

let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={MusicList}></Route>
				</Route>
			</Router>
		);
	}
});

export default Root;