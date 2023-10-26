import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function SwipeList() {
	const [listData, setListData] = useState(
		Array(10)
			.fill('')
			.map((_, i) => ({ key: i, text: i }))
	);

	const handleCloseRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const handleDeleteRow = (rowMap, rowKey) => {
		console.log('Deleted item #', rowKey);
		handleCloseRow(rowMap, rowKey);
		const newData = [...listData];
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};

	const handleArchiveRow = (rowMap, rowKey) => {
		console.log('Archived item #', rowKey);
		// Here you need to add an implementation of data archiving
		// ....
		handleDeleteRow(rowMap, rowKey);
	};

	const handleLeftSwipeAction = (rowKey, rowMap) => {	
		handleArchiveRow(rowMap, rowKey);
	}

	const handleRightSwipeAction = (rowKey, rowMap) => {
		handleDeleteRow(rowMap, rowKey);
	}

	const onRowDidOpen = rowKey => {
		console.log('This row opened item #', rowKey);
	};

	const RenderItem = data => (
		<TouchableHighlight
			onPress={() => console.log('You touched item #' + data.item.key)}
			style={styles.rowFront}
			underlayColor={'#eee'}
		>
			<View>
				<Text style={styles.frontText}>List item {data.item.text}</Text>
			</View>
		</TouchableHighlight>
	);

	const RenderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			<TouchableOpacity
				style={[styles.backBtn, styles.backLeftBtnLeft]}
				onPress={() => handleArchiveRow(rowMap, data.item.key)}
			>
				<Text style={styles.backText}>Archive</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.backBtn, styles.backRightBtnRight]}
				onPress={() => handleDeleteRow(rowMap, data.item.key)}
			>
				<Text style={styles.backText}>Delete</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<SwipeListView
				data={listData}
				renderItem={RenderItem}
				renderHiddenItem={RenderHiddenItem}
				leftOpenValue={80}
				rightOpenValue={-80}
				previewRowKey={'0'}
				previewOpenValue={-65}
				previewOpenDelay={200}
				onRowDidOpen={onRowDidOpen}
				leftActivationValue={80}
				rightActivationValue={-80}
				onLeftAction={handleLeftSwipeAction}
				onRightAction={handleRightSwipeAction}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	backText: {
		color: '#FFF',
		fontSize: 18,
	},
	frontText: {
		color: 'black',
		fontSize: 22,
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 80,
	},
	backLeftBtnLeft: {
		backgroundColor: 'green',
		left: 0,
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
});
