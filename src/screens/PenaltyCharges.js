import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Block, Text} from 'galio-framework';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBack from '../components/Header/HeaderBack';
import {useTranslation} from 'react-i18next';
import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import { baseURL } from '../config/config';

export default PenaltyCharges = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {auth, setAuth} = useContext(GlobalContext);
  const {card, screen, subText, bar, title, mainScreen} = styles;
  const [rules, setRules] = useState(false);
  const [penaltyData, setPenaltyData] = useState();

  const GetPenalties = () => {
    try {
      fetch(baseURL + '/fetch/penalties/amount', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setPenaltyData(data?.data?.all_fetch_penalties_amount);
          }
        });
    } catch (error) {
      toastService.shortToast(error?.message);
    }
  };

  useEffect(() => {
    GetPenalties();
  }, []);

  return (
    <>
    <SafeAreaView style={{flex: 0, backgroundColor: '#4C1F6B' }} />
    <SafeAreaView style={{flex: 1}}>
      <HeaderBack heading={t('Penalty Charges')} navigation={navigation} />
      <Block flex={1} style={[mainScreen]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#633C7D', '#4D226D']}
          style={[screen]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex={1}>
              <Block style={[card]}>
                <Block center>
                  <Text style={[title]}>{t('Penalty Charges')}</Text>
                </Block>
                <Block style={[bar]}></Block>
                {penaltyData?.map((val, ind) => {
                  return (
                    <Block key={ind}>
                      <Block
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Block
                        // style={{alignItems: 'center'}}
                        >
                          <Text style={{fontWeight: 'bold'}}>{t('Date')}</Text>
                          <Text>
                            {new Date(val?.created_at).toDateString()}
                          </Text>
                        </Block>

                        <Block>
                          <Text style={{fontWeight: 'bold'}}>
                            {t('Penalty')}
                          </Text>
                          <Text>Rs.{val?.fixed_amount}</Text>
                        </Block>
                      </Block>
                      <Block style={[bar]}></Block>
                      </Block>
                  );
                })}

                {rules ? (
                  <>
                {auth?.role === 3 ? 
                  <>
                    <Block
                      flexDirection={'row'}
                      space={'between'}
                      style={{marginVertical: 10, padding: 10}}>
                      <Text style={[subText]}>
                        Individual Clients can cancel a delivery ride for
                        free within the first 20 minutes of booking. After 20
                        minutes, cancellation will cause a monetary penalty.
                      </Text>
                    </Block>
                    <Block style={[bar]}></Block>
                    </>
                    : auth?.role === 5 &&
                    <>
                    <Block
                      flexDirection={'row'}
                      space={'between'}
                      style={{marginVertical: 10, padding: 10}}>
                      <Text style={[subText]}>
                        Corporate Clients can cancel a delivery ride for free
                        within the first 30 minutes of booking. After 30
                        minutes, cancellation will cause a monetary penalty.{' '}
                      </Text>
                    </Block>
                    </>
                }     
                  </>
                  ) : null}
              </Block>
            </Block>
          </ScrollView>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 10,
              marginHorizontal: 10,
            }}
            onPress={() => setRules(!rules)}>
            <Block></Block>
            <Block>
              {rules ? (
                <Text style={{color: 'white', textDecorationLine: 'underline'}}>
                  Hide Rules And Regulations
                </Text>
              ) : (
                <Text style={{color: 'white', textDecorationLine: 'underline'}}>
                  Show Rules And Regulations
                </Text>
              )}
            </Block>
          </TouchableOpacity>
        </LinearGradient>
      </Block>
      </SafeAreaView>
    </>
  );
};

const styles = EStyleSheet.create({
  mainScreen: {
    backgroundColor: 'white',
    paddingBottom: '3.8rem',
  },
  screen: {
    padding: '1.3rem',
    height: '100%',
    borderBottomLeftRadius: '2.5rem',
    borderBottomRightRadius: '2.5rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.7rem',
    padding: '0.7rem',
    marginVertical: '0.7rem',
    paddingBottom: '1.3rem',
  },
  userBox: {
    paddingHorizontal: '1.4rem',
    marginBottom: '0.5rem',
  },
  profileImg: {
    width: '4rem',
    height: '4rem',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffbc4d',
  },
  editIcon: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: '1rem',
  },
  primaryText: {
    color: '#4d226e',
    fontSize: '1rem',
    fontWeight: '700',
  },
  title: {
    color: '#ffbc4d',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#4d226e',
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  TextTitle: {
    color: '#4d226e',
    fontSize: '1rem',
    fontWeight: '700',
  },
  smText: {
    fontSize: '0.8rem',
    color: '#4d226e',
    fontWeight: '700',
  },
  subText: {
    color: '#575757',
    fontSize: '1rem',
    fontWeight: '700',
  },
  dateText: {
    color: '#575757',
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  text: {
    color: 'black',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    paddingTop: '0.2rem',
  },
  priceText: {
    color: '#4d226e',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  bar: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingBottom: '1rem',
    width: '103%',
    marginLeft: '-0.32rem',
    marginBottom: '0.8rem',
  },
  userName: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  emailAddress: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});
