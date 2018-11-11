import { combineReducers } from "redux";
import * as homeReducers from "./Home/homeReducers";
import * as tagsReducers from "./Photos/Tags/tagsReducers";
import * as photosReducers from "./Photos/Photos/photosReducers";
import * as serverErrorReducers from "./Router/ServerError/serverErrorReducers";

export default combineReducers(Object.assign({}, homeReducers, tagsReducers, photosReducers, serverErrorReducers));

/*
	State structure

	{
		selectedTags: Set,
		isTagListVisible: false,
		numberOfVisiblePhotos: 25,
		visibleFullPhoto: {
			name: "",
			index: 0
		},
		selectedCountry: "",
		photos: {
			isFetching: false,
			items: [
				{
					name: _photoName1_,
					tags: [_tag1_, _tag2_],
					height: 1200,
					width: 1600,
					thumbnail: "thumbs/_photoName1_"
				},
				{
					name: _photoName2_,
					tags: [_tag1_, _tag4_],
					height: 1200,
					width: 1600,
					thumbnail: "thumbs/_photoName2_"
				}
			],
			photosByTags: {
				_tag1_: [_photoName1_, _photoName2_]
			}
		},
		tags: {
			isFetching: false,
			items: [_tag1_, _tag2_, _tag3_, _tag4_]
		},
		fatalError: ""
	}
*/
