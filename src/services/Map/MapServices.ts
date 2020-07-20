import 'ol/ol.css';
import { Map, View, MapBrowserPointerEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Draw from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import {
  Circle as CircleStyle, Icon, Style, Fill, Stroke,
} from 'ol/style';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import GeometryType from 'ol/geom/GeometryType';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import OverlayPositioning from 'ol/OverlayPositioning';
import { ICON_SIZE, ICON_SCALE } from './constant';
import { MarkerData, MarkerIconName, IconScaleValue } from './types';
import MarkerIcon from './icons';
import { calcNormalizeScale, formatLength, formatArea } from './utils';
import olExt from './olExt';
import styles from './styles.module.scss';

// Spherical Mercator (EPSG:3857)

// constant
const DSTU_COORDS = fromLonLat([39.710887, 47.239992]);
const ZOOM = 17;
const MAX_ZOOM = 20;
const MIN_ZOOM = 0;

// types

type MeasurementType = 'POLYGON' | 'LINE_STRING';

interface MeasureData {
  type: MeasurementType;
  id: string;
  value: string;
}

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
  private isIconsNormalize: boolean = false;

  private popupId: string = '';

  private measureTooltip: olExt.Tooltip | null = null;

  private view: View | null = null;

  private map: Map | null = null;

  private markerLayer: VectorLayer | null = null;

  private drawInteraction: Draw | null = null;

  private popup: Overlay | null = null;

  private clickOnMapSubscribers: ClickOnMapSubscriber[] = [];

  private clickOnMarkerSubscribers: ClickOnMarkerSubscriber[] = [];

  private mapMoveSubscribers: MapMoveSubscriber[] = [];

  private createMarkerStyle(
    iconName: MarkerIconName,
    iconScale: IconScaleValue,
    resolution: number,
  ) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        src: MarkerIcon[iconName],
        imgSize: [ICON_SIZE, ICON_SIZE],
        scale: this.isIconsNormalize ? calcNormalizeScale(iconScale, resolution) : iconScale,
      }),
    });
  }

  private createMarker(data: MarkerData) {
    const {
      lon, lat, id, iconName, iconScale,
    } = data;
    const feature = new Feature({
      geometry: new Point([lon, lat]),
    });
    feature.setId(id);
    feature.setStyle((_elem, resolution) => {
      const style = this.createMarkerStyle(iconName, iconScale, resolution);
      return style;
    });
    return feature;
  }

  private createMapWithView(id: string): void {
    if (!this.map && !this.view) {
      this.view = new View({
        center: DSTU_COORDS,
        zoom: ZOOM,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
      });

      this.map = new Map({
        target: id,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: this.view,
      });
    }
  }

  private createMarkersLayer(): void {
    if (!this.markerLayer) {
      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: MarkerIcon.placeholder,
            imgSize: [ICON_SIZE, ICON_SIZE],
            scale: ICON_SCALE,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#1890ff',
            width: 2,
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
        offset: [0, -20],
      });
    }
  }

  private setMeasureOverlay(id: string, coords: Coordinate, value: string) {
    const tooltip = document.createElement('div');
    tooltip.innerHTML = value;
    tooltip.className = styles.measureOverlay;
    const measureOverlay = new Overlay({
      element: tooltip,
      offset: [0, -15],
      positioning: OverlayPositioning.BOTTOM_CENTER,
      id,
    });
    measureOverlay.setPosition(coords);
    this.map?.addOverlay(measureOverlay);
  }

  private addMeasureTooltip(): void {
    if (this.measureTooltip && this.map) this.map.addOverlay(this.measureTooltip);
  }

  private createMeasureTooltip() {
    if (!this.measureTooltip) this.measureTooltip = olExt.createTooltip();
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

  private createDrawInteraction(type: MeasurementType) {
    if (this.map && this.markerLayer) {
      this.drawInteraction = new Draw({
        source: this.markerLayer.getSource(),
        stopClick: true,
        type: GeometryType[type],
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ff4d4f',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: '#ff4d4f',
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
          }),
        }),
      });
      this.map.addInteraction(this.drawInteraction);
    }
  }

  private removeDrawInteraction() {
    if (this.drawInteraction && this.map) {
      this.map.removeInteraction(this.drawInteraction);
      this.drawInteraction = null;
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

  // eslint-disable-next-line class-methods-use-this
  private notifyMeasureSubscribers(data: MeasureData): void {
    console.log('Результаты измерения: ', data);
  }

  private bindMeasureListeners() {
    if (this.drawInteraction) {
      this.drawInteraction.on('drawstart', (evt) => {
        this.measureTooltip?.setFeature(evt);
      });

      this.drawInteraction.on('drawend', (evt) => {
        this.measureTooltip?.removeFeature(evt);
        const geom = evt.feature.getGeometry();
        let measure = '';
        let overlayCoords = [0, 0];
        let measureType: MeasurementType = 'LINE_STRING';
        if (geom instanceof LineString) {
          overlayCoords = geom.getLastCoordinate();
          measure = formatLength(geom);
        }
        if (geom instanceof Polygon) {
          overlayCoords = geom.getInteriorPoint().getCoordinates();
          measure = formatArea(geom);
          measureType = 'POLYGON';
        }
        const overlayId = overlayCoords[0].toString();
        this.setMeasureOverlay(overlayId, overlayCoords, measure);
        this.notifyMeasureSubscribers({ type: measureType, id: overlayId, value: measure });
      });
    }
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
    const marker = this.createMarker(data);
    this.markerLayer?.getSource().addFeature(marker);
  }

  moveViewToMarker(id: string, coords: Coordinate) {
    const time = 1000;
    this.view?.animate({
      center: coords,
      duration: time,
    });
    const timeoutId = setTimeout(() => {
      this.popup?.setPosition(coords);
      this.notifyOnMarkerClickSubscribers(id);
      clearTimeout(timeoutId);
    }, time + 100);
  }

  setNormalizeValue(value: boolean) {
    this.isIconsNormalize = value;
    this.markerLayer?.getSource().changed();
  }

  getNormalizeValue(): boolean {
    return this.isIconsNormalize;
  }

  startMeasurement(type: MeasurementType) {
    this.createDrawInteraction(type);
    this.bindMeasureListeners();
  }

  stopMeasurement() {
    this.removeDrawInteraction();
  }

  init(id: string, popupId: string): void {
    this.popupId = popupId;
    if (!this.map) {
      this.createMapWithView(id);
      this.createMarkersLayer();
      this.createPopup();
      this.createMeasureTooltip();
      this.addLayers();
      this.addPopup();
      this.addMeasureTooltip();
      this.bind();
    }
  }
}

export default MapServices;
