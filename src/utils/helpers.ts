import exportFromJSON from 'export-from-json';

export const exportJSON = (data: any) => {
  const fileName = 'data.json';
  const exportType = exportFromJSON.types.json;
  exportFromJSON({data, fileName, exportType});
};

export const createDrawingManager = (map: any, maps: any) => {
  const drawingManager = new maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON],
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: true,
      editable: true,
      zIndex: 1,
      draggable: true,
      geodesic: true,
    },
  });
  return drawingManager;
};
