import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert,Image} from 'react-native';




export default function App() {


  function numeroAleatorio(){
    let sorteio = Math.random() * 10
    sorteio = Math.floor(Math.random() * 200 + 1)
    getPokemon(sorteio)
  }

  
  const [ pokemonEscolhido, setPokemonEscolhido ] = useState(1);
  const getPokemon = (sorteio)=> {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${sorteio}/`
    fetch(endpoint)
        .then(resposta => resposta.json())
          .then( json => {
            const pokemon = {
              nome: json.name,
              img: json.sprites.other["official-artwork"].front_default,
              peso: json.weight,
            };
            
            setPokemonEscolhido(pokemon);
          })
          .catch(() => {
            Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');
          });
      }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./assets/pokemon-logo-2.png')} style={styles.logo}/>
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={styles.nomePokemon}>{pokemonEscolhido.nome}</Text>
        <Image source={{uri:pokemonEscolhido.img}} style={styles.pokemonImg}/>
      </View>
      <View>
        <Text style={{fontSize:20, fontStyle:'normal'}}>Para descobrir qual Pokémon você seria</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.botao} onPress={numeroAleatorio}>
          <Text style={{fontSize:20, fontStyle:'normal'}}>Clique Aqui</Text>
        </TouchableOpacity>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode:'contain',
    width:300,
    height:300,
  },
  pokemonImg: {
    width:250,
    height:250,
  },
  botao: {
    width:200,
    height:70,
    marginTop:20,
    backgroundColor:'#6a6a6a',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

  },
  nomePokemon: {
    fontWeight:'bold',
    fontSize:20,
    alignItems:'center',
    justifyContent:'center'
  }
});
