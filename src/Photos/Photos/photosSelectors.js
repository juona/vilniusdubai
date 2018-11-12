import { createSelector } from "reselect";

const getAllPhotos = state => state.photos.items;
const getSelectedTags = state => state.selectedTags;
const getNumberOfVisiblePhotos = state => state.numberOfVisiblePhotos;
const getSelectedCountry = state => state.selectedCountry;

const hasPhotoSelectedTags = (photoTags, selectedTags) =>
  selectedTags.every(tag => photoTags.includes(tag));

const getAllSelectedPhotos = createSelector(
  [getAllPhotos, getSelectedTags, getSelectedCountry],
  (allPhotos, selectedTags, selectedCountry) =>
    Array.from(allPhotos.values()).filter(photo =>
      hasPhotoSelectedTags(
        photo.tags,
        Array.from(selectedTags).concat(selectedCountry.toLowerCase())
      )
    )
);

export const getVisiblePhotos = createSelector(
  [getAllSelectedPhotos, getNumberOfVisiblePhotos],
  (allSelectedPhotos, numberOfVisiblePhotos) => allSelectedPhotos.slice(0, numberOfVisiblePhotos)
);

export const morePhotosAvailable = createSelector(
  [getAllSelectedPhotos, getNumberOfVisiblePhotos],
  (allSelectedPhotos, numberOfVisiblePhotos) => allSelectedPhotos.length > numberOfVisiblePhotos
);
