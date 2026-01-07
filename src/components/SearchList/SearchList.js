import React, {useState, useContext, useRef} from 'react';
import {GlobalContext} from '../../../context/GlobalState';
import {View,FlatList, SafeAreaView} from 'react-native';
import NewHeader from '../../components/Header/NewHeader';
import {useTranslation} from 'react-i18next';
import InputTextComponent from '../../components/inputTextComp';
import {AppImages} from '../../constants/AppImages';
import SearchListItems from './SearchListItems';
import {useDebounce} from '../../hooks/useDebounce';
import { getStyles } from './SearchListStyle';
import geoService from '../../services/geo-service';
import toastService from '../../services/toast-service';
import { colorTheme } from '../../constants/ColorConstants';

const {darkGrayBorder} = colorTheme;

export default SearchList = ({navigation,onCoordsHandler,inputPlaceHolder,headerTitle}) => {
  
  const styles = getStyles();
  const {t, i18n} = useTranslation();
  const {auth} = useContext(GlobalContext);

  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const onChangeText = async () => {
    if (search.term.trim() === '') return;
    if (!search.fetchPredictions) return;
    let params = {
      place_name:search.term
    }
    setPredictions([]);
    geoService.autoComplete(params).then(({data})=> {
      if(data?.predictions.length <= 0){
        toastService.shortToast('No data found.');
        setPredictions(data?.predictions);
        return;
      }
      setPredictions(data?.predictions);
      setShowPredictions(true);
    }).catch((error)=> {
    });
  };
  useDebounce(onChangeText, 1500, [search.term]);

  const onPredictionTapped = async (place_id) => {
    let params = place_id;
    geoService.mapPlace(params).then((result)=> {
      if (result) {
              const {
                data: {
                  result: {
                    geometry: {location},
                  },
                },
              } = result;
              const {lat, lng} = location;
              if (lat && lng) {
                let coordinaes = {
                  lat:lat,
                  lon:lng,
                  animateToRegion: true,
                }
                setShowPredictions(false);
                onCoordsHandler(coordinaes);
              }
            }
    }).catch((error)=> {
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NewHeader navigation={navigation} title={headerTitle} />

      <View style={styles.inputView}>
        <InputTextComponent
          hasBorder={true}
          borderColor={darkGrayBorder}
          autoFocus={true}
          placeholder={inputPlaceHolder}
          editable={true}
          imageLeft={{show: true, url: AppImages?.inputIcon}}
          value={search?.term}
          onChangeText={text => {
            setSearch({term: text, fetchPredictions: true});
          }}
        />
      </View>

      <FlatList
        data={showPredictions && search.term != '' && predictions}
        renderItem={({item, index}) => (
          <SearchListItems
            title={item?.terms[0]?.value}
            description={item?.description}
            place_id={item?.place_id}
            key={index}
            onPress={(place_id)=> {onPredictionTapped(place_id)}}
          />
        )}
      />
    </SafeAreaView>
  );
};
