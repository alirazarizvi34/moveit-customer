import {View, Text} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import relocationService from '../services/relocation-service';
import {GlobalContext} from '../../context/GlobalState';
import {useNavigation} from '@react-navigation/native';
import toastService from '../services/toast-service';

const useRelocationItems = () => {
  const {
    selectedRelocationItems,
    setSelectedRelocationItems,
    relocationRequest,
    setShouldCallRelocationRequest,
    setRelocationRequest,
    setUpdateItemsApiCall
  } = useContext(GlobalContext);

  const [itemsList, setItemsList] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [itemsLoader, setItemsLoader] = useState(false);
  const [itemFilteredList, setItemsFilteredList] = useState([]);
  const [shouldCallApi, setShouldCallApi] = useState(false);
  const [isItemSelect, setItemSelect] = useState(false);
  const navigation = useNavigation();

  const getRelocationCategoriesItemsHandler = async id => {
    setLoadingState(true);
    setItemsLoader(true);
    await relocationService
      .getItems(id)
      .then(({data}) => {
        const items = data?.data;
        setLoadingState(false);
        setItemsLoader(false);

        if (Array.isArray(items)) {
          itemsDataOrganizer(items, id);
        }
      })
      .catch(err => {
        setItemsLoader(false);
        setLoadingState(false);
      });
  };

  const getRelocationSelectedItemsHandler = async (id) => {
    setLoadingState(true);
    await relocationService
      .getSelectedItems(id)
      .then(({data}) => {
        const selectedItems = data?.data;
        setLoadingState(false);
        if (Array.isArray(selectedItems?.items)) {
          setSelectedRelocationItems(selectedItems?.items);
        }
      })
      .catch(err => {
        setLoadingState(false);
      });
  };

  const updateStoreItemsHandler = async (
    updateStoreData,
    categoryId,
    categoryName,
  ) => {
    const requestData = {
      relocation_request_id: relocationRequest?.id,
      moving_type: relocationRequest?.moving_type ?? 'move_a_few_items',
      items: updateStoreData,
    };
    if (shouldCallApi) {
      // setUpdateItemsApiCall(true);
      setLoadingState(true);
      await relocationService
        .updateItems(requestData)
        .then(res => {
          setLoadingState(false);
          setShouldCallRelocationRequest(true);
          setRelocationRequest(pre => ({
            ...pre,
            moving_type: relocationRequest?.moving_type ?? 'move_a_few_items'
          }));
          onSaveItemsDataOrganizer(categoryId, updateStoreData, categoryName);
          navigation.goBack();
        })
        .catch(err => {
          if (err?.response?.data?.errors?.is_negotiated) {
            const packagingType = err?.response?.data?.packaging_type;

            navigation.popToTop();
            if (packagingType == 'premium') {
              navigation.navigate('RelocationRevisedQuote');
            } else {
              navigation.navigate('RelocationNonPremiumRevisedQuote');
            }
          }
          setLoadingState(false);
        });
    } else {
      onSaveItemsDataOrganizer(categoryId, updateStoreData, categoryName);

      navigation.goBack();
    }
  };


  const packingUnpackingRequest = async (updateStoreData) => {
    setItemsLoader(true);
    const requestData = {
      relocation_request_id: relocationRequest?.id,
      moving_type: relocationRequest?.moving_type ?? 'move_a_few_items',
      items: updateStoreData,
    };
    const packing_unpacking_items = new Promise((resolve, reject) => {
      relocationService
        .updateItems(requestData)
        .then(({data}) => {
          setItemsLoader(false);
          resolve(data);
        })
        .catch(error => {
          setItemsLoader(false);
          reject(error);
        });
    });
    return packing_unpacking_items;
  };

  const itemsDataOrganizer = useCallback(
    (items, id) => {
      const allItems = [];
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const currentItemIndex = selectedRelocationItems.findIndex(
          item => item.item_id == element.id && item.item_cat_id == id,
        );
        const currentRelocationItem = selectedRelocationItems[currentItemIndex];
        if (currentItemIndex !== -1) {
          if (currentRelocationItem.item_cat_id == id) {
            allItems.push({
              ...element,
              count: currentRelocationItem.item_qty,
              item_cat_id: id,
              is_packing_required: currentRelocationItem?.is_packing_required,
              is_fragile: currentRelocationItem?.is_fragile,
            });
          } else {
            allItems.push({...element, count: 0, item_cat_id: id, is_packing_required: 0});
          }
        } else {
          allItems.push({...element, count: 0, item_cat_id: id, is_packing_required: 0});
        }
      }
      setItemsList(allItems);
      setItemsFilteredList(allItems);
    },
    [selectedRelocationItems],
  );

  const selectedItemsDataOrganizer = useCallback(
    (categoryId, categoryName) => {
      let selectedData = selectedRelocationItems;


      // ? Removing all elements of the selected category all together to make sure the data is updated accurately
      const tempSelectedData = selectedData.filter((value, index, arr) => {
        if (value.item_cat_id === itemsList[0].item_cat_id) {
          // Removes the value from the original array
          arr.splice(index, 1);
          return false;
        }
        return true;
      });
      
      for (let index = 0; index < itemsList.length; index++) {
        const element = itemsList[index];
        
        if (element.count > 0) {
          tempSelectedData.push({
            item_id: element?.id,
            item_qty: element?.count,
            item_cat_id: categoryId,
            item_cat_name: categoryName,
            is_packing_required: element?.is_packing_required,
            is_fragile: element?.is_fragile
          });
        }
      }
      selectedData = tempSelectedData;
      updateStoreItemsHandler(selectedData, categoryId, categoryName);
    },
    [itemsList, selectedRelocationItems],
  );

  const onSaveItemsDataOrganizer = useCallback(
    (currentCatId, relocatioNData, categoryName) => {
      if (currentCatId) {
        for (let index = 0; index < itemsList.length; index++) {
          const element = itemsList[index];
          if (Array.isArray(selectedRelocationItems)) {
            const currentItemIndex = selectedRelocationItems.findIndex(
              val =>
                val.item_id == element.id && val.item_cat_id == currentCatId,
            );

            if (currentItemIndex !== -1) {
              if (element.count == 0) {
                selectedRelocationItems.splice(currentItemIndex, 1);
              } else {
                selectedRelocationItems[currentItemIndex] = {
                  ...selectedRelocationItems[currentItemIndex],
                  item_qty: element.count,
                };
              }
            } else {
              if (element.count !== 0) {
                selectedRelocationItems.push({
                  item_id: element?.id,
                  item_qty: element?.count,
                  item_cat_id: currentCatId,
                  item_cat_name: categoryName,
                  item_name: element?.name,
                  is_packing_required: element?.is_packing_required,
                  is_fragile: element?.is_fragile
                  // item_cat_name:element.
                });
              }
              
            }
          }
        }
        setSelectedRelocationItems([...selectedRelocationItems]);
      } else {
        setSelectedRelocationItems([...relocatioNData]);
      }
    },
    [itemsList, selectedRelocationItems],
  );

  const onItemCountIncreaseHandler = useCallback(
    currentItem => {
      setItemSelect(true);
      const localData = [...itemsList];
      const filteredData = [...itemFilteredList];
      setShouldCallApi(true);
      const currentItemIndex = localData.findIndex(
        val => val.id == currentItem.id,
      );
      const currentFilteredItemIndex = filteredData.findIndex(
        val => val.id == currentItem.id,
      );
      if (currentItemIndex !== -1) {
        localData[currentItemIndex] = {
          ...localData[currentItemIndex],
          count: localData[currentItemIndex].count + 1,
        };
        if(!localData[currentItemIndex]?.is_fragile){
          setUpdateItemsApiCall(true);
        }
          
      }
      if (currentFilteredItemIndex !== -1) {
        filteredData[currentFilteredItemIndex] = {
          ...filteredData[currentFilteredItemIndex],
          count: filteredData[currentFilteredItemIndex].count + 1,
        };
        if(!filteredData[currentFilteredItemIndex]?.is_fragile){
          setUpdateItemsApiCall(true);
        }
      }
      setItemsList(localData);
      setItemsFilteredList(filteredData);
    },
    [itemsList, itemFilteredList],
  );

  const onItemCountDecreaseHandler = useCallback(
    currentItem => {
      setShouldCallApi(true);
      setItemSelect(true);
      const localData = [...itemsList];
      const filteredData = [...itemFilteredList];

      const currentFilteredItemIndex = filteredData.findIndex(
        val => val.id == currentItem.id,
      );
      const currentItemIndex = localData.findIndex(
        val => val.id == currentItem.id,
      );
      if (currentItemIndex !== -1) {
        localData[currentItemIndex] = {
          ...localData[currentItemIndex],
          count:
            localData[currentItemIndex].count > 0
              ? localData[currentItemIndex].count - 1
              : 0,
        };
        if(!localData[currentItemIndex]?.is_fragile){
          setUpdateItemsApiCall(true);
        }
      }
      if (currentFilteredItemIndex !== -1) {
        filteredData[currentFilteredItemIndex] = {
          ...filteredData[currentFilteredItemIndex],
          count:
            filteredData[currentFilteredItemIndex]?.count > 0
              ? filteredData[currentFilteredItemIndex]?.count - 1
              : 0,
        };
        if(!localData[currentItemIndex]?.is_fragile){
          setUpdateItemsApiCall(true);
        }
      }
      setItemsFilteredList(filteredData);
      setItemsList(localData);
    },
    [itemsList, itemFilteredList],
  );

  const onItemSearchHandler = useCallback(
    searchValue => {
      setShouldCallApi(true);

      const filteredData = itemsList.filter(el => {
        //if no input the return the original
        if (searchValue.toLowerCase() === '') {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.name.toLowerCase().includes(searchValue.toLowerCase());
        }
      });
      setItemsFilteredList(filteredData);
    },
    [itemsList],
  );

  const searchRequestHandler = async searchTex => {
    if (searchTex == '') {
      setItemsLoader(false);
      setItemsList([]);
      return;
    }
    setItemsLoader(true);

    await relocationService
      .searchItem(
        searchTex ?? '',
        relocationRequest?.p_prop_details?.relocation_category_id,
      )
      .then(res => {
        setItemsLoader(false);
        setItemsList(res?.data?.data?.items);
      })
      .catch(err => {
        setItemsList([]);
        // toastService.shortToast(err?.response?.data?.message);
        setItemsLoader(false);
      });
  };

  return {
    getRelocationCategoriesItemsHandler,
    itemsList,
    loadingState,
    itemsLoader,
    isItemSelect,
    onItemCountDecreaseHandler,
    onItemCountIncreaseHandler,
    onItemSearchHandler,
    itemFilteredList,
    getRelocationSelectedItemsHandler,
    selectedItemsDataOrganizer,
    setItemsLoader,
    updateStoreItemsHandler,
    shouldCallApi,
    setShouldCallApi,
    searchRequestHandler,
    setLoadingState,
    packingUnpackingRequest,
  };
};

export default useRelocationItems;
