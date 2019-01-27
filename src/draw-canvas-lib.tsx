// Original code from https://github.com/jonhni/react-drawable-canvas
// This code has been modified to pass X,Y coordinates of the canvas lines to parent
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class DrawableCanvas extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas : any = ReactDOM.findDOMNode(this);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');

    this.setState({
      canvas,
      context,
      lineCoords: []
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.resetCanvas();
    }
  }

  static getDefaultStyle() {
    return {
      brushColor: '#FFFF00',
      lineWidth: 4,
      cursor: 'pointer',
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
    };
  }

  handleOnTouchStart(e) {
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    this.setState({
      lastX: e.targetTouches[0].pageX - rect.left,
      lastY: e.targetTouches[0].pageY - rect.top,
      drawing: true
    });
  }

  handleOnMouseDown(e) {
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();

    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top,
      drawing: true
    });
  }

  handleOnTouchMove(e) {
    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const {lastX, lastY, lineCoords} = this.state;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      lineCoords.push([lastX, lastY]);
      this.setState({
        lastX: currentX,
        lastY: currentY,
        lineCoords
      });
    }
  }

  handleOnMouseMove(e) {
    if (this.state.drawing){
      const rect = this.state.canvas.getBoundingClientRect();
      const {lastX, lastY, lineCoords} = this.state;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      lineCoords.push([lastX, lastY]);
      this.setState({
        lastX: currentX,
        lastY: currentY,
        lineCoords
      });
    }
  }



  handleOnMouseUp() {
    const {lineCoords, lastX, lastY} = this.state;
    lineCoords.push([lastX, lastY]);
    this.props.lineCoords(lineCoords);
    this.setState({
      drawing: false,
      lineCoords: []
    });
  }

  draw(lX, lY, cX, cY) {
    const newContext = this.state.context;
    newContext.strokeStyle = this.props.brushColor;
    newContext.lineWidth = this.props.lineWidth;
    this.setState({
      context: newContext
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
  }

  resetCanvas() {
    const width = this.state.context.canvas.width;
    const height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  }

  canvasStyle() {
    const defaults = DrawableCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;
    return Object.assign({}, defaults, custom);
  }

  render() {
    return (
      <canvas style={this.canvasStyle()}
        onMouseDown={this.handleOnMouseDown.bind(this)}
        onTouchStart={this.handleOnTouchStart.bind(this)}
        onMouseMove={this.handleOnMouseMove.bind(this)}
        onTouchMove={this.handleOnTouchMove.bind(this)}
        onMouseUp={this.handleOnMouseUp.bind(this)}
        onTouchEnd={this.handleOnMouseUp.bind(this)}>
      </canvas>
    );
  }

}

type Props = {
  brushColor?: string;
  lineWidth?: number;
  cursor?: string;
  canvasStyle?: {
    backgroundColor?: string;
    height?: string | number;
    width?: string | number;
  };
  clear?: boolean;
  lineCoords?: any;
}
