import React from 'react'
import {
    IonCard, IonCardHeader, IonBadge, IonCardTitle, IonCardContent,
    IonList, IonItem, IonFab, IonIcon, IonLabel, IonFabButton
} from '@ionic/react';
import Alert from './Alert'
import { add } from 'ionicons/icons'
import PlayersList from './PlayersList'
//import '../../Tabs/Tab 1/Tab1.css'
interface Player{
    name: string,
    assist: number,
    golsContra: number,
    golsFavor: number,
    golsTomados: number,
    isGoleiro: boolean
}
interface Props{
    players: Array<Player|string>,
    addPlayer: Function,
    changePlayer: Function,
    removePlayer: Function,
    team: string,
    matchState: string
}
interface State{
    showAlert: boolean
}
class TeamCard extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props)
        this.state = {
            showAlert: false
        }
    }
    toggleShowAlert() {
        this.setState({ showAlert: !this.state.showAlert })
        console.log(this.state.showAlert)
    }
    render() {
        console.log(this.props.players)
        return (
            <div>
                {this.props.players.length < 6 && this.props.matchState=="NOT-BEGUN"?
                    //máximo de jogadores=6 e só aparece o botão antes da partida iniciar
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={() => this.toggleShowAlert()}>
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                    </IonFab> : null
                }
                <IonCard style={{width:'50vh', marginTop:'0px'}}>
                    <IonCardHeader color="primary">
                        <IonCardTitle>{this.props.team}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent style={{height:'50vh'}}>
                        <PlayersList players={this.props.players}
                        removePlayer={(e:any)=>this.props.removePlayer(e)}
                        changePlayer={(e:any,a:any)=>this.props.changePlayer(e,a)} />
                    </IonCardContent>
                </IonCard>
                <Alert showAlert={this.state.showAlert} toggleAlert={()=>this.toggleShowAlert()} 
                addPlayer={(e:any)=>this.props.addPlayer(e)} />
            </div>
        )
    }
}
export default TeamCard;