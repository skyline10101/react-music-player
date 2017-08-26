import React from 'react';
import MusicListItem from '../components/musiclistitem';


let MusicList = React.createClass({
	componentDidMount() {
	},


	render() {
		let listEle = null;
		listEle = this.props.musicList.map( (item) => {
			console.log('item:' + item.id);		

			//return时记得加上括号	
			return (
				<MusicListItem
					focus={item === this.props.currentMusicItem}
					key={item.id}
					musicItem={item}
				>
				</MusicListItem>
			);
				
		});

		console.log('listEle:' + listEle);

		return (
			<ul>
				{ listEle }
			</ul>
		);
	}
});

export default MusicList;