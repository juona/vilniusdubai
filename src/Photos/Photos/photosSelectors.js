import { createSelector } from "reselect";

const getAllPhotos = state => state.photos.items;
const getSelectedTags = state => state.selectedTags;
const getNumberOfVisiblePhotos = state => state.numberOfVisiblePhotos;
const getSelectedCountry = state => state.selectedCountry;

const hasPhotoSelectedTags = (photoTags, selectedTags) =>
  selectedTags.every(tag => photoTags.includes(tag));

export const getVisiblePhotos = createSelector(
  [getAllPhotos, getSelectedTags, getNumberOfVisiblePhotos, getSelectedCountry],
  (allPhotos, selectedTags, numberOfVisiblePhotos, selectedCountry) =>
    Array.from(allPhotos.values())
      .filter(photo =>
        hasPhotoSelectedTags(photo.tags, Array.from(selectedTags).concat(selectedCountry.toLowerCase()))
      )
      .slice(0, numberOfVisiblePhotos)
);
