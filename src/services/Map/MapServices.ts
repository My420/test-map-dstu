import 'ol/ol.css';
import { Map, View, MapBrowserPointerEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import MarkerData from './types';
import markerIcon from './marker.png';

// Spherical Mercator (EPSG:3857)

// constant
const DSTU_COORDS = fromLonLat([39.710887, 47.239992]);

// types

interface ClickOnMapSubscriber {
  (coords: Coordinate): any;
}

interface ClickOnMarkerSubscriber {
  (id: string): any;
}

interface MapMoveSubscriber {
  (): any;
}

class MapServices {
  private popupId: string = '';

  private map: Map | null = null;

  private markerLayer: VectorLayer | null = null;

  private popup: Overlay | null = null;

  private clickOnMapSubscribers: ClickOnMapSubscriber[] = [];

  private clickOnMarkerSubscribers: ClickOnMarkerSubscriber[] = [];

  private mapMoveSubscribers: MapMoveSubscriber[] = [];

  static createMarker(data: MarkerData) {
    const { lon, lat } = data;
    const feature = new Feature({
      geometry: new Point([lon, lat]),
    });
    feature.setId(data.id);
    return feature;
  }

  private createMap(id: string): void {
    if (!this.map) {
      this.map = new Map({
        target: id,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: DSTU_COORDS,
          zoom: 17,
        }),
      });
    }
  }

  private createMarkersLayer(): void {
    if (!this.markerLayer) {
      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: markerIcon,
            imgSize: [48, 48],
          }),
        }),
      });
    }
  }

  private createPopup(): void {
    const popup = document.getElementById(this.popupId);
    if (popup) {
      this.popup = new Overlay({
        element: popup,
        stopEvent: false,
        offset: [0, -50],
      });
    }
  }

  private addPopup(): void {
    if (this.map && this.popup) {
      this.map.addOverlay(this.popup);
    }
  }

  private addLayers(): void {
    if (this.map && this.markerLayer) {
      this.map.addLayer(this.markerLayer);
    }
  }

  private movePopup(evt: MapBrowserPointerEvent): void {
    const feature = this.map?.forEachFeatureAtPixel(evt.pixel, (f) => f);
    if (feature) {
      const mark = feature.getGeometry() as Point;
      const coordinates = mark.getCoordinates();
      this.popup?.setPosition(coordinates);
    }
  }

  private handleMapClick = (evt: MapBrowserPointerEvent): void => {
    const feature = this.map?.forEachFeatureAtPixel(evt.pixel, (f) => f);
    if (feature) {
      const id = feature.getId() as string;
      this.movePopup(evt);
      this.notifyOnMarkerClickSubscribers(id);
    } else {
      const coords = evt.coordinate;
      this.notifyOnMapClickSubscribers(coords);
    }
  };

  private handleMapMove = (): void => {
    this.notifyMapMoveSubscribers();
  };

  private notifyOnMapClickSubscribers(coords: Coordinate) {
    this.clickOnMapSubscribers.forEach((subs) => subs(coords));
  }

  private notifyOnMarkerClickSubscribers(id: string) {
    this.clickOnMarkerSubscribers.forEach((subs) => subs(id));
  }

  private notifyMapMoveSubscribers() {
    this.mapMoveSubscribers.forEach((subs) => subs());
  }

  private bind(): void {
    this.map?.on('click', this.handleMapClick);
    this.map?.on('movestart', this.handleMapMove);
  }

  onMapClick(func: ClickOnMapSubscriber): void {
    this.clickOnMapSubscribers.push(func);
  }

  unsubscribeOnMapClick(func: ClickOnMapSubscriber) {
    this.clickOnMapSubscribers = this.clickOnMapSubscribers.filter((el) => !(el === func));
  }

  onMarkerClick(func: ClickOnMarkerSubscriber): void {
    this.clickOnMarkerSubscribers.push(func);
  }

  unsubscribeOnMarkerClick(func: ClickOnMarkerSubscriber) {
    this.clickOnMarkerSubscribers = this.clickOnMarkerSubscribers.filter((el) => !(el === func));
  }

  onMapMove(func: MapMoveSubscriber): void {
    this.mapMoveSubscribers.push(func);
  }

  unsubscribeOnMapMove(func: MapMoveSubscriber) {
    this.mapMoveSubscribers = this.mapMoveSubscribers.filter((el) => !(el === func));
  }

  addMarker(data: MarkerData) {
    const marker = MapServices.createMarker(data);
    this.markerLayer?.getSource().addFeature(marker);
  }

  init(id: string, popupId: string): void {
    this.popupId = popupId;
    if (!this.map) {
      this.createMap(id);
      this.createMarkersLayer();
      this.createPopup();
      this.addLayers();
      this.addPopup();
      this.bind();
    }
  }
}

export default MapServices;
