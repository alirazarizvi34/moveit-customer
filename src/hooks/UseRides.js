import React, {useState, useEffect, useContext} from 'react';
import TripService from '../services/trip-service';

import {GlobalContext} from '../../context/GlobalState';
import toastService from '../services/toast-service';
import {AppConstants} from '../constants/AppConstants';
import axios from 'axios';

const UseRides = () => {
  const [paginationCount, setPaginationCount] = useState(1);
  const [loadingTrips, setLoadintTrips] = useState(false);
  const [allTrips, setAllTrips] = useState([]);
  const [imageLimitExceed, setImageExceed] = useState(false);

  const {setMyTrips, mediaKeys, setMediaKeys, attachPicture, setAttachPicture} =
    useContext(GlobalContext);

  function createCancelToken() {
    const source = axios.CancelToken.source();

    return {
      cancel: source.cancel,
      isCancelled: () => axios.isCancel(source.token),
    };
  }
  useEffect(() => {
    setMyTrips(allTrips);
  }, [allTrips]);

  useEffect(() => {
    if (mediaKeys == '') {
      const randomNumber = getRandom(4);
      setMediaKeys(randomNumber);
    }
  }, [mediaKeys]);

  function getRandom(length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  }
  const imageLimitHandler = attachPicture => {
    if (Array.isArray(attachPicture)) {
      let imageSize = 0;

      for (let index = 0; index < attachPicture.length; index++) {
        const element = attachPicture[index];
        imageSize = imageSize + element.size;
      }
      if (imageSize > 50000000) {
        toastService.longToast(AppConstants.toastMessages.sizeExceeded);
        setImageExceed(true);
        return;
      } else {
        setImageExceed(false);
        return;
      }
    }
  };
  const getRideHistoryData = async () => {
    setLoadintTrips(true);
    let params = {
      page: paginationCount,
    };
    await TripService.getTruckBooking(params)
      .then(res => {
        setLoadintTrips(false);
        const data = res?.data;
        if (data?.success) {
          const arrayData = data?.data;
          if (Array.isArray(arrayData) && arrayData.length > 0) {
            if (allTrips.length > 0) {
              setAllTrips([...allTrips, ...arrayData]);
            } else {
              setAllTrips(arrayData);
            }
            setPaginationCount(paginationCount + 1);
          }
        }
      })
      .catch(err => {
        setLoadintTrips(false);
      });
  };

  const mediaTypeHandler = media => {
    if (media?.type) {
      const type = media.type.split('/');
      if (Array.isArray(type)) {
        return type[0];
      }
    }
  };

  const setMediaLoadingHandler = media => {
    if (Array.isArray(attachPicture)) {
      const currentMediaIndex = attachPicture.findIndex(
        currentImage => currentImage.name == media?.local_key_id,
      );
      if (currentMediaIndex !== -1) {
        attachPicture[currentMediaIndex] = {
          ...attachPicture[currentMediaIndex],
          loading: false,
          id: media?.media?.id,
          cancelToken: '',
        };
      }
    }
    setAttachPicture([...attachPicture]);
    imageLimitHandler(attachPicture);
  };

  const deleteMediaLocalHandler = id => {
    if (Array.isArray(attachPicture)) {
      const currentMediaIndex = attachPicture.findIndex(
        media => media.id == id,
      );
      if (currentMediaIndex !== -1) {
        attachPicture.splice(currentMediaIndex, 1);

        setAttachPicture([...attachPicture]);
        imageLimitHandler(attachPicture);
      }
    }
  };

  const deleteMediaOnUploadFail = media => {
    if (Array.isArray(attachPicture)) {
      const currentMediaIndex = attachPicture.findIndex(
        currentMedia => currentMedia.name == media.name,
      );

      if (currentMediaIndex !== -1) {
        attachPicture.splice(currentMediaIndex, 1);

        setAttachPicture([...attachPicture]);
        imageLimitHandler(attachPicture);
      }
    }
  };

  const uploadMediaHandler = async media => {

    // const mediaToUpload = {
    //   file: media,
    //   media_type: mediaTypeHandler(media),
    //   media_key: mediaKeys,
    // };
    const cancelTokenSource = createCancelToken();
    const formData = new FormData();
    attachPicture.push({
      ...media,
      loading: true,
      cancelToken: cancelTokenSource,
    });

    setAttachPicture([...attachPicture]);
    imageLimitHandler(attachPicture);

    formData.append('file', media);
    formData.append('media_type', mediaTypeHandler(media));
    formData.append('media_key', mediaKeys);
    formData.append('local_key_id', media?.name);

    await TripService.uploadMedia(formData, {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    })
      .then(({data}) => {
        setMediaLoadingHandler(data?.data);
      })
      .catch(error => {
        if (error?.response?.status == 413) {
          toastService.shortToast(AppConstants.toastMessages.fileTooLarge);
        } else {
          toastService.shortToast(error?.response?.data?.message);
        }
        deleteMediaOnUploadFail(media);
      });
  };

  const deleteMediaHandler = async (id, name) => {
    let coneAttachPicture = [...attachPicture]; 
    if (Array.isArray(attachPicture)) {
      if (id) {
        deleteMediaLocalHandler(id);
        const deleteMediaData = new FormData();
        const CurrentId = id;
        deleteMediaData.append('media_key', mediaKeys);
        deleteMediaData.append('id', CurrentId);

        await TripService.deleteMedia(deleteMediaData, AppConstants.imageHeader)
          .then(({data}) => {
            if (data?.success) {
              coneAttachPicture = []
            }
          })
          .catch(err => {
            setAttachPicture([...coneAttachPicture]);
            toastService.shortToast(err?.response?.data?.message);
          });
      } else {
        const currentMediaIndex = attachPicture.findIndex(
          pic => pic.name == name,
        );
        if (currentMediaIndex !== -1) {
          const currentMedia = attachPicture[currentMediaIndex];
          if (currentMedia?.loading) {
            cancelSpecificRequest(name);
          }
        }
      }
    }
  };
  const cancelSpecificRequest = uniqueIdentifier => {
    if (Array.isArray(attachPicture)) {
      const currentPicIndex = attachPicture.findIndex(
        pic => pic.name == uniqueIdentifier,
      );

      if (currentPicIndex !== -1) {
        const currentPic = attachPicture[currentPicIndex];
        const {cancelToken} = currentPic;
        if (cancelToken) {
          cancelToken.cancel('User Deleted The Request');
          toastService.shortToast('User Cancel a request');
          deleteMediaOnUploadFail(currentPic);
        }
      }

      // if (cancelTokensMap[uniqueIdentifier]) {
      //   cancelTokensMap[uniqueIdentifier].cancel('Request canceled by the user.');
      //   delete cancelTokensMap[uniqueIdentifier];
    }
  };

  return {
    paginationCount,
    getRideHistoryData,
    loadingTrips,
    uploadMediaHandler,
    deleteMediaHandler,
    imageLimitExceed,
  };
};

export default UseRides;
