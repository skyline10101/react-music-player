import React from 'react';
import Header from './components/header';
import Progress from './components/progress';

let duration=null;
let Root = React.createClass({
	getInitialState() {
		return {
			progress: '-'
		}
	},
	componentDidMount() {
		
		$("#player").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E8%8E%AB%E6%96%87%E8%94%9A-%E5%A4%96%E9%9D%A2%E7%9A%84%E4%B8%96%E7%95%8C.mp3"
				}).jPlayer('play');
			},
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			});	//此处progress是100以内的数。	
		});
	},

	componentWillUnMount() {
		$('#player').unbind($.jPlayer.event.timeupdate);		
	},

	//此处的progress是大于0小于1的小数
	progressChangeHandler(progressPercent){		
		$('#player').jPlayer('play',duration * progressPercent);
	},

	render() {
		return (
			<div>
				<Header/>
				<Progress
					progress={this.state.progress}	
					onProgressChange={this.progressChangeHandler}
				>
				</Progress>
			</div>
		);
	}
});

export default Root;