import { createSelector } from "reselect";

const getAllPhotos = state => state.photos.items;
const getSelectedTags = state => state.selectedTags;
const getNumberOfVisiblePhotos = state => state.numberOfVisiblePhotos;
const getSelectedCountry = state => state.selectedCountry;

const hasPhotoSelectedTags = (photoTags, selectedTags) =>
  selectedTags.every(tag => photoTags.includes(tag));

const getAllSelectedPhotos = createSelector(
  [getAllPhotos, getSelectedTags, getSelectedCountry],
  (allPhotos, selectedTags, selectedCountry) => {
		allPhotos = Array.from(allPhotos.values());
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
