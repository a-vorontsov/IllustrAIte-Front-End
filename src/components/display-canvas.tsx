// Original code from https://github.com/jonhni/react-drawable-canvas
// This code has been modified to pass X,Y coordinates of the canvas lines to parent
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class DisplayCanvas extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const canvas : any = ReactDOM.findDOMNode(this);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');

    await this.setState({
      canvas,
      context,
      lineCoords: []
    });

    var prevX, prevY, currX, currY;
    this.props.newLines.forEach(line => {
      for (let i = 1; i < line.length; i++) {
        prevX = line[i-1][0];
        prevY = line[i-1][1];
        currX = line[i][0];
        currY = line[i][1];
        this.draw(prevX, prevY, currX, currY);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newLines.length > 0) {
      var prevX, prevY, currX, currY;
      nextProps.newLines.forEach(line => {
        for (let i = 1; i < line.length; i++) {
          prevX = line[i-1][0];
          prevY = line[i-1][1];
          currX = line[i][0];
          currY = line[i][1];
          this.draw(prevX, prevY, currX, currY);
        }
      });
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

  canvasStyle() {
    const defaults = DisplayCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;
    return Object.assign({}, defaults, custom);
  }

  render() {
    return (
      <canvas style={this.canvasStyle()}>
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
  newLines?: any;
}
