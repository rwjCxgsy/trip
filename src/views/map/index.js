import React, {Component} from 'react';
import styles from './index.module.scss'
import {mountMap} from './map'
console.log(styles)

class Map extends Component {
    container = null
    render() {
        return (
            <div className={styles.map}>
                <div id="container" ref={e => this.container = e} className={styles.container}/>
                <div className={styles.board}>
                    <div className={styles.wrap}></div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        mountMap('container')
    }
}

export default Map;