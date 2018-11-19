import { combineReducers } from "redux";
import * as homeReducers from "./Home/homeReducers";
import * as tagsReducers from "./Photos/Tags/tagsReducers";
import * as photosReducers from "./Photos/Photos/photosReducers";
import * as mapReducers from "./Photos/Photos/Map/mapReducers";
import * as serverErrorReducers from "./Router/ServerError/serverErrorReducers";

export default combineReducers(
  Object.assign({}, homeReducers, tagsReducers, photosReducers, mapReducers, serverErrorReducers)
);

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
			items: Map<> {
				_photoName1_: {
					name: _photoName1_,
					tags: [_tag1_, _tag2_],
					height: 1200,
					width: 1600,
					thumbnail: "thumbs/_photoName1_"
				},
				_photoName2_: {
					name: _photoName2_,
					tags: [_tag1_, _tag4_],
					height: 1200,
					width: 1600,
					thumbnail: "thumbs/_photoName2_"
				}
			},
			photosByTags: {
				_tag1_: [_photoName1_, _photoName2_]
			}
		},
		tags: {
			isFetching: false,
			items: [_tag1_, _tag2_, _tag3_, _tag4_]
		},
		googleMaps: {
			isFetching: false,
			lib: {}
		},
		fatalError: ""
	}
*/
