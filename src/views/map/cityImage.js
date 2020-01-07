import React, {Component} from 'react';
import {IonAvatar } from '@ionic/react';

class CityImage extends Component {
    state = {
        src: null
    }
    render() {
        const {src} = this.state
        const {city} = this.props
        const style = {
            width: '56px',
            height: '56px',
            display: 'block',
            margin: '15px 15px 15px 0'
        }
        return (
            <img style={style} src={src} alt={city} />
        );
    }
    async componentDidMount() {
        const {city} = this.props
        const d = await fetch(`https://restapi.amap.com/v3/place/text?keywords=${city}&key=c30848348912d32fdbdb30bf3108e33f&city=${city}`)
        const {status, pois} = await d.json()
        if (status === '1') {
            this.setState({
                src: pois[0].photos[0].url || ''
            })
        }
    }
}

export default CityImage;