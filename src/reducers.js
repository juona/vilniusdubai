import { combineReducers } from "redux";
import * as tagsReducers from "./Photos/Tags/tagsReducers";
import * as photosReducers from "./Photos/Photos/photosReducers";
import * as errorScreenReducers from "./Photos/ErrorScreen/errorScreenReducers";

export default combineReducers(Object.assign({}, tagsReducers, photosReducers, errorScreenReducers));

/*
	State structure

	{
		selectedTags: Set,
		numberOfVisiblePhotos: 25,
		photos: {
			isFetching: false,
			items: [
				{
					photoName: _photoName1_,
					tags: [_tag1_, _tag2_]
				},
				{
					photoName: _photoName2_,
					tags: [_tag1_, _tag4_]
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
