import axios from 'axios';
import {baseURL, geoBaseURL} from '../../src/config/config';
import * as React from 'react';
import {useState, useEffect} from 'react';
import { THEME } from '../shared/theme';
import { colorTheme } from '../constants/ColorConstants';

let data = null;
let error = null;
const {priTxtColor,colorFFBE50,color0359FF,colorF9693C,color22995A,colorBlack} = THEME.colors;
const {errorText} = colorTheme;

export const calculateTime = getEstimatedTime => {
  let hours = getEstimatedTime / 60;

  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);

  const totalTime =
    getEstimatedTime > 60
      ? rhours + 'h ' + rminutes + ' mins'
      : '' + rminutes + ' mins';
  return totalTime;
};

export const checkCurrentRelocation = async config => {
  return await axios
    .get(baseURL + `/relocation/request/get-current`, config)
    .then(function (response) {
      return response?.data?.data;
    })
    .catch(function (error) {
      return error?.response?.data?.message;
    });
};

export const reverseGeocode = async (config, getDatalong) => {
  data = null;
  error = null;
  await axios
    .get(
      geoBaseURL +
        `/map/reverse-geocode?lat=${getDatalong?.latitude}&lng=${getData?.longitude}&lang=en&serviceType=${getData?.serviceType}`,
      config,
    )
    .then(function (response) {
      data = response?.data;
    })
    .catch(function (err) {
      error = err;
    });
  return {error, data};
};

export const rideStatusColorHandler = status => {
  switch (status) {
    case 'started':
      return priTxtColor;

    case 'arrived':
      return colorFFBE50;

    case 'loaded':
      return color0359FF;

    case 'en_route':
      return colorF9693C;

    case 'offloaded':
      return color22995A;

    case 'scheduled':
      return errorText;

    default:
      return colorBlack;
  }
};
