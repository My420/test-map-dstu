import 'ol/ol.css';
import { Map, View, MapBrowserPointerEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';

// Spherical Mercator (EPSG:3857)

// constant
const DSTU_COORDS = fromLonLat([39.710887, 47.239992]);

// types

interface ClickOnMapSubscriber {
  (coords: Coordinate): any;
}

class MapServices {
  private map: Map | null = null;

  private userObjectLayer: VectorLayer | null = null;

  private clickOnMapSubscribers: ClickOnMapSubscriber[] = [];

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

  private createUserObjectsLayer(): void {
    if (!this.userObjectLayer) {
      this.userObjectLayer = new VectorLayer({ className: 'test' });
    }
  }

  private addLayers(): void {
    if (this.map && this.userObjectLayer) {
      this.map.addLayer(this.userObjectLayer);
    }
  }

  private handleMapClick = (evt: MapBrowserPointerEvent): void => {
    const coords = evt.coordinate;
    this.notifyOnMapClickSubscribers(coords);
  };

  private notifyOnMapClickSubscribers(coords: Coordinate) {
    this.clickOnMapSubscribers.forEach((subs) => subs(coords));
  }

  private bind(): void {
    this.map?.on('click', this.handleMapClick);
  }

  onMapClick(func: ClickOnMapSubscriber): void {
    this.clickOnMapSubscribers.push(func);
  }

  unsubscribeOnMapClick(func: ClickOnMapSubscriber) {
    this.clickOnMapSubscribers = this.clickOnMapSubscribers.filter((el) => !(el === func));
  }

  init(id: string): void {
    if (!this.map) {
      this.createMap(id);
      this.createUserObjectsLayer();
      this.addLayers();
      this.bind();
    }
  }
}

const mapService = new MapServices();

export default mapService;
