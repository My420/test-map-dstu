import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

// Spherical Mercator (EPSG:3857)

// constant
const DSTU_COORDS = fromLonLat([39.710887, 47.239992]);

class MapServices {
  private map: Map | null = null;

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

  init(id: string): void {
    this.createMap(id);
  }
}

const mapService = new MapServices();

export default mapService;
