import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Button,
  Text
} from 'react-native';
import Dash from 'react-native-dash'

const imgElgio = require('./assets/img/elgio.png')
const imgFabio = require('./assets/img/fabio.png')

const largura = Dimensions.get('window').width
// console.log(`largura: ${largura}`)

let intervalo

export default class Corrida extends Component {

  state = {
    elgioRun: 5,
    fabioRun: 5,
    vencedor: 'Corrida dos nerds!'
  }


  corrandom(range) {
    return Math.floor(Math.random() * range) + 1
  }

  run() {
    let elgioRun = this.state.elgioRun
    let fabioRun = this.state.fabioRun
    let maior = (fabioRun>elgioRun) ? fabioRun : elgioRun
    if ( maior<(largura-70) ) {
      this.setState({elgioRun: elgioRun + this.corrandom(5)})
      this.setState({fabioRun: fabioRun + this.corrandom(10)})
    } else {
      let vencedor = (fabioRun>elgioRun) ? 'Fábio venceu!!!' : 'Elgio venceu!!!'
      this.setState({vencedor: vencedor})
      clearInterval(intervalo)
    }
  }

  iniciar() {

    this.setState({elgioRun: 5})
    this.setState({fabioRun: 5})
    this.setState({vencedor: ''})

    intervalo = setInterval( () => this.run(), 100)
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={[styles.grama, {alignItems: 'center', justifyContent: 'flex-end'}]}>
          <Text style={styles.vencedor}>{this.state.vencedor}</Text>
        </View>
        <View style={styles.avenida}>

          <Image source={imgElgio} 
            style={[styles.cabeca, {left: this.state.elgioRun} ]} />

          <Dash style={styles.faixa} 
            dashLength={20}
            dashGap={10}
            dashThickness={5}
            dashColor="white"></Dash>

          <Image source={imgFabio}  
            style={[styles.cabeca, {left: this.state.fabioRun} ]}  />

        </View>

        <View style={styles.grama}>
          <Button title="Iniciar" 
            color="#404080"
            onPress={ () => this.iniciar() } />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  grama: {
    backgroundColor: 'green',
    flex: 1
  },
  avenida: {
    backgroundColor: 'gray',
    borderTopWidth: 10,
    borderTopColor: '#393939',
    borderBottomWidth: 10,
    borderBottomColor: '#393939',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  faixa: {
    width: '100%',
    height: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  cabeca: {
    width: 60,
    height: 80
  },
  vencedor: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
})