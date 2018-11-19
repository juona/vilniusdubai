import { createSelector } from "reselect";

const getAllPhotosArray = state => Array.from(state.photos.items.values());
const getSelectedTags = state => state.selectedTags;
const getNumberOfVisiblePhotos = state => state.numberOfVisiblePhotos;
const getSelectedCountry = state => state.selectedCountry;

const hasPhotoSelectedTags = (photoTags, selectedTags) =>
  selectedTags.every(tag => photoTags.includes(tag));

const getAllSelectedPhotos = createSelector(
  [getAllPhotosArray, getSelectedTags, getSelectedCountry],
  (allPhotos, selectedTags, selectedCountry) => {
		selectedTags = Array.from(selectedTags);
		return selectedTags.length > 0 || selectedCountry ? allPhotos.filter(photo =>
      hasPhotoSelectedTags(
        photo.tags,
        selectedTags.concat(selectedCountry.toLowerCase())
      )
    ) : allPhotos;
	}
);

export const getVisiblePhotos = createSelector(
  [getAllSelectedPhotos, getNumberOfVisiblePhotos],
  (allSelectedPhotos, numberOfVisiblePhotos) => {
    return allSelectedPhotos.slice(0, numberOfVisiblePhotos);
  }
);

export const morePhotosAvailable = createSelector(
  [getAllSelectedPhotos, getNumberOfVisiblePhotos],
  (allSelectedPhotos, numberOfVisiblePhotos) => allSelectedPhotos.length > numberOfVisiblePhotos
);
