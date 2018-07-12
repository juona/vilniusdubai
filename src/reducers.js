import { combineReducers } from "redux";
import * as tagsReducers from "./app/Tags/tagsReducers";
import * as photosReducers from "./app/Photos/photosReducers";

export default combineReducers(Object.assign({}, tagsReducers, photosReducers));

/*
	State structure

	{
		selectedTags: Set,
		photos: {
			isFetching: false,
			items: {
				_photoName_: {
					photoName: _photoName_,
					tags: [_tag1_, _tag2_]
				}
			}
		},
		tagNames: {
			isFetching: false,
			items: [_tag1_, _tag2_, _tag3_]
		}
	}
*/
