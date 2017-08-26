import React from 'react';
import Progress from '../components/progress';
import './player.less';


let duration=null;
let Player = React.createClass({
	getInitialState() {
		return {
			progress: 0,
			volume:0,
			isPlay: true
		}
	},
	componentDidMount() {
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute
			});	//此处progress是100以内的数。
		});
	},

	componentWillUnMount() {
		$('#player').unbind($.jPlayer.event.timeupdate);		
	},

	//此处的progressPercent是大于0小于1的小数
	progressChangeHandler(progressPercent){		
		$('#player').jPlayer('play',duration * progressPercent);
	},

	//此处的volumePercent是大于0小于1的小数
	changeVolumeHandler(volumePercent) {
		$('#player').jPlayer('volume', volumePercent);
	},

	play() {
		if (this.state.isPlay) {
			$('#player').jPlayer('pause');
		} else {
			$('#player').jPlayer('play');
		}

		this.setState({
			isPlay : !this.state.isPlay
		});
	},

	render() {
		return (
			<div className="player-page">
				<h1 className="caption">我的私人音乐坊 &gt;</h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-2:00</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper">
									<Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor="#aaa"
									>
									</Progress>
								</div>	
							</div>
						</div>
						<div style={{height: 10,lineheight: '10px'}}>
							<Progress
								progress={this.state.progress}
								onProgressChange={this.progressChangeHandler}
							>
							</Progress>
						</div>
						<div className="mt35 row">
							<div>
								<i className="icon prev"></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
								<i className="icon next ml20"></i>
							</div>
							<div className="-col-auto">
								<i className="icon repeat-cycle"></i>
							</div>
						</div>
					</div>
					<div className="-col-auto cover">
						<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
					</div>
				</div>
			</div>
		);
	}
});

export default Player;