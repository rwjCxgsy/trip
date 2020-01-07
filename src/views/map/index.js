import React, {Component} from 'react';
import {IonModal, IonContent, IonButton, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import styles from './index.module.scss'
import { createBrowserHistory } from 'history'
import {trip} from './config'
import {mountMap} from './map'
import CityImage from './cityImage'

import Time, {startTime} from '~src/components/Time'

const history = createBrowserHistory();

class Map extends Component {
    state = {
        showModal: false,
        list: trip
    }
    container = null
    render() {
        const {showModal, list} = this.state
        return (
            <div className={styles.map}>
                <div id="container" ref={e => this.container = e} className={styles.container}/>
                <div className={styles.board}>
                    <div className={styles.wrap}>
                        <div>
                            <div className={styles.light}>
                                <span>{list.length}</span>
                                <span>个</span>
                                <span>城市已点亮</span>
                            </div>
                            <div className={styles.begin}>
                                <div className={styles.left}>
                                    <span>START</span>
                                    <div>{startTime}</div>
                                </div>
                                <div className={styles.right}>
                                    <span>SO FOR</span>
                                    <div>
                                        <Time/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer} onClick={() => {
                            this.setState({showModal: true})
                        }}>
                            <span>查看点亮记录</span>
                            <div>
                                <i className="icon ion-md-send"/>
                            </div>
                        </div>
                    </div>
                </div>
                <IonContent>
                    <IonModal isOpen={showModal}>
                        <div>
                            <IonList>
                                <IonListHeader>
                                    <IonLabel>足迹</IonLabel>
                                </IonListHeader>
                                <div>
                                    {
                                        list.map((item, i) => {
                                            return <IonItem key={i} onClick={this.jump.bind(this, item)}>
                                                <CityImage city={item.name}/>
                                                <IonLabel>
                                                    <h2>{item.name}</h2>
                                                    <span>2019-01-01</span>
                                                </IonLabel>
                                            </IonItem>
                                        })
                                    }
                                </div>
                            </IonList>
                        </div>
                        <IonButton onClick={() => {
                            this.setState({showModal: false})
                        }}>关闭</IonButton>
                    </IonModal>
                </IonContent>
            </div>
        );
    }
    componentDidMount() {
        mountMap('container')
    }
    jump = (city) => {
        console.log(city)
        history.push('/trip')
    }
}

export default Map;