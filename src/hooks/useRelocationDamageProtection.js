import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import useCommonFunction from './useCommonFunction';

const useRelocationDamageProtection = () => {
  const {bootMeUpData} = useContext(GlobalContext);
  const {percentage} = useCommonFunction();

  const [currentProtection, setCurrentProtection] = useState(null);
  const [damageProtectionData, setDamageProtectionData] = useState([
    {id: 1, value: '0', label: 'None', amount: 0},
    {
      id: 2,
      value: 0,
      label: 'PKR 1 Million of Protection',
      amount: 1_000_000,
    },
    {
      id: 3,
      value: 0,
      label: 'PKR 2 Million of Protection',
      amount: 2_000_000,
    },
    {
      id: 4,
      value: 0,
      label: 'PKR 3 Million of Protection',
      amount: 3_000_000,
    },
    {
      id: 5,
      value: 0,
      label: 'PKR 4 Million of Protection',
      amount: 4_000_000,
    },
    {id: 6, value: 0, label: 'Other', amount: 0},
  ]);
  const [selectedCoverage, setSelectedCoverage] = useState(1);

  useEffect(() => {
    damageProtectionHandler();
  }, []);

  const damageProtectionHandler = () => {
    const protectionPercentage = bootMeUpData?.protection_charges;
    const damageData = [];
    const damageProtectionArray = [...damageProtectionData];
    for (let index = 0; index < damageProtectionArray.length; index++) {
      const element = damageProtectionArray[index];
      const damagePercentage = percentage(
        protectionPercentage,
        parseInt(element.amount),
      );
      damageData.push({...element, value: damagePercentage});
    }
    setDamageProtectionData(damageData);
    setCurrentProtection(damageData[0]);
  };

  const onAddCoverageHandler = coverage => {
    const protectionPercentage = bootMeUpData?.protection_charges;

    const damagePercentage = percentage(
      protectionPercentage,
      parseInt(coverage.coverage),
    );
    damageProtectionData[damageProtectionData.length - 1] = {
      ...damageProtectionData[damageProtectionData.length - 1],
      value: damagePercentage,
      amount: coverage.coverage,
      label: `PKR ${parseInt(coverage.coverage).toLocaleString('en-US')}`,
    };
    setCurrentProtection({
      ...damageProtectionData[damageProtectionData.length - 1],
      value: damagePercentage,
      amount: coverage.coverage,
      label: `PKR ${parseInt(coverage.coverage).toLocaleString('en-US')}`,
    });
    setDamageProtectionData([...damageProtectionData]);
  };
  return {
    damageProtectionData,
    onAddCoverageHandler,
    setCurrentProtection,
    selectedCoverage,
    setSelectedCoverage,
    currentProtection,
  };
};

export default useRelocationDamageProtection;
