import { BaseMapClass, extendConnectedComponent } from "../common/Map/Map";
import tripData from "./coordinates.json";
import wildCampingIcon from "../resources/icons/wild-camping.inline.svg";
import privateCampingIcon from "../resources/icons/private-camping.inline.svg";
import couchsurfingIcon from "../resources/icons/couchsurfing.inline.svg";
import randomPeopleIcon from "../resources/icons/random-people.inline.svg";
import lodgingIcon from "../resources/icons/lodging.inline.svg";
import bikeSideAdventureIcon from "../resources/icons/bike-side-adventure.inline.svg";
import otherSideAdventureIcon from "../resources/icons/other-side-adventure.inline.svg";
import cheatStartIcon from "../resources/icons/cheat-start.inline.svg";
import cheatEndIcon from "../resources/icons/cheat-end.inline.svg";

const iconMap = {
  //home: cameraIcon,
  "wild-camping": wildCampingIcon,
  "private-camping": privateCampingIcon,
  couchsurfing: couchsurfingIcon,
  "random-people": randomPeopleIcon,
  lodging: lodgingIcon,
  "bike-side-adventure": bikeSideAdventureIcon,
  "other-side-adventure": otherSideAdventureIcon,
  "cheat-start": cheatStartIcon,
  "cheat-end": cheatEndIcon
};

class MapContainer extends BaseMapClass {
  initializeMap() {
    super.initializeMap();
    const bounds = new this.props.googleMaps.LatLngBounds();
    tripData.forEach(section =>
      section.markers.forEach(marker => {
        new this.props.googleMaps.Marker({
          position: marker.coordinates,
          title: marker.description,
          icon: BaseMapClass.getIcon(iconMap[marker.type], { height: 50, width: 50 }),
          map: this.map
        });
        bounds.extend(marker.coordinates);
      })
    );
    this.map.fitBounds(bounds);
  }
}

export default extendConnectedComponent(MapContainer);
